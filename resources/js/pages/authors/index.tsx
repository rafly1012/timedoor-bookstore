import { type Author, type PaginatedResponse } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function Index() {
    const { authors, search } = usePage<{
        authors: PaginatedResponse<Author>;
        search?: string;
    }>().props;

    return (
        <div className="p-4">
            <Head title="Authors" />
            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={authors.data}
                    pagination={{
                        currentPage: authors.current_page,
                        lastPage: authors.last_page,
                        perPage: authors.per_page,
                        total: authors.total,
                        from: authors.from,
                        to: authors.to,
                    }}
                />
            </div>
        </div>
    );
}
