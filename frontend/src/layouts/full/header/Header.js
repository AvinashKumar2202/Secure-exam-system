import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Profile from './Profile';
import { IconBellRinging, IconMenu, IconSchool } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import {
  useGetNotificationsQuery,
  useMarkNotificationsReadMutation,
} from '../../../slices/examApiSlice';

const timeAgo = (dateStr) => {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
};

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [markRead] = useMarkNotificationsReadMutation();

  const { data: notifications = [] } = useGetNotificationsQuery(undefined, {
    skip: userInfo?.role === 'teacher',
    pollingInterval: 30000,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (unreadCount > 0) {
      markRead();
    }
  };
  const handleBellClose = () => setAnchorEl(null);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    justifyContent: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.5)',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 'auto 16px 0',
      height: '1px',
      borderRadius: '999px',
      background: 'linear-gradient(90deg, rgba(91,92,226,0), rgba(91,92,226,0.7), rgba(20,203,168,0.6), rgba(91,92,226,0))',
      backgroundSize: '300% 100%',
      animation: 'gradientShift 4s linear infinite',
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    minHeight: '78px',
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: { lg: 'none', xs: 'inline' },
            border: '1px solid rgba(99,112,143,0.14)',
            bgcolor: 'rgba(255,255,255,0.6)',
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          aria-controls="notifications-menu"
          aria-haspopup="true"
          onClick={handleBellClick}
          sx={{
            borderRadius: '12px',
            border: '1px solid rgba(99,112,143,0.12)',
            bgcolor: 'rgba(255,255,255,0.62)',
            transition: 'background 0.2s, transform 0.2s ease',
            '&:hover': { background: 'rgba(91,92,226,0.08)', transform: 'translateY(-1px)' },
            ...(Boolean(anchorEl) && { color: '#5B5CE2' }),
            '& svg': unreadCount > 0
              ? {
                  animation: 'bellShake 1.2s cubic-bezier(.36,.07,.19,.97) 0.5s both',
                  animationIterationCount: 'infinite',
                  animationDuration: '3s',
                }
              : {},
          }}
        >
          <Badge badgeContent={unreadCount || null} color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>

        <Menu
          id="notifications-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleBellClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          PaperProps={{
            sx: {
              width: '320px',
              maxHeight: '400px',
              overflowY: 'auto',
              mt: '8px',
              boxShadow: '0 24px 50px rgba(24,33,63,0.14)',
              border: '1px solid rgba(91,92,226,0.08)',
              borderRadius: '22px',
              overflow: 'hidden',
            },
          }}
        >
          <Box
            px={2.5}
            py={1.5}
            sx={{
              background: 'linear-gradient(135deg, #5B5CE2 0%, #4F46C8 58%, #14CBA8 100%)',
            }}
          >
            <Typography variant="h6" fontWeight={700} color="#fff">
              Notifications
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">
              {notifications.length === 0 ? 'No notifications' : `${notifications.length} notification${notifications.length > 1 ? 's' : ''}`}
            </Typography>
          </Box>
          <Divider />

          {notifications.length === 0 ? (
            <Box px={2.5} py={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                You're all caught up.
              </Typography>
            </Box>
          ) : (
            notifications.map((item) => (
              <MenuItem
                key={item._id}
                onClick={handleBellClose}
                sx={{
                  py: 1.5,
                  gap: 1.5,
                  alignItems: 'flex-start',
                  background: item.read ? 'transparent' : 'rgba(108,99,255,0.04)',
                  '&:hover': { background: 'rgba(108,99,255,0.08)' },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 2px #6C63FF33',
                  }}
                >
                  <IconSchool size={18} color="#fff" />
                </Box>
                <Box flex={1} minWidth={0}>
                  <Typography variant="subtitle2" fontWeight={600} noWrap>
                    {item.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {timeAgo(item.createdAt)}
                  </Typography>
                </Box>
                {!item.read && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#6C63FF',
                      mt: '6px',
                      flexShrink: 0,
                    }}
                  />
                )}
              </MenuItem>
            ))
          )}
        </Menu>

        <Box flexGrow={1} />

        <Stack spacing={1.5} direction="row" alignItems="center">
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              background: 'linear-gradient(90deg, #6C63FF 0%, #00D4AA 40%, #A78BFA 70%, #6C63FF 100%)',
              letterSpacing: '-0.02em',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            Hello, {_.startCase(userInfo?.name || '')}
          </Box>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
