export type TypeColors = {
  tint: string;
  textSecondary: string;
  background: string;
  cardBackground: string;
  border: string;
  textPrimary?: string;
  cardBackgroundDark?: string;
  borderDark?: string;
};

export const colorsPalette: {
  light: TypeColors;
  dark: TypeColors;
} = {
  light: {
    tint: '#000',
    textSecondary: '#666',
    background: '#f0f0f0',
    cardBackground: '#fff',
    border: '#ddd',
    textPrimary: '#000'
  },
  dark: {
    tint: '#fff',
    textSecondary: '#ccc',
    background: '#333',
    cardBackground: '#222',
    border: '#444',
    textPrimary: '#fff'
  }
};
