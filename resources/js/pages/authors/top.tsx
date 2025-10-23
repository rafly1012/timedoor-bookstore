import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Head, Link, usePage } from '@inertiajs/react';

interface TopAuthor {
    no: number;
    id: number;
    name: string;
    total_voters: number;
}

export default function Top() {
    const { authors } = usePage<{
        authors: TopAuthor[];
    }>().props;

    return (
        <div className="p-4">
            <Head title="Top 10 Most Famous Authors" />

            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Top 10 Most Famous Authors
                    </h1>
                    <p className="text-muted-foreground">
                        Based on voters with rating greater than 5
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/">
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
                            List of Books
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

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Author Name</TableHead>
                                <TableHead>Total Voters</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {authors && authors.length > 0 ? (
                                authors.map((author) => (
                                    <TableRow key={author.id}>
                                        <TableCell>{author.no}</TableCell>
                                        <TableCell>{author.name}</TableCell>
                                        <TableCell>
                                            {author.total_voters.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <svg
                                                className="mb-4 h-16 w-16 text-gray-300"
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
                                            <p className="text-lg font-medium">
                                                No authors found
                                            </p>
                                            <p className="text-sm">
                                                There are no authors with
                                                ratings greater than 5
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
