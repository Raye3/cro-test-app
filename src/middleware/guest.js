export default function (router) {
  router.beforeEach((to, from, next) => {
    // check if the route being navigated is only for guest
    if (to.matched.some((record) => record.meta.guest)) {
      // check if user is authenticated, if it is, redirect
      if (localStorage.getItem('auth_token')) {
        router.push({ name: 'dashboard-index' })
      } else {
        next()
      }
    } else {
      next()
    }
    next()
  })
}
