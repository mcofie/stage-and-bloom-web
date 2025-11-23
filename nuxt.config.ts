// nuxt.config.ts
export default defineNuxtConfig({
    srcDir: 'src/',
    typescript: {
        strict: true,
        typeCheck: false,
    },
    modules: ['@nuxt/ui', '@nuxtjs/supabase'],
    css: ['~/assets/css/main.css'],

    // 👇 what YOUR code (server routes, plugins) can read
    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // optional for later
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        },
    },

    // 👇 what the @nuxtjs/supabase MODULE itself uses
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY,
        redirectOptions: {
            login: '/auth/sign-in',      // where to send users to log in
            callback: '/auth/callback',  // (optional) for magic links / OAuth
            exclude: ['/', '/auth/sign-in'], // public pages
        },
    },
});