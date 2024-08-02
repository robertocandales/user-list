import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '@/config/theme/colors';

const Loading = () => {
  return (
    <View testID="loading-indicator" style={styles.loader}>
      <ActivityIndicator size="large" color={colors.accent} />
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
