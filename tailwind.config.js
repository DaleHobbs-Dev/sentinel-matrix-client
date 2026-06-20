/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Map CSS variables to Tailwind colors
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                    darker: 'var(--color-primary-darker)',
                    lighter: 'var(--color-primary-lighter)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    light: 'var(--color-accent-light)',
                    dark: 'var(--color-accent-dark)',
                    darker: 'var(--color-accent-darker)',
                    lighter: 'var(--color-accent-lighter)',
                },
                danger: {
                    DEFAULT: 'var(--color-danger)',
                    light: 'var(--color-danger-light)',
                    dark: 'var(--color-danger-dark)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    light: 'var(--color-warning-light)',
                    dark: 'var(--color-warning-dark)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    light: 'var(--color-success-light)',
                    dark: 'var(--color-success-dark)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    light: 'var(--color-info-light)',
                    dark: 'var(--color-info-dark)',
                },
            },
            fontFamily: {
                sans: 'var(--font-family-sans)',
                mono: 'var(--font-family-mono)',
            },
        },
    },
    plugins: [],
}
