import { extendTheme, theme as base } from '@chakra-ui/react';

const retinaTema = extendTheme({
  colors: {
    retina: {
      colombia: '#F1C40F',
      uruguay: '#001BFF',
      peru: '#DF0101',
      mexico: '#27AE60',
      bolivia: '#566573',
      ecuador: '#B85DFF',
      otro: '#ffffff',
    },
    polla: {
      blanco: '#f2f3f4',
      negro: '#34495e',
      gana: '#dff9e8',
      pierde: '#f9d4d4',
      empata: '#f1f1ef',
      lux: '#f2f3f4',
    },
  },
  fonts: {
    heading: `Rokkitt, ${base.fonts.heading}`,
    body: `'Baloo 2', ${base.fonts.heading}`,
  },
});

export default retinaTema;
