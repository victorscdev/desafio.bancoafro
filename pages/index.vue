<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="6" v-bind="attrs" v-on="on"
              >Adicionar tarefa</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card class="modal">
              <v-toolbar color="primary" dark>Nova Tarefa!</v-toolbar>
              <v-card-text>
                <v-text-field
                  label="Titutlo da terefa"
                  v-model="name"
                ></v-text-field>
                <v-textarea
                  label="Descrição da tarefa"
                  v-model="description"
                  rows="3"
                ></v-textarea>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text class="btn-salvar" @click="validar_task"
                  >Salvar</v-btn
                >
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <v-col cols="12" style="overflow: hidden">
        <Board />
      </v-col>
    </v-row>
    <SnackBar :text="snackbar.text" :handleclick="snackbar.view" />
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import db from '../plugins/firebase'
import Board from '../components/Board.vue'
import SnackBar from '../components/SnackBar.vue'

export default {
  name: 'IndexPage',
  components: {
    Board,
    SnackBar,
  },
  data: () => ({
    name: '',
    description: '',
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    errors: 0,
    snackbar: {
      text: '',
      view: false,
    },
  }),
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return false
      } else {
        this.$router.replace('/signin')
      }
    })
  },
  methods: {
    validar_task() {
      if (!this.name) {
        this.errors = this.errors + 1
        this.snackbar.text = 'Titulo da tarefa não pode estar vazia!'
        this.snackbar.view = true
        setTimeout(() => {
          this.resetar_validacoes()
          this.snackbar.text = ''
          this.snackbar.view = false
        }, 4000)
      }

      if (this.errors === 0) {
        this.criar_task_post()
      }
    },
    criar_task_post() {
      db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('tasks')
        .doc()
        .set({
          createdAt: new Date().toLocaleDateString('pt-br'),
          updatedAt: new Date().toLocaleDateString('pt-br'),
          lane: 'backlog',
          name: this.name,
          description: this.description,
        })

      this.dialog = false
      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    },
    resetar_validacoes() {
      this.errors = 0
    },
  },
}
</script>

<style lang="scss">
.v-btn {
  background-color: $color_rich_black_FOGRA_29 !important;
  color: $color_mikado_yellow !important;
}
</style>
