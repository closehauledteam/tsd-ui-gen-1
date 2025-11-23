// AUTO-GENERATED FILE
// screenId: confirm-receive
// spec: specs/screens/confirm-receive.md
// WARNING: This file is generated automatically based on requirements.

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface Props {
    item: { id: string; name: string };
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmReceiveFormUI: React.FC<Props> = ({
    item,
    onConfirm,
    onCancel,
}) => {
    return (
        <View style={styles.screen}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Подтверждение</Text>
                <Text style={styles.headerSubtitle}>Подтвердите приём товара</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Item Details Card */}
                <View style={styles.card}>
                    <Text style={styles.label}>Товар</Text>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemSubtitle}>ID: {item.id}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.card}>
                    <TouchableOpacity style={styles.primaryButton} onPress={onConfirm}>
                        <Text style={styles.buttonText}>Подтвердить приём</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
                        <Text style={styles.secondaryButtonText}>Отмена</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: theme.spacing.l,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.pill,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.xxl,
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    buttonText: {
        ...theme.typography.buttonText,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: theme.borderRadius.pill,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.xxl,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
    },
});
