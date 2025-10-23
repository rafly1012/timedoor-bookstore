<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RatingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $authors = Author::select('id', 'name')
            ->orderBy('name')
            ->get();

        $books = collect();

        if ($request->filled('author_id')) {
            $books = Book::select('id', 'title')
                ->where('author_id', $request->author_id)
                ->orderBy('title')
                ->get();
        }

        return Inertia::render('ratings/create', [
            'authors' => $authors,
            'books' => $books,
            'selectedAuthorId' => $request->author_id ? (int) $request->author_id : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_id' => 'required|exists:authors,id',
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:10',
        ]);

        // Pastikan buku benar-benar milik author yang dipilih
        $book = Book::where('id', $validated['book_id'])
            ->where('author_id', $validated['author_id'])
            ->first();

        if (!$book) {
            return back()->withErrors([
                'book_id' => 'The selected book does not belong to the selected author.',
            ]);
        }

        Rating::create([
            'book_id' => $validated['book_id'],
            'rating' => $validated['rating'],
        ]);

        return Redirect::to('/')
            ->with('success', 'Rating berhasil ditambahkan!');
    }
}
