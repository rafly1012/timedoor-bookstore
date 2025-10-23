'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type Category } from '@/types';

export const columns: ColumnDef<Category>[] = [
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
