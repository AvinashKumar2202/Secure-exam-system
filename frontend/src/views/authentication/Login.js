import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, Chip, GlobalStyles, Stack, Typography } from '@mui/material';
import {
  IconArrowRight,
  IconChecks,
  IconDeviceDesktopAnalytics,
  IconSparkles,
  IconStars,
} from '@tabler/icons-react';

import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './../../slices/usersApiSlice';
import { setCredentials } from './../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from './Loader';

const userValidationSchema = yup.object({
  email: yup.string().required('Username or Email is required'),
  password: yup.string().min(2).required('Password is required'),
});
const initialUserValues = { email: '', password: '' };

const Login = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    setRotation({ x: yAxis, y: -xAxis });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [navigate, userInfo]);

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      formik.resetForm();
      const redir = JSON.parse(localStorage.getItem('redirectLocation'));
      if (redir) {
        localStorage.removeItem('redirectLocation');
        navigate(redir.pathname);
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <PageContainer title="Login - SAAN AI" description="Sign in to your account">
      <GlobalStyles
        styles={{
          '@keyframes authAurora': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          '@keyframes floatBlob': {
            '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
            '50%': { transform: 'translate3d(0, -30px, 0) scale(1.05)' },
          },
          '@keyframes slideInLeft': {
            from: { opacity: 0, transform: 'translate3d(-40px, 0, 0)' },
            to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          },
          '@keyframes slideInRight': {
            from: { opacity: 0, transform: 'translate3d(40px, 0, 0)' },
            to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          },
          '@keyframes pulseRing': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
            '50%': { transform: 'scale(1.12)', opacity: 0.95 },
          },
          '@keyframes panelGlow': {
            '0%, 100%': { boxShadow: '0 24px 60px rgba(99, 102, 241, 0.12)' },
            '50%': { boxShadow: '0 32px 76px rgba(99, 102, 241, 0.25)' },
          },
          '@keyframes text3D': {
            '0%, 100%': {
              transform: 'rotateX(0deg) rotateY(0deg)',
              textShadow: '0px 0px 0px rgba(255,255,255,0)',
            },
            '50%': {
              transform: 'rotateX(10deg) rotateY(-15deg) translateZ(10px)',
              textShadow: '1px 1px 0px #3b82f6, 2px 2px 0px #2563eb, 3px 3px 0px #1d4ed8, 4px 4px 0px #1e40af, 5px 5px 0px #1e3a8a, 15px 15px 20px rgba(0,0,0,0.4)',
            }
          },
        }}
      />

      <Box
        className="page-slide-right"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 6 },
          background:
            'radial-gradient(circle at top left, rgba(91,92,226,0.18), transparent 35%), radial-gradient(circle at 85% 18%, rgba(20,203,168,0.18), transparent 30%), linear-gradient(135deg, #f0f4ff 0%, #ffffff 35%, #f5f7ff 65%, #eefcff 100%)',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'floatBlob 12s ease-in-out infinite',
            zIndex: 0,
          },
          '&::before': {
            width: 400,
            height: 400,
            top: -150,
            right: -100,
            background: 'radial-gradient(circle, rgba(123,77,255,0.15) 0%, rgba(123,77,255,0) 70%)',
          },
          '&::after': {
            width: 350,
            height: 350,
            bottom: -150,
            left: -100,
            background: 'radial-gradient(circle, rgba(20,203,168,0.12) 0%, rgba(20,203,168,0) 70%)',
            animationDelay: '3s',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.2), rgba(99,102,241,0.06), rgba(20,184,166,0.06), rgba(255,255,255,0.2))',
            backgroundSize: '300% 300%',
            animation: 'authAurora 18s ease infinite',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: 680, md: 760, lg: 1240 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.08fr 0.92fr' },
            gap: { xs: 0, lg: 3.5 },
            position: 'relative',
            zIndex: 1,
            alignItems: 'stretch',
            transition: 'transform 0.1s ease-out',
            transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <Card
            elevation={0}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              p: 5,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '34px',
              background:
                'linear-gradient(150deg, rgba(15,23,42,0.98) 0%, rgba(37,99,235,0.94) 52%, rgba(13,148,136,0.9) 100%)',
              color: '#fff',
              minHeight: 700,
              flexDirection: 'column',
              justifyContent: 'space-between',
              animation: 'slideInLeft 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
              transformStyle: 'preserve-3d',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.12), transparent 18%), radial-gradient(circle at 80% 22%, rgba(123,77,255,0.28), transparent 24%), radial-gradient(circle at 72% 78%, rgba(20,203,168,0.22), transparent 20%)',
                pointerEvents: 'none',
              }}
            />
            <Box sx={{ position: 'absolute', top: 28, right: 28, zIndex: 1 }}>
              <Box
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.16)',
                  position: 'relative',
                  animation: 'pulseRing 6s ease-in-out infinite',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 18,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <IconStars size={26} />
                </Box>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, pr: 6, transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
              <Chip
                icon={<IconSparkles size={14} />}
                label="Smarter exam experience"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <Typography 
                variant="h1" 
                sx={{ 
                  color: '#fff', 
                  maxWidth: 560, 
                  mb: 2,
                  animation: 'text3D 6s ease-in-out infinite',
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  lineHeight: 1.2
                }}
              >
                Sign in to a more cinematic exam workspace.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 540, mb: 4 }}>
                SAAN AI now feels sharper and more alive, with animated depth, cleaner hierarchy,
                and a stronger sign-in flow for students and teachers.
              </Typography>
              <Stack spacing={2.2}>
                {[
                  'Animated panels guide attention toward the next action',
                  'Cleaner structure keeps sign-in fast on both desktop and mobile',
                  'Premium gradients and glass effects make the screen feel modern',
                ].map((item) => (
                  <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '14px',
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        flexShrink: 0,
                      }}
                    >
                      <IconChecks size={18} />
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.45 }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ position: 'relative', zIndex: 1, mt: 4 }}
            >
              {[
                {
                  title: 'Live Readiness',
                  desc: 'Stay ready with clearer access to active exams and status cues.',
                  icon: <IconDeviceDesktopAnalytics size={20} />,
                },
                {
                  title: 'Smooth Motion',
                  desc: 'Subtle animation creates polish without slowing the experience down.',
                  icon: <IconSparkles size={20} />,
                },
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: '22px',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    minHeight: 180,
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '14px',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      mb: 1.5,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 0.8 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item.desc}</Typography>
                </Box>
              ))}
            </Stack>
          </Card>

          <Card
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4, lg: 4.5 },
              width: '100%',
              maxWidth: { xs: '100%', sm: 620, md: 680, lg: '100%' },
              minHeight: { lg: 700 },
              justifySelf: 'stretch',
              alignSelf: 'stretch',
              position: 'relative',
              borderRadius: '34px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              animation: 'slideInRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: '0.08s',
              boxShadow: '0 28px 80px rgba(15, 23, 42, 0.12)',
              display: 'flex',
              transformStyle: 'preserve-3d',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at top right, rgba(99,102,241,0.16), transparent 24%), radial-gradient(circle at bottom left, rgba(45,212,191,0.14), transparent 26%)',
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                animation: 'panelGlow 5s ease-in-out infinite',
                borderRadius: '28px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateZ(50px)' }}>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2.5}>
                  <Logo />
                </Box>

                <Typography variant="h3" fontWeight={800} textAlign="center" mb={1}>
                  Sign in to continue
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  mb={4}
                  sx={{ maxWidth: 460, mx: 'auto', lineHeight: 1.6 }}
                >
                  Access your dashboard, upcoming exams, and performance insights from one place.
                </Typography>

                <AuthLogin
                  formik={formik}
                  subtext={null}
                  subtitle={
                    <Stack spacing={1.25} alignItems="center" mt={3}>
                      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                        <Typography color="text.secondary" variant="body2">
                          New to SAAN AI?
                        </Typography>
                        <Typography
                          component={Link}
                          to="/auth/register"
                          fontWeight={700}
                          variant="body2"
                          sx={{ textDecoration: 'none', color: 'primary.main' }}
                        >
                          Create an account
                        </Typography>
                      </Stack>
                      <Typography
                        component={Link}
                        to="/auth/register"
                        variant="subtitle2"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          textDecoration: 'none',
                          color: 'text.primary',
                        }}
                      >
                        Explore the new experience
                        <IconArrowRight size={16} />
                      </Typography>
                      {isLoading && <Loader />}
                    </Stack>
                  }
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Login;

