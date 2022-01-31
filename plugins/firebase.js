import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyC2RJ_1lL0DOuZHzxa8fsYd56aU1R_RpLI',
  authDomain: 'desafio-bancoafro-13bb2.firebaseapp.com',
  databaseURL: 'https://desafio-bancoafro-13bb2-default-rtdb.firebaseio.com',
  projectId: 'desafio-bancoafro-13bb2',
  storageBucket: 'desafio-bancoafro-13bb2.appspot.com',
  messagingSenderId: '782178407955',
  appId: '1:782178407955:web:170a53fd72a311ce33d1e6',
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
