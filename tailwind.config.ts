module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-3d')({ legacy: true })
    ],
}
