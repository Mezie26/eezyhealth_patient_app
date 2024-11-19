import { PixelRatio, StyleSheet } from 'react-native';

export const theme = {
  colors: {
    primary: '#DD3E3E',
    primaryLight: '#F77D77',
    white: '#FFFFFF',
    secondary: '#1A6171',
    secondaryLight: '#3C8CA3',
    onSecondary: '#CCCCCC',
    tertiary: '#526A74',
    tertiaryLight: '#7A8E96',
    onTertiary: '#333333',
    error: '#BA1A1A',
    outline: '#80747C',
    red: '#DD3E3E',
    green: '#53C351',
    bluelight: '#3737AD',
    bluelighter: '#9DCDF8',
    blue: '#00539C',
    black: '#000000',
    lightgray: '#F5F5F5',
    lightgray_two: '#FAFAFA',
    lightgray_three: '#E5E5E5',
    dimgray: '#404040',
    text: '#525252',
  },
  dimensions: {
    radius: 10,
  },
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flex_centered: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownButtonStyle: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    textAlign: 'left',
    borderRadius: 5,
  },
  profileImage: {
    height: 75,
    width: 75,
    resizeMode: 'contain',
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: '#0001',
    marginRight: 10,
    backgroundColor: '#0003',
  },
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
});

const deviceFont = 12 * PixelRatio.getFontScale();
export const defaultFontSize = Math.max(Math.min(deviceFont, 13), 10);

export default styles;
