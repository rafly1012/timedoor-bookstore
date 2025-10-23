import { type Category, type PaginatedResponse } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function Index() {
    const { categories, search } = usePage<{
        categories: PaginatedResponse<Category>;
        search?: string;
    }>().props;

    return (
        <div className="p-4">
            <Head title="Categories" />
            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={categories.data}
                    pagination={{
                        currentPage: categories.current_page,
                        lastPage: categories.last_page,
                        perPage: categories.per_page,
                        total: categories.total,
                        from: categories.from,
                        to: categories.to,
                    }}
                />
            </div>
        </div>
    );
}
