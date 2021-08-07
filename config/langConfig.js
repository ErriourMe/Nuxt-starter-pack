import en from '../lang/en/index.js'
import ru from '../lang/ru/index.js'

export const langConfig = {
  pluralizationRules: {
    ru(choice, choicesLength) {
      if (choice === 0) {
        return 0
      }

      const teen = choice > 10 && choice < 20
      const endsWithOne = choice % 10 === 1

      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2
      }
      if (!teen && endsWithOne) {
        return 1
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
      }

      return choicesLength < 4 ? 2 : 3
    },
  },
  locales: [
    {
      code: 'ru',
      name: 'Русский',
      iso: 'ru-RU',
    },
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
    },
  ],
  seo: true,
  // strategy: 'no_prefix',
  differentDomains: false,
  defaultLocale: 'ru',
  vueI18n: {
    fallbackLocale: 'ru',
    messages: { en, ru },
  },
}
