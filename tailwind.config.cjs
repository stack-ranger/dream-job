/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/**/*.html",
    ],
    theme: {
        extend: {
            keyframes: {
                icons: {
                    '0%': {transform: 'translate(0)'},
                    '100%': {transform: 'translate(-1536px)'},
                }
            },
            animation: {
                icons: 'icons 30s linear infinite',
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
