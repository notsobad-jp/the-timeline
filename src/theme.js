import { createMuiTheme } from '@material-ui/core/styles';
import { teal, pink, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
    error: red,
    background: {
      default: '#fff',
    },
  },
});

export default theme;
