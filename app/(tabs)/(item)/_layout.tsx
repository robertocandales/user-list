import React from 'react';

import {Stack} from 'expo-router';

export default function ItemLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen
        name="itemList"
        options={{
          title: 'User List'
        }}
      />
      <Stack.Screen
        name="itemDetails"
        options={{
          title: 'User Details'
        }}
      />
    </Stack>
  );
}
