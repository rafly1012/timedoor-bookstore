'use client';

import { type Book } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'index',
        header: 'No',
        cell: ({ row }) => {
            return <div className="w-[40px]">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: 'title',
        header: 'Book Name',
        cell: ({ row }) => {
            return (
                <div className="max-w-[400px]">
                    <span className="font-medium">{row.original.title}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'author_name',
        header: 'Author Name',
        cell: ({ row }) => {
            return (
                <div className="max-w-[200px]">{row.original.author_name}</div>
            );
        },
    },
    {
        accessorKey: 'avg_rating',
        header: 'Average Rating',
        cell: ({ row }) => {
            const rating = row.original.avg_rating;
            return (
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{rating.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">/ 10</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'voter_count',
        header: 'Voter',
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    <span className="font-medium">
                        {row.original.voter_count}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                        voters
                    </span>
                </div>
            );
        },
    },
];
