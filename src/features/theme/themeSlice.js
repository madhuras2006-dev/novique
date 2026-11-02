import { createSlice } from '@reduxjs/toolkit';

// Helper to get initial theme preference
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const savedTheme = window.localStorage.getItem('novique_theme');
    if (savedTheme) return savedTheme;
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    return 'light';
  }
};

const initialTheme = getInitialTheme();

// Apply theme class to document body on init
if (typeof window !== 'undefined') {
  if (initialTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

const initialState = {
  mode: initialTheme, // 'light' or 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('novique_theme', state.mode);
        if (state.mode === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('novique_theme', state.mode);
        if (state.mode === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;