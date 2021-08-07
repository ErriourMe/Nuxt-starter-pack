const env = require('dotenv').config()?.parsed

export const yandexMetrikaConfig = {
  id: env.YANDEX_METRIKA_ID,
  webvisor: true,
  clickmap: true,
}
