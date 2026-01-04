import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 墨夜色系 - 单色层次
        'ink': {
          'void': '#050608',      // 最深：虚空
          'night': '#080b12',     // 墨夜：主背景
          'deep': '#0d1420',      // 玄青：卡片背景
          'medium': '#1a2332',    // 靛蓝：边框/分割
          'light': '#2a3444',     // 浅层：悬停态
        },
        // 文字色系
        'moon': {
          'white': '#e8eaed',     // 月白：主文字
          'gray': '#9ca3af',      // 月灰：次要文字
          'mist': '#6b7280',      // 月雾：辅助文字
        },
        // 点缀色（极少量使用）
        'accent': {
          'gold': '#d4a574',      // 天机金：启示时刻
          'gold-dim': '#b8956a',  // 暗金：悬停态
          'vermilion': '#c45c48', // 朱砂红：盖章/印记
          'vermilion-light': '#d4726a', // 浅朱砂
        },
      },
      fontFamily: {
        'serif': ['"Noto Serif SC"', 'serif'],
        'sans': ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 165, 116, 0.15), 0 0 40px rgba(212, 165, 116, 0.05)',
        'glow-soft': '0 0 30px rgba(212, 165, 116, 0.08)',
        'inner-glow': 'inset 0 0 20px rgba(212, 165, 116, 0.05)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'breathe-slow': 'breathe 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'ripple': 'ripple 2s ease-out forwards',
        'ink-spread': 'inkSpread 2s ease-out forwards',
        'stamp': 'stamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        stamp: {
          '0%': { transform: 'scale(1.2) rotate(-12deg)', opacity: '0' },
          '50%': { transform: 'scale(0.95) rotate(-8deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-8deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
