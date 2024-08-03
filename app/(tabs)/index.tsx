import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '@/state/ThemeContext';
import {colorsPalette} from '@/config/theme/colors';

const HomeScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const currentColors = colorsPalette[theme];

  return (
    <View
      style={[styles.container, {backgroundColor: currentColors.background}]}
    >
      <Image
        source={{
          uri: 'https://online.york.ac.uk/wp-content/uploads/2023/02/09_Software-development-skills-1210x423.jpg'
        }}
        style={styles.logo}
      />
      <Text style={[styles.title, {color: currentColors.textPrimary}]}>
        Welcome to technical challenge app
      </Text>
      <Text style={[styles.description, {color: currentColors.textSecondary}]}>
        This is a technical challenge app built with React Native and Expo.
      </Text>
      <TouchableOpacity
        style={styles.themeToggleContainer}
        onPress={toggleTheme}
        testID="theme-toggle-button"
      >
        <Ionicons
          name={theme === 'light' ? 'moon' : 'sunny'}
          size={24}
          color={theme === 'light' ? '#000' : '#fff'}
          style={styles.icon}
        />
        <Text style={[styles.themeText, {color: currentColors.textPrimary}]}>
          {theme === 'light' ? 'Light Mode' : 'Dark Mode'} - Change Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 10,
    marginVertical: 0,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  icon: {
    marginRight: 10
  },
  themeText: {
    fontSize: 16
  }
});

export default HomeScreen;
