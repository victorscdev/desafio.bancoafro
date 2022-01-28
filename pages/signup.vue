<template>
  <div>
    <v-card elevation="2" shaped>
      <v-card-title>
        <h2>Cadatro</h2>
      </v-card-title>
      <v-text-field v-model="email" label="Email" type="email"></v-text-field>
      <v-text-field
        v-model="password"
        label="Senha"
        type="password"
      ></v-text-field>
      <v-btn elevation="2" @click="cadastro_usuario_post">Cadastrar</v-btn>
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
    cadastro_usuario_post() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
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
