import type {Config} from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "url('/images/bg-auth.png)"
      },
    },
    colors: {
      "header": "#343C6A",
      "main": "#212B27",
      "subMain": "#333333",
      "primary": "#2D60FF",
      "secondaryText": "#B1B1B1",
      "secondaryBG": "#F4F6F9",
      "hoverPrimary": "#4096ff",
      "hoverDanger": "#FF7875",
      "placeholderText": "#8BA3CB",
      "placeholderICON": "#718EBF",
      "placeholderBG": "#F5F7FA",
      "border": "##0000001a"
    }
  },
  plugins: [ nextui() ],
};
export default config;
