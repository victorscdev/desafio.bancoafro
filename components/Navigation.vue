<template>
  <div>
    <!-- TOP BAR -->
    <v-app-bar
      id="topBar"
      elevation="8"
      height="80"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-spacer></v-spacer>
      <div class="card-avatar">
        <div class="menu-user">
          <h2>
            <span>Olá,</span>
            {{ user.userName }}
          </h2>
          <a class="btn-sair" @click.prevent="sair">Sair</a>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../plugins/firebase'

export default {
  name: 'NavigationComponent',
  data: () => ({
    user: {
      userName: '',
    },
    clipped: true,
    fixed: false,
    miniVariant: false,
    right: null,
  }),
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((response) => {
            let userName = response.data().nome
            userName = userName.split(' ')

            this.user.userName = userName[0]
          })
      }
    })
  },
  methods: {
    sair() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setTimeout(() => {
            this.$router.push('/signin')
          }, 500)
        })
    },
  },
}
</script>

<style lang="scss">
#topBar {
  &.v-app-bar {
    background: $color_oxford_blue;
    padding: 0 24px 0;
    width: 100%;
    .v-toolbar {
      &__content {
        display: flex;
        align-items: center;
        padding: 4px 0;

        .card-avatar {
          display: flex;
          align-items: center;
          .menu-user {
            margin-left: 8px;
            h2 {
              color: #f4f4f4;
              span {
                font-weight: 100;
              }
            }
            .btn-sair {
              color: $color_gold_web_golden;
              transition: 0.2s ease;
              &:hover {
                color: $color_mikado_yellow;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
