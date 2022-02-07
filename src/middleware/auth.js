export default function (router) {
  router.beforeEach((to, from, next) => {
    // check if the route being navigated requires auth or not
    if (to.matched.some((record) => record.meta.auth)) {
      // check if user is authenticated
      if (!localStorage.getItem('auth_token')) {
        router.push({ name: 'login' })
      } else {
        next()
      }
    } else {
      next()
    }
    next()
  })
}
