/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Any propierties defined here will overwrite the tailwind default
    fontFamily: { sans: 'Roboto Mono, monospace' },
    extend: {
      // Any propierties defined here as long as it has a different name than a default one, will be added to the original tailwind propierties
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
