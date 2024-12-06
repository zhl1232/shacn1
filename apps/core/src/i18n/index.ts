import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello World'
    }
  },
  zh: {
    message: {
      hello: '你好，世界'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
}) 