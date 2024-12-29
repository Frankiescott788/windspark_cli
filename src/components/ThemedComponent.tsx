import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

export const ThemedComponent: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        Current Theme: {isDarkMode ? 'Dark' : 'Light'}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: theme.background }]}>
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
