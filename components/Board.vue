<template>
  <div class="board">
    <div class="board__line">
      <h2>Backlog</h2>
      <Container
        group-name="tasks"
        :get-child-payload="getChildPayload"
        @drag-start="handleDraggStart('backlog', $event)"
        @drop="handleDrop('backlog', $event)"
      >
        <Draggable v-for="(task, index) in tasks.backlog" :key="index">
          <span @click="abrir_modal_edit(task)">
            <Card :title="task.name" />
          </span>
        </Draggable>
      </Container>
    </div>
    <div class="board__line">
      <h2>Desenvolvimento</h2>
      <Container
        group-name="tasks"
        :get-child-payload="getChildPayload"
        @drag-start="handleDraggStart('desenvolvimento', $event)"
        @drop="handleDrop('desenvolvimento', $event)"
      >
        <Draggable v-for="(task, index) in tasks.desenvolvimento" :key="index">
          <span @click="abrir_modal_edit(task)">
            <Card :title="task.name" />
          </span>
        </Draggable>
      </Container>
    </div>
    <div class="board__line">
      <h2>Testes</h2>
      <Container
        group-name="tasks"
        :get-child-payload="getChildPayload"
        @drag-start="handleDraggStart('testes', $event)"
        @drop="handleDrop('testes', $event)"
      >
        <Draggable v-for="(task, index) in tasks.testes" :key="index">
          <span @click="abrir_modal_edit(task)">
            <Card :title="task.name" />
          </span>
        </Draggable>
      </Container>
    </div>
    <div class="board__line">
      <h2>Fechado</h2>
      <Container
        group-name="tasks"
        :get-child-payload="getChildPayload"
        @drag-start="handleDraggStart('fechado', $event)"
        @drop="handleDrop('fechado', $event)"
      >
        <Draggable v-for="(task, index) in tasks.fechado" :key="index">
          <span @click="abrir_modal_edit(task)">
            <Card :title="task.name" />
          </span>
        </Draggable>
      </Container>
    </div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:default="dialog">
        <v-card class="modal">
          <v-toolbar color="primary" dark>Editar Tarefa</v-toolbar>
          <v-card-text>
            <span class="data-desc">
              <strong>Ultima alteração: </strong>
              {{ modalEdit.updatedAt }}
            </span>
            <v-select
              :items="itemsSelect"
              label="Coluna de tarefas"
              v-model="modalEdit.lane"
            ></v-select>
            <v-text-field
              label="Titutlo da terefa"
              v-model="modalEdit.name"
            ></v-text-field>
            <v-textarea
              label="Descrição da tarefa"
              v-model="modalEdit.description"
              rows="3"
            ></v-textarea>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn class="btn-salvar" text @click="update_task(modalEdit.id)"
              >Salvar alterações</v-btn
            >
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { Container, Draggable } from 'vue-smooth-dnd'
import db from '../plugins/firebase'
import Card from '../components/Card.vue'

export default {
  name: 'BoardComponent',
  components: {
    Card,
    Container,
    Draggable,
  },
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    modalEdit: {},
    itemsSelect: ['backlog', 'desenvolvimento', 'testes', 'fechado'],
    name: '',
    description: '',
    errors: 0,
    snackbar: {
      text: '',
      view: false,
    },
    tasks: {
      backlog: [],
      desenvolvimento: [],
      testes: [],
      fechado: [],
    },
    draggingCard: {
      lane: '',
      index: -1,
      cardData: {},
    },
  }),
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.tasks_get(user.uid)
      }
    })
  },
  methods: {
    tasks_get(uid) {
      db.collection('users')
        .doc(uid)
        .collection('tasks')
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const task = {
              id: doc.id,
              lane: doc.data().lane,
              name: doc.data().name,
              description: doc.data().description,
              updatedAt: doc.data().updatedAt,
            }
            this.tasks[doc.data().lane].push(task)
          })
        })
    },
    handleDraggStart(lane, dragResult) {
      const { payload, isSource } = dragResult
      if (isSource) {
        this.draggingCard = {
          lane,
          index: payload.index,
          cardData: {
            ...this.tasks[lane][payload.index],
          },
        }
      }
    },
    handleDrop(lane, dropResult) {
      const { removedIndex, addedIndex } = dropResult

      if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
        return
      }
      if (removedIndex !== null) {
        this.tasks[lane].splice(removedIndex, 1)
      }
      if (addedIndex !== null) {
        this.tasks[lane].splice(addedIndex, 0, this.draggingCard.cardData)
        db.collection('users')
          .doc(firebase.auth().currentUser.uid)
          .collection('tasks')
          .doc(this.draggingCard.cardData.id)
          .update({
            lane,
            updatedAt: new Date(),
          })
      }
    },
    getChildPayload(index) {
      return { index }
    },
    abrir_modal_edit(task) {
      this.dialog = !this.dialog
      this.modalEdit = { ...task }
      console.log(this.modalEdit)
    },
    update_task(taskID) {
      db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('tasks')
        .doc(taskID)
        .update({
          lane: this.modalEdit.lane,
          name: this.modalEdit.name,
          description: this.modalEdit.description,
          updatedAt: new Date().toLocaleDateString('pt-br'),
        })

      this.dialog = !this.dialog
      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    },
    validar_task(taskID) {
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
        this.update_task(taskID)
      }
    },
    resetar_validacoes() {
      this.errors = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-bottom: 24px;
  height: calc(100vh - (80px + 24px + 24px + 24px + 24px));
  padding-bottom: 8px;
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  &::-webkit-scrollbar-thumb {
    background: $color_oxford_blue;
    border: 0px $color_rich_black_FOGRA_29;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: $color_mikado_yellow;
    border: 0px $color_gold_web_golden;
    border-radius: 4px;
  }

  @media (min-width: 1200px) {
    padding-bottom: 0;
  }

  &__line {
    box-shadow: 0 0 16px rgba(33, 33, 33, 0.1);
    border-radius: 8px;
    background-color: $color_prussian_blue;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    padding: 16px 8px;
    min-width: 50%;
    width: 25%;
    overflow: hidden;

    &:last-of-type {
      margin-right: 0;
    }

    @media (min-width: 576px) {
      min-width: 30%;
    }

    @media (min-width: 1200px) {
      min-width: unset;
    }

    h2 {
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 8px;
    }

    .smooth-dnd-container {
      overflow-y: auto;
      padding-right: 8px;

      &::-webkit-scrollbar {
        width: 9px;
        height: 9px;
      }

      &::-webkit-scrollbar-thumb {
        background: $color_mikado_yellow;
        border: 0px $color_gold_web_golden;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: $color_oxford_blue;
        border: 0px $color_rich_black_FOGRA_29;
        border-radius: 4px;
      }
    }
  }
}
</style>
