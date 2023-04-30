/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#121D51',
                'secondary-blue': '#4949E4',
                'soft-blue': '#4949e412',
                'primary-grey': '#666',
                'secondary-grey': '#F8F8F8',
                'background-grey': '#D9D9D9',
                'light-black': '#00000053',
                'error-color': '#FF0000',
                'error-soft': '#ff000008',
                'success-color': '#0FE00B',
                'success-soft': '#0fe00b16',
                'red-discount' : '#EF144A',
                'red-discount-light': '#FFDBE2'
            }
        },
    },
    plugins: [],
}