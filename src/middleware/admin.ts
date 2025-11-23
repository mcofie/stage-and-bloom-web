// src/middleware/admin.ts
export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    // Not logged in → send to sign-in with redirect back to admin
    if (!user.value) {
        const redirect = encodeURIComponent(to.fullPath)
        return navigateTo(`/auth/sign-in?redirect=${redirect}`)
    }

    // OPTIONAL: lock to your own account / team
    // if (user.value.email !== 'you@example.com') {
    //   return navigateTo('/')
    // }
})