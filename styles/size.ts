const SIZE = {
  xxs: 0.5 * 16,   // 8px
  xs: 0.75 * 16,    // 12px
  sm: 0.875 * 16,   // 14px
  base: 1 * 16,     // 16px
  lg: 1.125 * 16,   // 18px
  xl: 1.25 * 16,    // 20px
  '2xl': 1.5 * 16,  // 24px
  '3xl': 1.875 * 16, // 30px
  '4xl': 2.25 * 16, // 36px
  '5xl': 3 * 16,    // 48px
  '6xl': 3.75 * 16, // 60px
  '7xl': 4.5 * 16,  // 72px
  '8xl': 6 * 16,    // 96px
  '9xl': 8 * 16,    // 128px
  '10xl': 10 * 16,  // 160px
} as const;

export default SIZE;