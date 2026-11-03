import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5B5CE2',
      light: '#E7E8FF',
      dark: '#3738A5',
    },
    secondary: {
      main: '#14CBA8',
      light: '#E4FBF5',
      dark: '#0F8F78',
    },
    success: {
      main: '#1AB98B',
      light: '#E6FFFA',
      dark: '#0B8D69',
      contrastText: '#ffffff',
    },
    info: {
      main: '#4998FF',
      light: '#ECF4FF',
      dark: '#1B6FD6',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F26674',
      light: '#FFF0F2',
      dark: '#C83E4A',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F6AA2B',
      light: '#FFF5DF',
      dark: '#B1791A',
      contrastText: '#ffffff',
    },
    grey: {
      100: '#F5F7FF',
      200: '#E9EDFB',
      300: '#D6DDF3',
      400: '#8B96B7',
      500: '#64708D',
      600: '#1F2747',
    },
    text: {
      primary: '#18213F',
      secondary: '#62708F',
    },
    action: {
      disabledBackground: 'rgba(91,92,226,0.08)',
      hoverOpacity: 0.05,
      hover: '#EFF0FF',
    },
    divider: 'rgba(91,92,226,0.12)',
    background: {
      default: '#F4F6FC',
      paper: '#FFFFFF',
    },
  },
  typography,
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle at top left, rgba(91,92,226,0.14), transparent 28%), radial-gradient(circle at top right, rgba(20,203,168,0.12), transparent 24%), linear-gradient(180deg, #F8FAFF 0%, #F3F6FD 100%)',
          minHeight: '100vh',
        },
        '#root': {
          minHeight: '100vh',
        },
        '*::selection': {
          backgroundColor: 'rgba(91,92,226,0.18)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.7)',
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 45px rgba(24,33,63,0.08)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            boxShadow: '0 26px 55px rgba(24,33,63,0.12)',
            borderColor: 'rgba(91,92,226,0.18)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          fontWeight: 700,
          paddingInline: '1.1rem',
          transition: 'all 0.25s ease',
          boxShadow: 'none',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #5B5CE2 0%, #7B4DFF 55%, #14CBA8 100%)',
          backgroundSize: '180% 180%',
          boxShadow: '0 12px 30px rgba(91,92,226,0.28)',
          '&:hover': {
            backgroundPosition: '100% 0',
            boxShadow: '0 16px 36px rgba(91,92,226,0.36)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(91,92,226,0.18)',
          backgroundColor: 'rgba(255,255,255,0.62)',
          '&:hover': {
            borderColor: 'rgba(91,92,226,0.3)',
            backgroundColor: 'rgba(91,92,226,0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '22px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.82)',
          transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
          '& fieldset': {
            borderColor: 'rgba(99,112,143,0.18)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(91,92,226,0.28)',
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 5px rgba(91,92,226,0.08)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          overflow: 'hidden',
          backgroundColor: 'rgba(91,92,226,0.08)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
});

export { baselightTheme };
