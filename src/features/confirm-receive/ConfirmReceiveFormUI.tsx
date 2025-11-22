// AUTO-GENERATED FILE
// screenId: confirm-receive
// spec: specs/screens/confirm-receive.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ConfirmReceiveFormUIProps {
    itemId: string;
    qty: number;
    status: string;
    onPrint: () => void;
    onFinish: () => void;
}

export const ConfirmReceiveFormUI: React.FC<ConfirmReceiveFormUIProps> = ({
    itemId,
    qty,
    status,
    onPrint,
    onFinish,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Подтверждение</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Item: {itemId}</Text>
                <Text style={styles.infoText}>Qty: {qty}</Text>
            </View>

            <View style={styles.buttonGroup}>
                <Button title="Печать этикетки" onPress={onPrint} />
            </View>

            <View style={styles.buttonGroup}>
                <Button title="Завершить" onPress={onFinish} color="green" />
            </View>

            {!!status && <Text style={styles.status}>{status}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    infoBox: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 20 },
    infoText: { fontSize: 18 },
    buttonGroup: { marginBottom: 10 },
    status: { marginTop: 20, color: 'green', fontSize: 16, fontWeight: 'bold' },
});
