import firebase from 'firebase/app'

export default (context) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user == null) {
      if (context.route.fullPath === `/`) {
        return context.redirect('/signin')
      }
    }

    if (user) {
      if (
        context.route.fullPath === `/signin` ||
        context.route.fullPath === `/signup`
      ) {
        return context.redirect('/')
      }
    }
  })
}
