'use client';

import { router } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    initialSearch?: string;
}

export function DataTableToolbar<TData>({
    table,
    initialSearch = '',
}: DataTableToolbarProps<TData>) {
    const [searchValue, setSearchValue] = useState(initialSearch);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.get(
            window.location.pathname,
            { search: value || undefined, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, 500);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
    };

    const handleReset = () => {
        setSearchValue('');
        router.get(
            window.location.pathname,
            { search: undefined, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlSearch = params.get('search') || '';
        if (urlSearch !== searchValue) {
            setSearchValue(urlSearch);
        }
    }, []);

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className="flex w-full flex-1 items-center gap-2 sm:w-auto">
                <InputGroup>
                    <InputGroupInput
                        placeholder="Filter categories..."
                        value={searchValue}
                        onChange={(event) =>
                            handleSearchChange(event.target.value)
                        }
                    />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        {searchValue && (
                            <InputGroupButton
                                variant="destructive"
                                onClick={handleReset}
                            >
                                <X />
                                <span className="hidden sm:inline">Reset</span>
                            </InputGroupButton>
                        )}
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
}
