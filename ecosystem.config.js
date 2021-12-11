module.exports = {
  apps : [{
    name   : "form",
    script : "./app.js",
    env_production: {
      TELEGRAM_TOKEN: '',
      CHAT_ID: '',
      CAPTCHA_SECRET: '',
      CAPTCHA_SITE_KEY: '',
    },
  }]
}