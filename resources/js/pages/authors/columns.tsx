'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type Author } from '@/types';

export const columns: ColumnDef<Author>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('name')}
                    </span>
                </div>
            );
        },
    },
];
