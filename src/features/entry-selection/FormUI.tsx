import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function FormUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбор режима работы</Text>
      <Text>TODO: Implement UI for entry-selection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
