import React, { useState } from 'react';
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import SaanAIWidget from 'src/components/chat/SaanAIWidget';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <PageWrapper className="page-wrapper">
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(20px)',
              opacity: 0.6,
              animation: 'floatBlob 12s ease-in-out infinite',
            },
            '&::before': {
              width: 320,
              height: 320,
              top: -120,
              right: -120,
              background: 'radial-gradient(circle, rgba(91,92,226,0.18) 0%, rgba(91,92,226,0) 70%)',
            },
            '&::after': {
              width: 280,
              height: 280,
              bottom: 20,
              left: -120,
              background: 'radial-gradient(circle, rgba(20,203,168,0.16) 0%, rgba(20,203,168,0) 70%)',
              animationDelay: '2s',
            },
          }}
        />
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            pt: { xs: 3, md: 4 },
            px: { xs: 2, sm: 3 },
            maxWidth: '1280px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)', pb: 4 }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
      <SaanAIWidget />
    </MainWrapper>
  );
};

export default FullLayout;
