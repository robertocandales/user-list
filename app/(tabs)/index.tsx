import {colors} from '@/config/theme/colors';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://online.york.ac.uk/wp-content/uploads/2023/02/09_Software-development-skills-1210x423.jpg'
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to technical challenge app</Text>
      <Text style={styles.description}>
        This is a technical challenge app built with React Native and Expo.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    marginVertical: 0,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,

    marginBottom: 20,
    textAlign: 'center'
  }
});

export default HomeScreen;
