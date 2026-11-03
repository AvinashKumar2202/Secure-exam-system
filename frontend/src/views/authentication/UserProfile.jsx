import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    GlobalStyles,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import {
    IconArrowUpRight,
    IconEdit,
    IconMail,
    IconShieldCheck,
    IconSparkles,
    IconUser,
} from '@tabler/icons-react';

const UserProfile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const getAvatar = () => {
        if (userInfo?.gender === 'female') return `https://avatar.iran.liara.run/public/girl?username=${userInfo?.name}`;
        if (userInfo?.gender === 'male') return `https://avatar.iran.liara.run/public/boy?username=${userInfo?.name}`;
        if (userInfo?.gender === 'other') return `https://avatar.iran.liara.run/public?username=${userInfo?.name}`;
        return ProfileImg;
    };

    const profileRows = [
        {
            icon: <IconUser size={20} color="#1d4ed8" />,
            label: 'Full Name',
            value: userInfo?.name || 'N/A',
            accent: 'linear-gradient(135deg, rgba(59,130,246,0.16), rgba(14,165,233,0.1))',
        },
        {
            icon: <IconMail size={20} color="#c026d3" />,
            label: 'Email Address',
            value: userInfo?.email || 'N/A',
            accent: 'linear-gradient(135deg, rgba(217,70,239,0.16), rgba(244,114,182,0.1))',
        },
        {
            icon: <IconShieldCheck size={20} color="#d97706" />,
            label: 'Role',
            value: userInfo?.role || 'N/A',
            capitalize: true,
            accent: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(251,191,36,0.1))',
        },
        {
            icon: <IconSparkles size={20} color="#059669" />,
            label: userInfo?.role === 'teacher' ? 'Teacher ID' : 'Student UID',
            value: (userInfo?.role === 'teacher' ? userInfo?.teacherId : userInfo?.universityId) || 'N/A',
            accent: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(45,212,191,0.1))',
        },
    ];

    const highlights = [
        {
            value: userInfo?.role === 'teacher' ? 'Mentor Mode' : 'Exam Ready',
            label: 'Current Track',
        },
        {
            value: userInfo?.role === 'teacher' ? 'Class Performance' : 'Learning Journey',
            label: 'Focus Area',
        },
        {
            value: userInfo?.email ? 'Verified Access' : 'Pending Setup',
            label: 'Profile Status',
        },
    ];

    return (
        <PageContainer title="My Profile" description="Your profile dashboard">
            <GlobalStyles
                styles={{
                    '@keyframes profileGradientFlow': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' },
                    },
                    '@keyframes profileFloat': {
                        '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                        '50%': { transform: 'translate3d(0, -18px, 0)' },
                    },
                    '@keyframes slidePanelLeft': {
                        from: { opacity: 0, transform: 'translate3d(-70px, 0, 0)' },
                        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                    },
                    '@keyframes slidePanelRight': {
                        from: { opacity: 0, transform: 'translate3d(70px, 0, 0)' },
                        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                    },
                    '@keyframes riseUp': {
                        from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
                        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                    },
                    '@keyframes glowPulse': {
                        '0%, 100%': { boxShadow: '0 18px 45px rgba(29, 78, 216, 0.28)' },
                        '50%': { boxShadow: '0 28px 60px rgba(192, 38, 211, 0.22)' },
                    },
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: { xs: '28px', md: '36px' },
                    minHeight: 'calc(100vh - 110px)',
                    px: { xs: 2, md: 4 },
                    py: { xs: 3, md: 5 },
                    background: 'linear-gradient(130deg, #eff6ff 0%, #fdf2f8 45%, #ecfeff 100%)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.16), rgba(236,72,153,0.12), rgba(20,184,166,0.14))',
                        backgroundSize: '220% 220%',
                        animation: 'profileGradientFlow 14s ease infinite',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -80,
                        left: -40,
                        width: 260,
                        height: 260,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 70%)',
                        filter: 'blur(18px)',
                        animation: 'profileFloat 10s ease-in-out infinite',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -110,
                        right: -10,
                        width: 320,
                        height: 320,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(217,70,239,0.22), transparent 70%)',
                        filter: 'blur(18px)',
                        animation: 'profileFloat 12s ease-in-out infinite',
                    }}
                />

                <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid item xs={12} lg={7}>
                        <Box
                            sx={{
                                height: '100%',
                                p: { xs: 3, md: 4.5 },
                                borderRadius: '32px',
                                color: '#fff',
                                position: 'relative',
                                overflow: 'hidden',
                                background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 48%, #0f766e 100%)',
                                boxShadow: '0 26px 70px rgba(15, 23, 42, 0.28)',
                                animation: 'slidePanelLeft 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 26%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 22%)',
                                }}
                            />

                            <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                                <Chip
                                    label="Profile Dashboard"
                                    sx={{
                                        width: 'fit-content',
                                        color: '#e0f2fe',
                                        fontWeight: 700,
                                        letterSpacing: 0.5,
                                        bgcolor: 'rgba(255,255,255,0.14)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                />

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                    <Box
                                        sx={{
                                            p: '4px',
                                            borderRadius: '30px',
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.35))',
                                            animation: 'glowPulse 4.5s ease-in-out infinite',
                                        }}
                                    >
                                        <Avatar
                                            src={getAvatar()}
                                            alt="Profile"
                                            sx={{
                                                width: { xs: 110, md: 140 },
                                                height: { xs: 110, md: 140 },
                                                borderRadius: '26px',
                                                border: '3px solid rgba(255,255,255,0.5)',
                                                bgcolor: '#dbeafe',
                                            }}
                                        />
                                    </Box>

                                    <Stack spacing={1.25}>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 900,
                                                lineHeight: 1,
                                                fontSize: { xs: '2.4rem', md: '3.4rem' },
                                            }}
                                        >
                                            {userInfo?.name || 'User'}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 520 }}>
                                            A polished command center for your identity, activity, and account details with smooth motion and a cleaner visual story.
                                        </Typography>
                                        <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                                            <Chip
                                                label={userInfo?.role === 'teacher' ? 'Teacher Access' : 'Student Access'}
                                                sx={{ bgcolor: '#fff', color: '#0f172a', fontWeight: 800 }}
                                            />
                                            <Chip
                                                label="Animated UI"
                                                sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700 }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Grid container spacing={2}>
                                    {highlights.map((item, index) => (
                                        <Grid item xs={12} sm={4} key={item.label}>
                                            <Box
                                                sx={{
                                                    p: 2.25,
                                                    borderRadius: '22px',
                                                    background: 'rgba(255,255,255,0.12)',
                                                    border: '1px solid rgba(255,255,255,0.16)',
                                                    backdropFilter: 'blur(14px)',
                                                    animation: 'riseUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
                                                    animationDelay: `${0.15 * (index + 1)}s`,
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    {item.label}
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.6 }}>
                                                    {item.value}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box
                                    sx={{
                                        p: { xs: 2.25, md: 2.8 },
                                        borderRadius: '26px',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                                        border: '1px solid rgba(255,255,255,0.14)',
                                        backdropFilter: 'blur(14px)',
                                    }}
                                >
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                Keep your profile fresh
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                                                Update your account details and keep the dashboard aligned with your latest information.
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            endIcon={<IconArrowUpRight size={18} />}
                                            onClick={() => navigate('/user/account')}
                                            sx={{
                                                px: 3,
                                                py: 1.4,
                                                borderRadius: '16px',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                color: '#0f172a',
                                                bgcolor: '#fff',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    bgcolor: '#e0f2fe',
                                                    boxShadow: 'none',
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            Open Account Editor
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Stack spacing={3} sx={{ height: '100%' }}>
                            <Box
                                sx={{
                                    p: { xs: 3, md: 3.5 },
                                    borderRadius: '30px',
                                    background: 'rgba(255,255,255,0.68)',
                                    border: '1px solid rgba(255,255,255,0.72)',
                                    backdropFilter: 'blur(18px)',
                                    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                                    animation: 'slidePanelRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                            Personal Details
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                            Smooth cards, stronger hierarchy, and a cleaner profile overview.
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: '14px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            background: 'linear-gradient(135deg, #dbeafe, #fce7f3)',
                                        }}
                                    >
                                        <IconSparkles size={22} color="#4338ca" />
                                    </Box>
                                </Stack>

                                <Stack spacing={1.8}>
                                    {profileRows.map((item, index) => (
                                        <Box
                                            key={item.label}
                                            sx={{
                                                p: 2.1,
                                                borderRadius: '22px',
                                                background: item.accent,
                                                border: '1px solid rgba(255,255,255,0.5)',
                                                animation: 'riseUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both',
                                                animationDelay: `${0.2 + index * 0.08}s`,
                                                transition: 'transform 0.24s ease, box-shadow 0.24s ease',
                                                '&:hover': {
                                                    transform: 'translateX(8px)',
                                                    boxShadow: '0 14px 32px rgba(148, 163, 184, 0.2)',
                                                },
                                            }}
                                        >
                                            <Stack direction="row" spacing={1.6} alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '16px',
                                                        display: 'grid',
                                                        placeItems: 'center',
                                                        bgcolor: 'rgba(255,255,255,0.7)',
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                                                        {item.label}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mt: 0.35,
                                                            color: '#0f172a',
                                                            fontWeight: 800,
                                                            textTransform: item.capitalize ? 'capitalize' : 'none',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {item.value}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            <Box
                                sx={{
                                    p: { xs: 3, md: 3.5 },
                                    borderRadius: '30px',
                                    background: 'rgba(15,23,42,0.92)',
                                    color: '#fff',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    animation: 'riseUp 0.95s cubic-bezier(0.22, 1, 0.36, 1) both',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(236,72,153,0.18), transparent 34%)',
                                    }}
                                />
                                <Stack spacing={2.2} sx={{ position: 'relative', zIndex: 1 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                        Profile Energy
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                                        The interface now uses layered gradients, floating light shapes, and slide-based interactions to make the profile area feel more alive.
                                    </Typography>
                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                                    <Stack direction="row" spacing={1.4} flexWrap="wrap" useFlexGap>
                                        <Chip label="Glass Panels" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700 }} />
                                        <Chip label="Slide Motion" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700 }} />
                                        <Chip label="Responsive Layout" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700 }} />
                                    </Stack>
                                    <Button
                                        variant="outlined"
                                        startIcon={<IconEdit size={18} />}
                                        onClick={() => navigate('/user/account')}
                                        sx={{
                                            width: 'fit-content',
                                            mt: 0.5,
                                            color: '#fff',
                                            borderColor: 'rgba(255,255,255,0.22)',
                                            borderRadius: '16px',
                                            px: 2.5,
                                            py: 1.1,
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: 'rgba(255,255,255,0.42)',
                                                bgcolor: 'rgba(255,255,255,0.06)',
                                            },
                                        }}
                                    >
                                        Edit My Profile
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default UserProfile;
