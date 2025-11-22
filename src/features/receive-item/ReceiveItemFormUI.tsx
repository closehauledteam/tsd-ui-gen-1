// AUTO-GENERATED FILE
// screenId: receive-item
// spec: specs/screens/receive-item.md
// WARNING: Этот файл сгенерирован автоматически на основе требования.

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ReceiveItemFormUIProps {
    barcode: string;
    onChangeBarcode: (text: string) => void;
    quantity: string;
    onChangeQuantity: (text: string) => void;
    status: string;
    onCheck: () => void;
}

export const ReceiveItemFormUI: React.FC<ReceiveItemFormUIProps> = ({
    barcode,
    onChangeBarcode,
    quantity,
    onChangeQuantity,
    status,
    onCheck,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Приём товара</Text>

            <Text style={styles.label}>Штрихкод</Text>
            <TextInput
                style={styles.input}
                placeholder="Сканируйте или введите"
                value={barcode}
                onChangeText={onChangeBarcode}
            />

            <Text style={styles.label}>Количество</Text>
            <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={onChangeQuantity}
                keyboardType="numeric"
            />

            <Button title="Проверить" onPress={onCheck} />

            {!!status && <Text style={styles.status}>{status}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 16, marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 5, borderRadius: 5 },
    status: { marginTop: 20, color: 'blue', fontSize: 16 },
});
