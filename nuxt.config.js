import localeMessages from './src/static/locales'

export default {
    ssr: false,

    server: {
        port : 3000,
        host : '0.0.0.0',
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title     : 'Aurora SaaS',
        htmlAttrs : {
            lang: 'es',
        },

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' },
        ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@aurora-enterprise-solutions/aur-design/src/assets/styles/styles.css',
        '@/assets/styles/styles.css',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '@/plugins/aur-design', mode: 'client' },
        { src: '@/plugins/masonry', mode: 'client' },
        '@/plugins/mq',
        { src: '@/plugins/http-status', mode: 'client' },
        { src: '@/plugins/persisted-state', mode: 'client' },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxt/typescript-build',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        'nuxt-i18n',
        '@nuxtjs/auth-next',
    ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {

            if (ctx.isDev)
                config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
        
        },
    },

    router: {
        middleware: 'auth',
        extendRoutes(routes, resolve) {

            routes.push( {
                name      : 'custom',
                path      : '*',
                component : resolve(__dirname, 'src/pages/login.vue'),
            } )
        
        },
    },

    srcDir: 'src/',

    i18n: {
        locales               : [ 'es' ],
        defaultLocale         : 'es',
        strategy              : 'prefix_and_default',
        detectBrowserLanguage : {
            useCookie : true,
            cookieKey : 'i18n_redirected',
        },

        vueI18n: {
            fallbackLocale : 'es',
            messages       : localeMessages,
        },
    },

    auth: {
        redirect: {
            login    : '/login',
            logout   : '/login',
            callback : false,
            home     : '/modules',
        },

        strategies: {
            local: {
                scheme : 'refresh',
                token  : {
                    property : 'tokens.access.token',
                    maxAge   : 3600,
                    required : true,
                    type     : 'Bearer',
                },

                refreshToken: {
                    property      : 'tokens.refresh.token',
                    data          : 'refreshToken',
                    maxAge        : 3600,
                    required      : true,
                    tokenRequired : false,
                },

                user: {
                    property  : 'user',
                    autoFetch : true,
                },

                endpoints: {
                    login   : { url: '/auth/login', method: 'post' },
                    refresh : { url: '/auth/refresh-tokens', method: 'post' },
                    user    : { url: '/auth/user', method: 'get' },
                    logout  : { url: '/auth/logout', method: 'get' },
                },

                autoLogout: false,
            },
        },
    },

    publicRuntimeConfig: {
        axios: {
            baseURL: process.env.NUXT_ENV_API_HOST,
        },
    },

    privateRuntimeConfig: {
    },
}
