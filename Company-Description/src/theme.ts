import { DefaultTheme } from 'react-native-paper';

export default {
  ...DefaultTheme,
  dark: false,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF0000',
    homePageBtn: '#6200EE',
    themeColor: ['#FF0000', '#540110'],
    white:'#FFFFFF',
    borderDisbled:'#c3c3c3'
  },
  fonts: {
    fontFamily: "Roboto",
  }
};