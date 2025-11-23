import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function FormUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход в систему</Text>
      <Text>TODO: Implement UI for auth-login</Text>
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
