export function formatCurrency(
    value: number,
    locale: string = 'id-ID',
    currency: string = 'IDR',
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(value);
}

export function formatDate(
    date: Date | string,
    locale: string = 'id-ID',
    options?: Intl.DateTimeFormatOptions,
): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
        parsedDate,
    );
}

export function formatDateTime(
    date: Date | string,
    locale: string = 'id-ID',
    timeZone: string = 'Asia/Makassar',
): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale, {
        timeZone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsedDate);
}

export function formatNumber(value: number, locale: string = 'id-ID'): string {
    return new Intl.NumberFormat(locale).format(value);
}
