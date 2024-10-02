/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
        colors : {
            primary : "#40A2E3",
            secondary : "#9ED1F0",
            lightwhite : "#ECF9FF",
            primary_black : "#374151",
            backgroundLight : "#f1f5f9"
        },
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1200px',
        },
    },
    },
    plugins: [],
}

