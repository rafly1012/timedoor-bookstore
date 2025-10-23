import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashToast() {
    const { flash } = usePage().props;

    type FlashMessages = {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };

    const safeFlash = flash as FlashMessages;

    useEffect(() => {
        if (safeFlash.success) toast.success(safeFlash.success);
    }, [safeFlash]);
}
