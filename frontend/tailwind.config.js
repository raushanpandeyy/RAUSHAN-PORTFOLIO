/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#f6feff",
        nebula: "#dff9fb",
        plasma: "#06b6d4",
        coral: "#12d6c5",
        ink: "#06343d",
        glass: "rgba(255,255,255,0.68)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 28px rgba(18,214,197,0.42), 0 0 58px rgba(6,182,212,0.22)",
        coral: "0 0 24px rgba(18,214,197,0.45)",
      },
    },
  },
  plugins: [],
};
