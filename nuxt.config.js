module.exports = {
  /*
   ** Headers of the page
   */
 /* server: {
            port: 59847,
            host: "127.0.4.195",
        },*/
  mode: "spa",
  head: {
    title: "Riderra",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no",
      },
      { name: "verify-paysera", content: "62146bc5c4017c962d28da066b8510c2" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&amp;subset=cyrillic-ext",
      },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  modules: [
    "vue-scrollto/nuxt",
    "@nuxtjs/axios",

    [
      "nuxt-google-maps-module",
      {
        key: "AIzaSyBf3Lh9cG-h6AjZlUPKyAFUxNhKbC7QKZs",
      },
    ],

    [
      "nuxt-i18n",
      {
        locales: [
          {
            code: "ru",
            iso: "ru-RU",
            file: "ru-RU.js",
          },
          {
            code: "en",
            iso: "en-GB",
            file: "en-GB.js",
          },
          {
            code: "de",
            iso: "de-DE",
            file: "de-DE.js",
          },
        ],
        strategy: "no_prefix",
        defaultLocale: "ru",
        lazy: true,
        langDir: "lang/",
        detectBrowserLanguage: {
          cookieKey: "i18n_redirected",
          alwaysRedirect: false,
          fallbackLocale: "ru",
        },
      },
    ],
  ],
  maps: {
    key: "AIzaSyBf3Lh9cG-h6AjZlUPKyAFUxNhKbC7QKZs",
  },
  loading: { color: "#3B8070" },

  plugins: [{ src: "~/plugins/plugins.js", ssr: false }],
  css: [
    { src: "~/assets/css/swiper.css", lang: "css" },
    { src: "~/assets/css/main.scss", lang: "sass" },
    { src: "~/assets/css/base.scss", lang: "sass" },
    { src: "~/assets/css/payment.scss", lang: "sass" },
  ],
  /* axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://riderra.serenity-dev.ru/functions.php',
      pathRewrite: {'^/api/': ''}
    }
},
  */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
  env: {
    baseUrl: "https://riderra.com"
  },
  serverMiddleware: [
    { path: "api/createBooking", handler: "~/api/createBooking.js" },
    { path: "api/updateBooking", handler: "~/api/updateBooking.js" },
    { path: "api/cancelBooking", handler: "~/api/cancelBooking.js" },
    { path: "api/GetServiceTypesWithPrice", handler: "~/api/GetServiceTypesWithPrice.js" }
  ],
};
