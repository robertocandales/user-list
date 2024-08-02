import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main Page',
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
