'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';

interface DataTableLimitProps {
    currentLimit: number;
}

export function DataTableLimit({ currentLimit }: DataTableLimitProps) {
    const limitOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const handleLimitChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('limit', value);

        router.get(
            `${window.location.pathname}?${params.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
                List Show:
            </label>
            <Select
                value={String(currentLimit)}
                onValueChange={handleLimitChange}
            >
                <SelectTrigger className="w-[100px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {limitOptions.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
