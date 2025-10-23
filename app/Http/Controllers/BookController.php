<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $limit = $request->input('limit', 10);
        $search = $request->input('search', '');

        $books = Book::select('books.*')
            ->selectRaw('COALESCE(AVG(ratings.rating), 0) as avg_rating')
            ->selectRaw('COUNT(ratings.id) as voter_count')
            ->leftJoin('ratings', 'books.id', '=', 'ratings.book_id')
            ->leftJoin('authors', 'books.author_id', '=', 'authors.id')
            ->when($search, function ($query) use ($search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('books.title', 'like', "%{$search}%")
                        ->orWhere('authors.name', 'like', "%{$search}%");
                });
            })
            ->groupBy('books.id')
            ->orderByRaw('avg_rating DESC, voter_count DESC')
            ->limit($limit)
            ->with('author')
            ->get();

        $formattedBooks = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author_name' => $book->author->name,
                'avg_rating' => round($book->avg_rating, 2),
                'voter_count' => $book->voter_count,
            ];
        });

        return Inertia::render('books/index', [
            'books' => $formattedBooks,
            'limit' => $limit,
            'search' => $search,
            'limitOptions' => range(10, 100, 10),
        ]);
    }
}
