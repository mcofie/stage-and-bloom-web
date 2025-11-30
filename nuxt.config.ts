// nuxt.config.ts
export default defineNuxtConfig({
    srcDir: 'src/',
    serverDir: 'src/server',          // 👈 ADD THIS

    typescript: {
        strict: true,
        typeCheck: true,
    },
    modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxt/image', '@nuxt/eslint'],
    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        },
    },

    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY,
        redirect: false,
    },
})