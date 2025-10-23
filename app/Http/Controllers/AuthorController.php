<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function top(): Response
    {
        $authors = Author::select('authors.*')
            ->selectRaw('COUNT(ratings.id) as total_voters')
            ->join('books', 'authors.id', '=', 'books.author_id')
            ->join('ratings', 'books.id', '=', 'ratings.book_id')
            ->where('ratings.rating', '>', 5)
            ->groupBy('authors.id')
            ->orderByRaw('total_voters DESC')
            ->limit(10)
            ->get();

        $formattedAuthors = $authors->map(function ($author, $index) {
            return [
                'no' => $index + 1,
                'id' => $author->id,
                'name' => $author->name,
                'total_voters' => $author->total_voters,
            ];
        });

        return Inertia::render('authors/top', [
            'authors' => $formattedAuthors,
        ]);
    }
}
