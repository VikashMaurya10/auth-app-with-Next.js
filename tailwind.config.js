/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#ecf0f3",
        red: "#fe004c",
        black: "#1e2226",
        lightRed: "#fb074e",
        text: "#5f5e63",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right ,rgb(168 85 247 /800), rgb(236 72 153 /800))",
      },
    },
    fontFamily: {
      robo: ["var(--font-roboto)"],
      ubun: ["var(--font-ubuntu)"],
    },
  },
  plugins: [],
};
