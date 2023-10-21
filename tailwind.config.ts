import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            width: {
                '128': '32rem',
                '540': '540px',
                '720': '720px',
                '960': '960px',
                '1140': '1140px',
                '1320': '1320px',
            },
            animation: {
                'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    daisyui: {
        themes: ["dracula"],
    },
    plugins: [daisyui],
}
export default config
