import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBSOpqcAZwVt18m39gDEE7HfKOCAVxuU_4',
  authDomain: 'desafio-bancoafro.firebaseapp.com',
  projectId: 'desafio-bancoafro',
  storageBucket: 'desafio-bancoafro.appspot.com',
  messagingSenderId: '152199323228',
  appId: '1:152199323228:web:16199502aa842c46fe5099',
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
