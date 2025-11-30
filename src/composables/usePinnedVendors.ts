import { useLocalStorage } from '@vueuse/core';

export type PinnedVendor = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    category: string;
    location: string;
};

export const usePinnedVendors = () => {
    const vendors = useState<PinnedVendor[]>('pinned-vendors', () => []);

    // Sync with localStorage on client side
    if (import.meta.client) {
        const storageKey = 'stagebloom-pinned-vendors';

        // Initialize from storage
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                vendors.value = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse pinned vendors', e);
            }
        }

        // Watch for changes
        watch(vendors, (newVal) => {
            localStorage.setItem(storageKey, JSON.stringify(newVal));
        }, { deep: true });
    }

    const pin = (vendor: PinnedVendor) => {
        if (!vendors.value.find((v) => v.id === vendor.id)) {
            vendors.value.push(vendor);
        }
    };

    const unpin = (vendorId: string) => {
        vendors.value = vendors.value.filter((v) => v.id !== vendorId);
    };

    const isPinned = (vendorId: string) => {
        return vendors.value.some((v) => v.id === vendorId);
    };

    const togglePin = (vendor: PinnedVendor) => {
        if (isPinned(vendor.id)) {
            unpin(vendor.id);
        } else {
            pin(vendor);
        }
    };

    return {
        vendors,
        pin,
        unpin,
        isPinned,
        togglePin,
    };
};
