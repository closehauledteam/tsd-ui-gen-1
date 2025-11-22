import { AppServices } from '../../app/services/types';

export const mockServices: AppServices = {
    scan: {
        parse: async (rawCode: string) => {
            console.log(`[MockScan] Parsing: ${rawCode}`);
            if (rawCode.length >= 5) {
                return { ok: true, itemId: `ITEM-${rawCode}` };
            }
            return { ok: false, error: 'Invalid barcode (must be >= 5 chars)' };
        },
    },
    inventory: {
        checkItemAvailable: async (itemId: string, qty: number) => {
            console.log(`[MockInventory] Checking ${itemId}, qty: ${qty}`);
            return { ok: true };
        },
    },
    print: {
        printLabel: async (itemId: string, qty: number) => {
            console.log(`[MockPrint] Printing label for ${itemId}, qty: ${qty}`);
        },
    },
};
