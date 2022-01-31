<template>
  <div>
    <v-card elevation="2" shaped>
      <v-card-title>
        <h2>Cadatro</h2>
      </v-card-title>
      <v-text-field v-model="name" label="Nome" type="text"></v-text-field>
      <v-text-field v-model="email" label="Email" type="email"></v-text-field>
      <v-text-field
        v-model="password"
        label="Senha"
        type="password"
      ></v-text-field>
      <v-btn elevation="2" @click="validate">Cadastrar</v-btn>
      <v-card-text>
        <span
          >Já tem conta ? <NuxtLink to="/signin">Click aqui!</NuxtLink></span
        >
      </v-card-text>
    </v-card>
    <SnackBar :text="snackbar.text" :handleclick="snackbar.view" />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../plugins/firebase'
import SnackBar from '../components/SnackBar.vue'

export default {
  name: 'SignUp',
  components: {
    SnackBar,
  },
  layout: 'noLogger',

  data: () => ({
    name: '',
    email: '',
    password: '',
    errors: 0,
    snackbar: {
      text: '',
      view: false,
    },
  }),
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.replace('/')
      } else {
        return false
      }
    })
  },
  methods: {
    cadastro_usuario_post() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.cadastro_usuario_db_post()
          return this.$router.replace('/')
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.snackbar.text =
              'O endereço de e-mail já está sendo usado por outra conta.'
            this.snackbar.view = true
            setTimeout(() => {
              this.snackbar.text = ''
              this.snackbar.view = false
            }, 4000)
          }
        })
    },
    cadastro_usuario_db_post() {
      db.collection('users').doc(firebase.auth().currentUser.uid).set({
        nome: this.name,
        email: this.email,
        password: this.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    },
    validate() {
      if (!this.name) {
        this.errors = this.errors + 1
        this.snackbar.text = 'Campo "Nome", não pode estar vazio'
        this.snackbar.view = true
        setTimeout(() => {
          this.resetValidations()
          this.snackbar.text = ''
          this.snackbar.view = false
        }, 4000)
      }

      if (this.name) {
        if (this.name.length <= 2) {
          this.errors = this.errors + 1
          this.snackbar.text = 'Campo "Nome", obrigário ter no minimo 3 letras'
          this.snackbar.view = true
          setTimeout(() => {
            this.resetValidations()
            this.snackbar.text = ''
            this.snackbar.view = false
          }, 4000)
        }
      }

      if (this.email) {
        if (/.+@.+\..+/.test(this.email) !== true) {
          this.errors = this.errors + 1
          this.snackbar.text = 'Coloque um email valido'
          this.snackbar.view = true
          setTimeout(() => {
            this.resetValidations()
            this.snackbar.text = ''
            this.snackbar.view = false
          }, 4000)
        }
      }
      if (!this.email) {
        this.errors = this.errors + 1
        this.snackbar.text = 'Campo "Email", não pode estar vazio'
        this.snackbar.view = true
        setTimeout(() => {
          this.resetValidations()
          this.snackbar.text = ''
          this.snackbar.view = false
        }, 4000)
      }

      if (!this.password) {
        this.errors = this.errors + 1
        this.snackbar.text = 'Campo "Senha", não pode estar vazio'
        this.snackbar.view = true
        setTimeout(() => {
          this.resetValidations()
          this.snackbar.text = ''
          this.snackbar.view = false
        }, 4000)
      }
      if (this.password) {
        if (/.{6,}/.test(this.password) !== true) {
          this.errors = this.errors + 1
          this.snackbar.text = 'Sua senha precisa de no minimo 6 caracteres'
          this.snackbar.view = true
          setTimeout(() => {
            this.resetValidations()
            this.snackbar.text = ''
            this.snackbar.view = false
          }, 4000)
        }
      }

      if (this.errors === 0) {
        this.cadastro_usuario_post()
      }
    },
    resetValidations() {
      this.errors = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card {
  background-color: $color_mikado_yellow;
  border: 2px solid $color_oxford_blue;
  padding: 24px;
  max-width: 500px;

  &__title {
    display: block;
    h2 {
      text-align: center;
    }
  }

  &__text {
    a {
      color: $color_prussian_blue;

      &:hover {
        color: $color_oxford_blue;
        text-decoration: underline;
      }
    }
  }

  .v-btn {
    background-color: $color_oxford_blue;
    border: none;
    color: $color_mikado_yellow;
    width: 100%;
  }
}
</style>
