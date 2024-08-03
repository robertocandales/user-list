import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '@/state/ThemeContext';
import {colorsPalette} from '@/config/theme/colors';

const Loading = () => {
  const {theme} = useTheme();
  const currentColors = colorsPalette[theme];

  return (
    <View
      testID="loading-indicator"
      style={[styles.loader, {backgroundColor: currentColors.background}]}
    >
      <ActivityIndicator size="large" color={currentColors.tint} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loading;
