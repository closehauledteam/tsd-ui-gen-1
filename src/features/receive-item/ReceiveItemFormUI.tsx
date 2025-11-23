// AUTO-GENERATED FILE
// screenId: receive-item
// spec: specs/screens/receive-item.md
// WARNING: This file is generated automatically based on requirements.

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Props {
    barcode: string;
    onChangeBarcode: (text: string) => void;
    quantity: string;
    onChangeQuantity: (text: string) => void;
    onCheck: () => void;
    status: string;
    scannedItem?: { id: string; name: string } | null;
}

export const ReceiveItemFormUI: React.FC<Props> = ({
    barcode,
    onChangeBarcode,
    quantity,
    onChangeQuantity,
    onCheck,
    status,
    scannedItem,
}) => {
    return (
        <View style={styles.screen}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Приём товара</Text>
                <Text style={styles.headerSubtitle}>Сканируйте штрихкод товара</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Scan Card */}
                <View style={styles.card}>
                    <Text style={styles.label}>Штрихкод</Text>
                    <TextInput
                        style={styles.input}
                        value={barcode}
                        onChangeText={onChangeBarcode}
                        placeholder="Введите или сканируйте..."
                        placeholderTextColor={theme.colors.textSecondary}
                    />

                    <Text style={styles.label}>Количество</Text>
                    <TextInput
                        style={styles.input}
                        value={quantity}
                        onChangeText={onChangeQuantity}
                        placeholder="1"
                        keyboardType="numeric"
                        placeholderTextColor={theme.colors.textSecondary}
                    />

                    <TouchableOpacity style={styles.primaryButton} onPress={onCheck}>
                        <Text style={styles.buttonText}>Проверить</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Message */}
                {status ? (
                    <View style={styles.card}>
                        <Text style={[
                            styles.statusText,
                            status.includes('Ошибка') ? styles.errorText : styles.successText
                        ]}>
                            {status}
                        </Text>
                    </View>
                ) : null}

                {/* Item Details Card */}
                {scannedItem && (
                    <View style={styles.card}>
                        <Text style={styles.label}>Найден товар:</Text>
                        <Text style={styles.itemTitle}>{scannedItem.name}</Text>
                        <Text style={styles.itemSubtitle}>ID: {scannedItem.id}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.xl,
        borderBottomLeftRadius: theme.borderRadius.l,
        borderBottomRightRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.m,
    },
    headerTitle: {
        ...theme.typography.headerTitle,
    },
    headerSubtitle: {
        ...theme.typography.headerSubtitle,
    },
    content: {
        padding: theme.spacing.l,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.l,
        marginBottom: theme.spacing.m,
        ...theme.shadows.card,
    },
    label: {
        ...theme.typography.label,
        marginTop: theme.spacing.s,
    },
    input: {
        backgroundColor: theme.colors.inputBackground,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.s,
        padding: theme.spacing.m,
        marginTop: theme.spacing.s,
        marginBottom: theme.spacing.l,
        ...theme.typography.input,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.pill,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.xxl,
        alignItems: 'center',
        marginTop: theme.spacing.m,
    },
    buttonText: {
        ...theme.typography.buttonText,
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        color: theme.colors.statusRed,
        fontWeight: 'bold',
    },
    successText: {
        color: theme.colors.statusGreen,
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.s,
    },
    itemSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
});
