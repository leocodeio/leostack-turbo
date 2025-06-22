import type { InitOptions } from 'i18next';

export const supportedLngs = ['en', 'es', 'hi', 'ja', 'zh'] as const;
export type SupportedLanguages = (typeof supportedLngs)[number];

export const defaultNS = 'common';
export const fallbackLng: SupportedLanguages = 'en';

export function getOptions(lng = fallbackLng): InitOptions {
  return {
    supportedLngs,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: [defaultNS],
    resources: {
      en: {
        common: {
          greeting: "Hello",
          welcome: "Welcome to Spectral",
          hero: {
            description: "Make your feedback talk",
          },
        }
      },
      es: {
        common: {
          greeting: "Hola",
          welcome: "Bienvenido a Spectral",
          hero: {
            description: "Haz que tu feedback hable",
          },
        }
      },
      hi: {
        common: {
          greeting: "नमस्ते",
          welcome: "स्पेक्ट्रल में आपका स्वागत है",
          hero: {
            description: "आपके प्रतिक्रियाओं का बोलने दें",
          },
        }
      },
      ja: {
        common: {
          greeting: "こんにちは",
          welcome: "スペクトラルにごようび",
          hero: {
            description: "あなたのフィードバックを話す",
          },
        }
      },
      zh: {
        common: {
          greeting: "你好",
          welcome: "欢迎来到Spectral",
          hero: {
            description: "让你的反馈发声",
          },
        }
      }
    }
  };
}

export const languageNames: Record<SupportedLanguages, string> = {
  en: 'English',
  es: 'Español',
  hi: 'हिन्दी',
  ja: '日本語',
  zh: '中文',
};