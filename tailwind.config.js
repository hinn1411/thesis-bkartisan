/** @type {import('tailwindcss').Config} */
export default {
  content: [
<<<<<<< HEAD
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
=======
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Be Vietnam Pro', 'Poppins', 'sans-serif'],
>>>>>>> master
    },
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
<<<<<<< HEAD
    require("flowbite/plugin"),
=======
    require('flowbite/plugin'),
>>>>>>> master
  ],
};
