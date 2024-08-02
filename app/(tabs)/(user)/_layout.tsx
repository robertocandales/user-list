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
