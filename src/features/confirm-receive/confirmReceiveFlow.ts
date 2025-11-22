// AUTO-GENERATED FILE
// screenId: confirm-receive
// spec: specs/screens/confirm-receive.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import { useState } from 'react';
import { AppServices } from '../../app/services/types';

export const useConfirmReceiveFlow = (services: AppServices, itemId: string, qty: number) => {
    const [status, setStatus] = useState('');

    const handlePrint = async () => {
        setStatus('Printing...');
        await services.print.printLabel(itemId, qty);
        setStatus('Этикетка отправлена');
    };

    const handleFinish = () => {
        console.log('Flow finished');
        setStatus('Done');
    };

    return {
        status,
        handlePrint,
        handleFinish,
    };
};
