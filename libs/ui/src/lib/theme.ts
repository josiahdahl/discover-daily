import { ITheme, theme } from '@chakra-ui/core';

export const Theme: ITheme = {
  ...theme,
  colors: {
    ...theme.colors,
    pink: {
      50: '#ffe7f6',
      100: '#f5bedc',
      200: '#eb93c2',
      300: '#e26aaa',
      400: '#d84092',
      500: '#bf2878',
      600: '#951d5d',
      700: '#6c1443',
      800: '#420a29',
      900: '#1b000f',
    },
    purple: {
      50: '#eeebff',
      100: '#cbc6ee',
      200: '#a9a0df',
      300: '#877ad1',
      400: '#6554c3',
      500: '#4c3aa9',
      600: '#3a2d84',
      700: '#2a205f',
      800: '#19133b',
      900: '#080519',
    },
    orange: {
      50: '#fff2db',
      100: '#ffdbb0',
      200: '#fcc581',
      300: '#faad52',
      400: '#f79621',
      500: '#de7d08',
      600: '#ac6103',
      700: '#7c4501',
      800: '#4c2900',
      900: '#1e0c00',
    },
  },
};
