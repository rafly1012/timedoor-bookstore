import { Button } from '@/components/ui/button';
import { type Book } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function Index() {
    const { books, limit, search } = usePage<{
        books: Book[];
        limit: number;
        search: string;
    }>().props;

    return (
        <div className="p-4">
            <Head title="List of books with filter" />
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        List of Books With Filter
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Top books ordered by average rating (highest to lowest)
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/authors/top">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            Top 10 Authors
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/ratings/create">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                            Input Rating
                        </Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={books}
                    currentLimit={limit}
                    initialSearch={search}
                />
            </div>
        </div>
    );
}
