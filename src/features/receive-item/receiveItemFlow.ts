// AUTO-GENERATED FILE
// screenId: receive-item
// spec: specs/screens/receive-item.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import { useState } from 'react';
import { AppServices } from '../../app/services/types';

export const useReceiveItemFlow = (services: AppServices) => {
    const [barcode, setBarcode] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [status, setStatus] = useState('');

    const handleCheck = async () => {
        setStatus('Checking...');

        // 1. Parse Barcode
        const parseResult = await services.scan.parse(barcode);
        if (!parseResult.ok) {
            setStatus(`Error: ${parseResult.error}`);
            return;
        }

        const itemId = parseResult.itemId;
        const qty = parseInt(quantity, 10);

        if (isNaN(qty) || qty <= 0) {
            setStatus('Error: Invalid quantity');
            return;
        }

        // 2. Check Availability
        const availResult = await services.inventory.checkItemAvailable(itemId, qty);
        if (availResult.ok) {
            setStatus(`Success: Item ${itemId} is available!`);
            setBarcode('');
            setQuantity('1');
        } else {
            setStatus(`Error: ${availResult.error}`);
        }
    };

    return {
        barcode,
        setBarcode,
        quantity,
        setQuantity,
        status,
        handleCheck,
    };
};
