import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { ServicesProvider } from './src/app/services/ServicesContext';
import { mockServices } from './src/platform/mock/mockServices';
import { ReceiveItemScreen } from './src/features/receive-item/ReceiveItemScreen';
import { ConfirmReceiveScreen } from './src/features/confirm-receive/ConfirmReceiveScreen';

export default function AppDebug() {
    const [currentScreen, setCurrentScreen] = useState<'receive' | 'confirm'>('receive');

    return (
        <ServicesProvider services={mockServices}>
            <SafeAreaView style={styles.container}>
                <View style={styles.nav}>
                    <Button title="Receive Item" onPress={() => setCurrentScreen('receive')} />
                    <Button title="Confirm Receive" onPress={() => setCurrentScreen('confirm')} />
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Debug App</Text>
                    <View style={styles.screenContainer}>
                        {currentScreen === 'receive' ? <ReceiveItemScreen /> : <ConfirmReceiveScreen />}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ServicesProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    nav: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#fff' },
    content: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    screenContainer: { backgroundColor: 'white', padding: 10, borderRadius: 10, minHeight: 300 },
});
