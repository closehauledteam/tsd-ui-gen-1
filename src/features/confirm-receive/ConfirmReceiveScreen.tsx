// AUTO-GENERATED FILE
// screenId: confirm-receive
// spec: specs/screens/confirm-receive.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import React from 'react';
import { useServices } from '../../app/services/ServicesContext';
import { useConfirmReceiveFlow } from './confirmReceiveFlow';
import { ConfirmReceiveFormUI } from './ConfirmReceiveFormUI';

// Mock props for demonstration since we don't have real navigation in this test harness
interface ConfirmReceiveScreenProps {
    itemId?: string;
    qty?: number;
}

export const ConfirmReceiveScreen: React.FC<ConfirmReceiveScreenProps> = ({ itemId = 'TEST-ITEM-123', qty = 5 }) => {
    const services = useServices();
    const flow = useConfirmReceiveFlow(services, itemId, qty);

    return (
        <ConfirmReceiveFormUI
            itemId={itemId}
            qty={qty}
            status={flow.status}
            onPrint={flow.handlePrint}
            onFinish={flow.handleFinish}
        />
    );
};
