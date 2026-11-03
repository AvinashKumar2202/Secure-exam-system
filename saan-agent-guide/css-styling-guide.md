# CSS & Styling Implementation Guide

When building components like the **SAAN AI Agent** and the **Third Eye**, it's crucial to understand how styling is handled in the `Mini-Project`. 

Based on the project's architecture, this application heavily uses **Material-UI (MUI)** alongside **Emotion (CSS-in-JS)** for its styling, rather than relying solely on traditional `.css` files.

Here is a detailed breakdown of where and how CSS is used in this project.

---

## 1. The Primary Styling Engine: Material-UI (MUI) & Emotion

If you look at the `package.json`, you will see dependencies like `@mui/material`, `@emotion/react`, and `@emotion/styled`. This means the project uses a **CSS-in-JS** approach. Instead of writing separate `.css` files and linking them, you write CSS directly inside your React Javascript/JSX files.

### Why use CSS-in-JS here?
- **Scoped Styles**: Styles are locally scoped to the component, preventing CSS from leaking and breaking other pages.
- **Dynamic Styling**: You can easily change styles based on React state (e.g., changing a button's color to red if `isSuspicious === true` during proctoring).
- **Theme Consistency**: MUI provides a central `theme` object for consistent colors, fonts, and spacing.

---

## 2. How to Apply Styles (3 Different Ways)

When building the SAAN Chat UI or the Third Eye layout, you have three main ways to apply CSS in this specific project:

### Method A: The `sx` Prop (Recommended for most things)
MUI provides an `sx` prop on almost all of its components (`Box`, `Typography`, `Button`, etc.). This acts like an advanced `style` attribute that supports CSS features like hover states, media queries, and direct access to the project theme.

**Example: Styling the Third Eye Webcam Container**
```jsx
import { Box } from '@mui/material';

const ThirdEyeContainer = () => {
  return (
    <Box 
      sx={{ 
        border: '4px solid',
        borderColor: 'primary.main', // Pulls from MUI Theme
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)' // Standard CSS hover pseudo-class
        }
      }}
    >
      {/* Webcam Component Goes Here */}
    </Box>
  );
};
```

### Method B: The `styled()` API (For reusable custom components)
If you have a complex component (like the Chat Bubbles for the SAAN Agent) and the `sx` prop gets too messy, you can create a custom styled HTML element using Emotion's `styled` utility.

**Example: Styling the SAAN Chat Bubbles**
```jsx
import { styled } from '@mui/material/styles';

// Creates a custom <div> with predefined CSS
const ChatBubble = styled('div')(({ theme, isUser }) => ({
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[200],
  color: isUser ? '#fff' : '#000',
  padding: '12px 16px',
  borderRadius: '20px',
  maxWidth: '70%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  marginBottom: '10px',
  fontFamily: "'Inter', sans-serif",
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
}));

// Usage in component:
// <ChatBubble isUser={true}>Hello SAAN!</ChatBubble>
```

### Method C: Traditional `.css` Files (For global styles)
You will still use standard CSS files (like `App.css` or `index.css`), but *only for global rules*.

**Where to use it:**
- Setting the global `body` background color.
- Importing custom fonts (like Google Fonts: Inter or Roboto).
- Resetting margins/padding (`* { box-sizing: border-box; margin: 0; }`).

You simply import these at the top of your `index.js` or `App.js`:
```javascript
import './index.css'; 
```

---

## 3. Specific Styling Guidelines for the Project

### For the SAAN AI Agent (Chatbot UI):
- **Layout**: Use MUI's `<Stack>` component for stacking messages vertically.
- **Scrollbar**: Custom scrollbars are essential for chat windows. You can style the scrollbar globally in `index.css` using `::-webkit-scrollbar` pseudo-elements.
- **Typography**: Use MUI's `<Typography>` component instead of standard `<p>` or `<h1>` tags to ensure consistent font weights and sizes.

### For the Third Eye (Proctoring UI):
- **Positioning**: Use the `sx` prop to set `position: 'fixed'` or `position: 'absolute'` to float the webcam feed in the corner of the screen during an exam.
- **Alert Colors**: Use MUI's semantic colors for proctoring alerts. For example, if a phone is detected, set the border or text to `error.main` (which resolves to red in MUI) to immediately catch the student's attention.

## Summary

In this project, **do not write long `.css` files for every component**. Instead:
1. Import components from `@mui/material`.
2. Use the `sx={{ ... }}` prop to apply CSS directly to those components.
3. Leverage the `theme` object to keep colors and spacing consistent.
