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
                primary: {
                    light: '#60A5FA',
                    DEFAULT: '#2563EB',
                    dark: '#1D4ED8',
                },
                secondary: {
                    light: '#34D399',
                    DEFAULT: '#10B981',
                    dark: '#059669',
                },
                warning: '#F59E0B',
                danger: '#EF4444',
                dark: '#111827',
                light: '#F3F4F6',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
