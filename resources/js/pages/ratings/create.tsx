'use client';

import { Head, router, useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';
import * as React from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function CreateRating({
    authors,
    books,
    selectedAuthorId,
}: {
    authors: { id: number; name: string }[];
    books: { id: number; title: string }[];
    selectedAuthorId: number | null;
}) {
    const [openAuthor, setOpenAuthor] = React.useState(false);
    const [openBook, setOpenBook] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        author_id: selectedAuthorId?.toString() || '',
        book_id: '',
        rating: '',
    });

    const handleAuthorSelect = (value: string) => {
        setData('author_id', value);
        setData('book_id', '');
        setOpenAuthor(false);

        router.get(
            '/ratings/create',
            { author_id: value },
            {
                preserveScroll: true,
                preserveState: false,
            },
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/ratings', {
            onSuccess: () => {
                reset();
                router.visit('/');
            },
        });
    };

    return (
        <div className="p-4">
            <Head title="Add Rating" />
            <h1 className="mb-6 text-2xl font-semibold">Add Rating</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* AUTHOR COMBOBOX */}
                <div className="grid gap-2">
                    <Label htmlFor="author_id">Author</Label>
                    <Popover open={openAuthor} onOpenChange={setOpenAuthor}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openAuthor}
                                className="w-full justify-between"
                            >
                                {data.author_id
                                    ? authors.find(
                                          (a) =>
                                              a.id === Number(data.author_id),
                                      )?.name
                                    : 'Select author...'}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput
                                    placeholder="Search author..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        No authors found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {authors.map((author) => (
                                            <CommandItem
                                                key={author.id}
                                                value={author.name}
                                                onSelect={(value) => {
                                                    const selected =
                                                        authors.find(
                                                            (a) =>
                                                                a.name ===
                                                                value,
                                                        );
                                                    if (selected)
                                                        handleAuthorSelect(
                                                            String(selected.id),
                                                        );
                                                }}
                                            >
                                                {author.name}
                                                <Check
                                                    className={cn(
                                                        'ml-auto',
                                                        data.author_id ===
                                                            String(author.id)
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.author_id} />
                </div>

                {/* BOOK COMBOBOX */}
                <div className="grid gap-2">
                    <Label htmlFor="book_id">Book</Label>
                    <Popover open={openBook} onOpenChange={setOpenBook}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openBook}
                                disabled={!data.author_id}
                                className="w-full justify-between"
                            >
                                {data.book_id
                                    ? books.find(
                                          (b) => b.id === Number(data.book_id),
                                      )?.title
                                    : 'Select book...'}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput
                                    placeholder="Search book..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>No books found.</CommandEmpty>
                                    <CommandGroup>
                                        {books.map((book) => (
                                            <CommandItem
                                                key={book.id}
                                                value={book.title}
                                                onSelect={(value) => {
                                                    const selected = books.find(
                                                        (b) =>
                                                            b.title === value,
                                                    );
                                                    if (selected) {
                                                        setData(
                                                            'book_id',
                                                            String(selected.id),
                                                        );
                                                        setOpenBook(false);
                                                    }
                                                }}
                                            >
                                                {book.title}
                                                <Check
                                                    className={cn(
                                                        'ml-auto',
                                                        data.book_id ===
                                                            String(book.id)
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.book_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select
                        value={data.rating}
                        onValueChange={(value) => setData('rating', value)}
                    >
                        <SelectTrigger id="rating" className="w-full">
                            <SelectValue placeholder="Select rating (1-10)" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(10)].map((_, i) => {
                                const rate = i + 1;
                                return (
                                    <SelectItem key={rate} value={String(rate)}>
                                        {rate}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.rating} />
                </div>

                <Button
                    type="submit"
                    className="mt-4 w-full"
                    disabled={processing}
                >
                    {processing && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Rating
                </Button>
            </form>
        </div>
    );
}
