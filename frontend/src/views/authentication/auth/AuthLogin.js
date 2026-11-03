import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IconLock, IconMail } from '@tabler/icons-react';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack spacing={2.75}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            component="label"
            htmlFor="username"
            mb="10px"
            sx={{ display: 'block', color: '#0f172a' }}
          >
            Username or Email
          </Typography>
          <CustomTextField
            id="username"
            name="email"
            variant="outlined"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconMail size={18} color="#6366f1" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
                borderRadius: '16px',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 15px rgba(148, 163, 184, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                  borderColor: 'rgba(99,102,241,0.2)',
                  borderWidth: '1px',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.15)',
                  '& fieldset': {
                    borderColor: 'rgba(99,102,241,0.4)',
                  }
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.25)',
                  transform: 'translateY(-2px)',
                  '& fieldset': {
                    borderColor: '#6366f1',
                    borderWidth: '2px',
                  }
                },
              },
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            component="label"
            htmlFor="password"
            mb="10px"
            sx={{ display: 'block', color: '#0f172a' }}
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password ? errors.password : null}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconLock size={18} color="#14b8a6" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
                borderRadius: '16px',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 15px rgba(148, 163, 184, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                  borderColor: 'rgba(20,184,166,0.2)',
                  borderWidth: '1px',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(20, 184, 166, 0.15)',
                  '& fieldset': {
                    borderColor: 'rgba(20,184,166,0.4)',
                  }
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 30px rgba(20, 184, 166, 0.25)',
                  transform: 'translateY(-2px)',
                  '& fieldset': {
                    borderColor: '#14b8a6',
                    borderWidth: '2px',
                  }
                },
              },
            }}
          />
        </Box>

        <Stack
          justifyContent="space-between"
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={{ xs: 1.25, sm: 2 }}
          sx={{ width: '100%', mt: '12px' }}
        >
          <FormGroup sx={{ m: 0 }}>
            <FormControlLabel
              sx={{ m: 0, gap: 0.75, alignItems: 'center' }}
              control={<Checkbox defaultChecked sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' }, p: 0.5, mr: 0.75 }} />}
              label={
                <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
                  Remember this device
                </Typography>
              }
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="600"
            variant="body2"
            sx={{
              textDecoration: 'none',
              color: '#6366f1',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              alignSelf: { xs: 'flex-start', sm: 'center' },
              transition: 'color 0.2s',
              '&:hover': { color: '#4f46e5', textDecoration: 'underline' },
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>
      </Stack>

      <Box mt={4}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{
            minHeight: 56,
            borderRadius: '16px',
            fontWeight: 700,
            fontSize: '1.05rem',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            backgroundSize: '200% auto',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'all 0.6s ease',
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              backgroundPosition: 'right center',
              boxShadow: '0 15px 35px -5px rgba(99, 102, 241, 0.6)',
              '&::after': {
                left: '100%',
              }
            },
            '&:active': {
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 20px -5px rgba(99, 102, 241, 0.5)',
            }
          }}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
