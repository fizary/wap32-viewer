import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                outfit: "'Outfit', serif",
                roboto: "'Roboto', serif",
            },
            colors: {
                brand: "#ea580c",
            },
            animation: {
                accordionSlideDown: "accordionSlideDown .3s",
                accordionSlideUp: "accordionSlideUp .3s",
            },
            keyframes: {
                accordionSlideDown: {
                    from: { height: "0px" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                accordionSlideUp: {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0px" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
