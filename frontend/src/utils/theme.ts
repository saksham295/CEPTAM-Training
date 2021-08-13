import { createTheme } from "@material-ui/core/styles";
// import ProductSans from '../assets/fonts/ProductSansRegular.ttf';

// const productsans = {
//   fontFamily: 'ProductSans',
//   fontStyle: 'normal',
//   // fontDisplay: 'swap',
//   fontWeight: 700,
//   src: `
//     local('ProductSans'),
//     url(${ProductSans}) format('truetype')
//   `,
// };

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a652",
    },
    secondary: {
      // main: '#f44336',
      main: "#ff7878",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "ProductSans, Arial",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // '@font-face': [productsans],
      },
    },
  },
});

export default theme;
