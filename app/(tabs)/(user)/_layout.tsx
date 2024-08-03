import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Stack} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '@/state/ThemeContext';
import {colorsPalette} from '@/config/theme/colors';

export default function ItemLayout() {
  const {theme, toggleTheme} = useTheme();
  const currentColors = colorsPalette[theme];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: currentColors.background},
        headerTintColor: currentColors.textPrimary,
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.headerIconContainer}
            testID="theme-toggle-header-button"
          >
            <Ionicons
              name={theme === 'light' ? 'moon' : 'sunny'}
              size={24}
              color={currentColors.textPrimary}
            />
          </TouchableOpacity>
        )
      }}
    >
      <Stack.Screen
        name="userList"
        options={{
          title: 'User List'
        }}
      />
      <Stack.Screen
        name="userDetails"
        options={{
          title: 'User Details'
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerIconContainer: {
    marginRight: 15
  }
});
