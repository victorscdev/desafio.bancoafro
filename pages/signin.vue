<template>
  <div>
    <v-card elevation="2" shaped>
      <v-card-title>
        <h2>Entrar</h2>
      </v-card-title>
      <v-text-field v-model="email" label="Email" type="email"></v-text-field>
      <v-text-field
        v-model="password"
        label="Senha"
        type="password"
      ></v-text-field>
      <v-btn elevation="2" @click="logar">Entrar</v-btn>
      <v-card-text>
        <span
          >Não tem conta ? <NuxtLink to="/signup">Click aqui!</NuxtLink></span
        >
      </v-card-text>
    </v-card>
    <SnackBar :text="snackbar.text" :handleclick="snackbar.view" />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import SnackBar from '../components/SnackBar.vue'

export default {
  name: 'SignUp',
  components: {
    SnackBar,
  },
  layout: 'noLogger',

  data: () => ({
    email: '',
    password: '',
    snackbar: {
      text: '',
      view: false,
    },
  }),
  mounted() {},
  methods: {
    logar() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            this.snackbar.text =
              'Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.'
            this.snackbar.view = true
            setTimeout(() => {
              this.snackbar.text = ''
              this.snackbar.view = false
            }, 4000)
          }

          if (error.code === 'auth/wrong-password') {
            this.snackbar.text =
              'A senha é inválida ou o usuário não tem uma senha.'
            this.snackbar.view = true
            setTimeout(() => {
              this.snackbar.text = ''
              this.snackbar.view = false
            }, 4000)
          }
        })
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
