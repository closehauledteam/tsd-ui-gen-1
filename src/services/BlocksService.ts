export interface Block {
    id: string;
    name: string;
}

export const BlocksService = {
    getAvailableBlocks: async (): Promise<Block[]> => {
        console.log('[Mock] Getting available blocks');
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [
            { id: 'b1', name: 'Блок 1 (Томаты)' },
            { id: 'b2', name: 'Блок 2 (Огурцы)' },
            { id: 'b3', name: 'Блок 3 (Перцы)' },
        ];
    },

    getRegistrationQRCode: async (blockId: string, userId: string): Promise<string> => {
        console.log(`[Mock] Getting QR code for block ${blockId} and user ${userId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return `REG:${blockId}:${userId}:${Date.now()}`;
    },
};
