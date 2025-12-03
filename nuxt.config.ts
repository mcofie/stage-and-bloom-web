// nuxt.config.ts
export default defineNuxtConfig({
    srcDir: 'src/',
    serverDir: 'src/server',          // 👈 ADD THIS

    typescript: {
        strict: true,
        typeCheck: false,
    },
    modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxt/image', '@nuxt/eslint', '@vueuse/nuxt'],

    image: {
        domains: [
            'images.pexels.com',
            process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : ''
        ].filter(Boolean)
    },

    colorMode: {
        classSuffix: ''
    },

    css: ['~/assets/css/main.css'],

    build: {
        transpile: ['@supabase/supabase-js']
    },
    vite: {
        optimizeDeps: {
            include: ['@supabase/supabase-js']
        }
    },

    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
            posthogPublicKey: 'phc_5IuBruCp37CaBk0hwatcseEqiUTJ0FAz8wnhDqoUc4q',
            posthogHost: 'https://us.i.posthog.com',
            posthogDefaults: '2025-11-30'
        },
    },

    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY,
        redirect: false,
    },
})