<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Nonaktifkan foreign key checks untuk SQLite
        DB::statement('PRAGMA foreign_keys = OFF;');

        $this->command->info('Membuat 1.000 author...');
        $this->createAuthorsInBulk();
        $this->command->info('✅ Sudah selesai membuat 1.000 author.');

        $this->command->info('Membuat 3.000 kategori...');
        $this->createCategoriesInBulk();
        $this->command->info('✅ Sudah selesai membuat 3.000 kategori.');

        $authorIds = Author::pluck('id')->toArray();
        $categoryIds = Category::pluck('id')->toArray();

        $this->command->info('Membuat 100.000 buku...');
        $this->createBooksInBulk($authorIds, $categoryIds);
        $this->command->info('✅ Sudah selesai membuat 100.000 buku.');

        $bookIds = Book::pluck('id')->toArray();

        $this->command->info('Membuat 500.000 rating...');
        $this->createRatingsInBulk($bookIds);
        $this->command->info('✅ Sudah selesai membuat 500.000 rating.');

        // Aktifkan kembali foreign key checks
        DB::statement('PRAGMA foreign_keys = ON;');

        $this->command->info('✅ Semua data berhasil di-generate!');
    }

    private function createAuthorsInBulk(): void
    {
        $batchSize = 500;
        $batches = ceil(1000 / $batchSize);

        foreach (range(1, $batches) as $i) {
            $authors = Author::factory()->count($batchSize)->make()->map(function ($author) {
                return $author->toArray();
            })->toArray();

            Author::insert($authors);
            $this->command->info("  → Batch author ke-{$i} selesai.");
        }
    }

    private function createCategoriesInBulk(): void
    {
        $batchSize = 500;
        $batches = ceil(3000 / $batchSize);

        foreach (range(1, $batches) as $i) {
            $categories = Category::factory()->count($batchSize)->make()->map(function ($category) {
                return $category->toArray();
            })->toArray();

            Category::insert($categories);
            $this->command->info("  → Batch kategori ke-{$i} selesai.");
        }
    }

    private function createBooksInBulk(array $authorIds, array $categoryIds): void
    {
        $batchSize = 1000;
        $totalBooks = 100000;
        $batches = $totalBooks / $batchSize;

        foreach (range(1, $batches) as $i) {
            $books = [];

            for ($j = 0; $j < $batchSize; $j++) {
                $book = Book::factory()->make([
                    'author_id' => $authorIds[array_rand($authorIds)],
                    'category_id' => $categoryIds[array_rand($categoryIds)],
                ]);

                $books[] = $book->toArray();
            }

            Book::insert($books);
            $this->command->info("  → Batch buku ke-{$i} selesai.");
        }
    }

    private function createRatingsInBulk(array $bookIds): void
    {
        $batchSize = 5000;
        $totalRatings = 500000;
        $batches = $totalRatings / $batchSize;

        foreach (range(1, $batches) as $i) {
            $ratings = [];

            for ($j = 0; $j < $batchSize; $j++) {
                $rating = Rating::factory()->make([
                    'book_id' => $bookIds[array_rand($bookIds)],
                ]);

                $ratings[] = $rating->toArray();
            }

            Rating::insert($ratings);
            $this->command->info("  → Batch rating ke-{$i} selesai.");
        }
    }
}
