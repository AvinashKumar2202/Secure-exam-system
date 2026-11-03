import React from 'react';
import { useMediaQuery, Box, Drawer, GlobalStyles } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const SIDEBAR_WIDTH = '270px';

const SidebarGlobalStyles = () => (
  <GlobalStyles
    styles={{
      '@keyframes sidebarShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      '.sidebar-paper': {
        background:
          'linear-gradient(160deg, rgba(14,18,38,0.98), rgba(28,34,71,0.96), rgba(49,43,112,0.94), rgba(10,80,87,0.92)) !important',
        backgroundSize: '400% 400% !important',
        animation: 'sidebarShift 8s ease infinite !important',
        borderRight: 'none !important',
        boxShadow: '18px 0 40px rgba(16,24,40,0.22) !important',
        backdropFilter: 'blur(18px)',
      },
      '.sidebar-paper::before': {
        content: '""',
        display: 'block',
        height: '1px',
        opacity: 0.8,
        background: 'linear-gradient(90deg, rgba(167,139,250,0), #A78BFA, #14CBA8, rgba(167,139,250,0))',
        backgroundSize: '200% 100%',
        animation: 'sidebarShift 4s linear infinite',
      },
      '.sidebar-paper::after': {
        content: '""',
        position: 'absolute',
        inset: 'auto -80px 24px auto',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,92,226,0.25) 0%, rgba(91,92,226,0) 72%)',
        filter: 'blur(8px)',
      },
    }}
  />
);

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const paperProps = {
    className: 'sidebar-paper',
    sx: { width: SIDEBAR_WIDTH, boxSizing: 'border-box', overflow: 'hidden' },
  };

  const sidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Box px={3} pt={1}>
        <Logo />
      </Box>
      <Box
        flex={1}
        overflow="auto"
        sx={{
          px: 1.5,
          pb: 2,
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.16)',
            borderRadius: '999px',
          },
        }}
      >
        <SidebarItems />
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <>
        <SidebarGlobalStyles />
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
          <Drawer
            anchor="left"
            open={props.isSidebarOpen}
            variant="permanent"
            PaperProps={paperProps}
          >
            {sidebarContent}
          </Drawer>
        </Box>
      </>
    );
  }

  return (
    <>
      <SidebarGlobalStyles />
      <Drawer
        anchor="left"
        open={props.isMobileSidebarOpen}
        onClose={props.onSidebarClose}
        variant="temporary"
        PaperProps={{
          ...paperProps,
          sx: { ...paperProps.sx, boxShadow: '0 8px 32px rgba(108,63,255,0.3)' },
        }}
      >
        <Box px={2}>
          <Logo />
        </Box>
        <SidebarItems />
      </Drawer>
    </>
  );
};

export default Sidebar;
