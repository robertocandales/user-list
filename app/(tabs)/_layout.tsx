import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Tabs} from 'expo-router';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {colorsPalette} from '@/config/theme/colors';
import {useTheme} from '@/state/ThemeContext';
import {Ionicons} from '@expo/vector-icons';

export default function TabLayout() {
  const {theme, toggleTheme} = useTheme();
  const currentColors = colorsPalette[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentColors.tint,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: currentColors.background
        },
        tabBarInactiveTintColor: currentColors.textSecondary,
        headerStyle: {
          backgroundColor: currentColors.background
        },
        headerTintColor: currentColors.textPrimary,
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.themeToggleButton}
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          headerShown: false,
          title: 'User List',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'person-circle' : 'person-circle-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  themeToggleButton: {
    padding: 10,
    marginRight: 15
  }
});
