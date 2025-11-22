// AUTO-GENERATED FILE
// screenId: receive-item
// spec: specs/screens/receive-item.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import React from 'react';
import { useServices } from '../../app/services/ServicesContext';
import { useReceiveItemFlow } from './receiveItemFlow';
import { ReceiveItemFormUI } from './ReceiveItemFormUI';

export const ReceiveItemScreen: React.FC = () => {
    const services = useServices();
    const flow = useReceiveItemFlow(services);

    return (
        <ReceiveItemFormUI
            barcode={flow.barcode}
            onChangeBarcode={flow.setBarcode}
            quantity={flow.quantity}
            onChangeQuantity={flow.setQuantity}
            status={flow.status}
            onCheck={flow.handleCheck}
        />
    );
};
