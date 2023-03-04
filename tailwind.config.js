/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx,ts}"],
  theme: {
    fontFamily: {
      mono: ["Space Mono"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#283237",
          secondary: "#78909c",
          accent: "#CFD8DC",
          neutral: "#191D24",
          "base-100": "#FFFFFF",
          info: "#212121",
          success: "#4affa7",
          warning: "#FFE26E",
          error: "#FA8484",
        }
      },
    ],
  },

  plugins: [require("daisyui")],
};
