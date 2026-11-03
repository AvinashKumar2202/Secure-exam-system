import React from 'react';
import { GlobalStyles } from '@mui/material';

const AnimationStyles = () => (
  <GlobalStyles
    styles={{
      '@keyframes fadeSlideUp': {
        from: { opacity: 0, transform: 'translateY(28px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      '@keyframes bellShake': {
        '0%, 100%': { transform: 'rotate(0deg)' },
        '10%': { transform: 'rotate(-18deg)' },
        '20%': { transform: 'rotate(18deg)' },
        '30%': { transform: 'rotate(-12deg)' },
        '40%': { transform: 'rotate(12deg)' },
        '50%': { transform: 'rotate(-6deg)' },
        '60%': { transform: 'rotate(6deg)' },
        '70%': { transform: 'rotate(-3deg)' },
        '80%': { transform: 'rotate(3deg)' },
        '90%': { transform: 'rotate(0deg)' },
      },
      '@keyframes pulseGlow': {
        '0%, 100%': { boxShadow: '0 0 0 0 rgba(108,99,255,0.0)' },
        '50%': { boxShadow: '0 0 20px 6px rgba(108,99,255,0.45)' },
      },
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '-200% center' },
        '100%': { backgroundPosition: '200% center' },
      },
      '@keyframes floatBlob': {
        '0%, 100%': { transform: 'translateY(0px) scale(1)' },
        '50%': { transform: 'translateY(-30px) scale(1.06)' },
      },
      '@keyframes softPulse': {
        '0%, 100%': { transform: 'scale(1)', opacity: 0.88 },
        '50%': { transform: 'scale(1.06)', opacity: 1 },
      },
      '@keyframes floatSlow': {
        '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
        '50%': { transform: 'translate3d(0, -12px, 0)' },
      },
      '@keyframes shimmerBg': {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
      '@keyframes pageSlideInRight': {
        from: { opacity: 0, transform: 'translate3d(54px, 0, 0) scale(0.985)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
      },
      '@keyframes pageSlideInLeft': {
        from: { opacity: 0, transform: 'translate3d(-54px, 0, 0) scale(0.985)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
      },
      '.anim-fade-up': {
        animation: 'fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both',
      },
      '.anim-fade-up-d1': { animationDelay: '0.08s' },
      '.anim-fade-up-d2': { animationDelay: '0.16s' },
      '.anim-fade-up-d3': { animationDelay: '0.24s' },
      '.anim-fade-up-d4': { animationDelay: '0.32s' },
      '.anim-fade-up-d5': { animationDelay: '0.40s' },
      '.page-slide-right': {
        animation: 'pageSlideInRight 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
      '.page-slide-left': {
        animation: 'pageSlideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
    }}
  />
);

export default AnimationStyles;
