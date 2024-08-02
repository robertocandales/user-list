import React from 'react';
import {Link, Stack} from 'expo-router';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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'
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Oops! Page Not Found</Text>
        <Text style={styles.message}>
          The page you're looking for doesn’t exist. Please check the URL or go
          back to the home screen.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to Home Screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff'
  },
  linkText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  }
});
