/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    // Base breakpoints
    screens: {
      md: '430px', // larger phones
      lg: '768px', // tablets
    },
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F0F4F8',
        },
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
          tertiary: '#94A3B8',
        },
        accent: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        border: {
          light: '#E2E8F0',
          medium: '#CBD5E1',
        },
      },
    },
  },
  plugins: [
    // Plugin for auto-scaling text sizes
    function ({addUtilities, matchUtilities, theme}) {
      // Create text utilities from 8 to 40
      matchUtilities(
        {
          text: value => {
            const size = parseInt(value);
            return {
              fontSize: `${size}px`,
              lineHeight: `${size * 1.5}px`,
              '@screen md': {
                fontSize: `${size * 1.125}px`,
                lineHeight: `${size * 1.5 * 1.125}px`,
              },
              '@screen lg': {
                fontSize: `${size * 1.25}px`,
                lineHeight: `${size * 1.5 * 1.25}px`,
              },
            };
          },
        },
        {
          values: Object.fromEntries(
            Array.from({length: 33}, (_, i) => [i + 8, `${i + 8}`]),
          ),
        },
      );

      // Create spacing utilities that work with React Native
      const spacingValues = {};
      Array.from({length: 100}, (_, i) => {
        const size = i + 1;
        spacingValues[size] = {
          padding: size,
          margin: size,
          gap: size,
        };
      });

      // Add padding utilities
      addUtilities(
        Object.entries(spacingValues).reduce((acc, [size, values]) => {
          return {
            ...acc,
            [`.p-${size}`]: {
              padding: `${values.padding * 4}px`,
              '@screen md': {
                padding: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                padding: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.px-${size}`]: {
              paddingLeft: `${values.padding * 4}px`,
              paddingRight: `${values.padding * 4}px`,
              '@screen md': {
                paddingLeft: `${values.padding * 4 * 1.125}px`,
                paddingRight: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingLeft: `${values.padding * 4 * 1.25}px`,
                paddingRight: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.py-${size}`]: {
              paddingTop: `${values.padding * 4}px`,
              paddingBottom: `${values.padding * 4}px`,
              '@screen md': {
                paddingTop: `${values.padding * 4 * 1.125}px`,
                paddingBottom: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingTop: `${values.padding * 4 * 1.25}px`,
                paddingBottom: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.pt-${size}`]: {
              paddingTop: `${values.padding * 4}px`,
              '@screen md': {
                paddingTop: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingTop: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.pb-${size}`]: {
              paddingBottom: `${values.padding * 4}px`,
              '@screen md': {
                paddingBottom: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingBottom: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.pl-${size}`]: {
              paddingLeft: `${values.padding * 4}px`,
              '@screen md': {
                paddingLeft: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingLeft: `${values.padding * 4 * 1.25}px`,
              },
            },
            [`.pr-${size}`]: {
              paddingRight: `${values.padding * 4}px`,
              '@screen md': {
                paddingRight: `${values.padding * 4 * 1.125}px`,
              },
              '@screen lg': {
                paddingRight: `${values.padding * 4 * 1.25}px`,
              },
            },

            // Margin utilities
            [`.m-${size}`]: {
              margin: `${values.margin * 4}px`,
              '@screen md': {
                margin: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                margin: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.mx-${size}`]: {
              marginLeft: `${values.margin * 4}px`,
              marginRight: `${values.margin * 4}px`,
              '@screen md': {
                marginLeft: `${values.margin * 4 * 1.125}px`,
                marginRight: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginLeft: `${values.margin * 4 * 1.25}px`,
                marginRight: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.my-${size}`]: {
              marginTop: `${values.margin * 4}px`,
              marginBottom: `${values.margin * 4}px`,
              '@screen md': {
                marginTop: `${values.margin * 4 * 1.125}px`,
                marginBottom: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginTop: `${values.margin * 4 * 1.25}px`,
                marginBottom: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.mt-${size}`]: {
              marginTop: `${values.margin * 4}px`,
              '@screen md': {
                marginTop: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginTop: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.mb-${size}`]: {
              marginBottom: `${values.margin * 4}px`,
              '@screen md': {
                marginBottom: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginBottom: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.ml-${size}`]: {
              marginLeft: `${values.margin * 4}px`,
              '@screen md': {
                marginLeft: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginLeft: `${values.margin * 4 * 1.25}px`,
              },
            },
            [`.mr-${size}`]: {
              marginRight: `${values.margin * 4}px`,
              '@screen md': {
                marginRight: `${values.margin * 4 * 1.125}px`,
              },
              '@screen lg': {
                marginRight: `${values.margin * 4 * 1.25}px`,
              },
            },

            // Gap utility
            [`.gap-${size}`]: {
              gap: `${values.gap * 4}px`,
              '@screen md': {
                gap: `${values.gap * 4 * 1.125}px`,
              },
              '@screen lg': {
                gap: `${values.gap * 4 * 1.25}px`,
              },
            },
          };
        }, {}),
      );
    },
  ],
};
