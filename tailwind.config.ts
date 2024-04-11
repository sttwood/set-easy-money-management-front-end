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
      "mainDark": "#2B2B3D",
      "main": "#212B27",
      "subMain": "#333333",
      "primary": "#2D60FF",
      "secondaryText": "#B1B1B1",
      "alert": "#FF2F2F",
      "lightAlert": "#FF2F2F",
      "secondaryBG": "#F4F6F9",
      "borderLightBlue": "#DFEAF2",
      "bluePastelText": "#718EBF",
      "hoverPrimary": "#4096ff",
      "hoverDanger": "#FF7875",
      "placeholderText": "#8BA3CB",
      "placeholderICON": "#718EBF",
      "placeholderBG": "#F5F7FA",
      "border": "##0000001a",
      "borderBlueLight": "#E6EFF5"
    }
  },
  plugins: [ nextui() ],
};
export default config;
