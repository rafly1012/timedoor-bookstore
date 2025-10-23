'use client';

import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';

interface DataTableToolbarProps {
    initialSearch?: string;
}

export function DataTableToolbar({
    initialSearch = '',
}: DataTableToolbarProps) {
    const [searchValue, setSearchValue] = useState(initialSearch);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        router.get(
            `${window.location.pathname}?${params.toString()}`,
            {},
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
        const params = new URLSearchParams(window.location.search);
        params.delete('search');

        router.get(
            `${window.location.pathname}?${params.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        setSearchValue(initialSearch);
    }, [initialSearch]);

    return (
        <div className="flex w-full max-w-sm items-center gap-2">
            <InputGroup>
                <InputGroupInput
                    placeholder="Search by book name or author name..."
                    value={searchValue}
                    onChange={(event) => handleSearchChange(event.target.value)}
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
    );
}
