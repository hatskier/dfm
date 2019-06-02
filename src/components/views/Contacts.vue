<template>
  <div>
    <h2 class="centered">Contacts</h2>
    <EditableListTemplate
      v-bind:elements="elements"
      v-bind:dataModel="dataModel"
      v-bind:addable="true"
      v-bind:editable="true"
      v-bind:upsert="state.upsertContact.bind(state)"
      v-bind:remove="state.removeContact.bind(state)"
    />

  </div>
</template>

<script>
import EditableListTemplate from '../EditableListTemplate'
import State from '../../modules/state'
import Utils from '../../modules/utils'

// TODO remove it
State.upsertContact({
        name: 'Random' + Math.round(Math.random() * 100000),
        email: 'email@gmail.com',
        phone: Math.round(Math.random() * 1000000000).toString()
      })

export default {
  name: 'Contacts',

  data() {
    return {
      dataModel: {
        name: 'String',
        email: 'String',
        phone: 'String',
        debts: 'Link'
      },
      state: State,
    }
  },

  computed: {
    elements() {
      let list = Utils.dictToListWithIds(this.state.contacts)
      return list.map(el => {
        el.debts = `/#/debts/${el.name}`
        return el
      })
    }
  },

  methods: {
    // TODO remove
    // addNewRandomContact() {
    //   State.addContact({
    //     name: 'Random' + Math.round(Math.random() * 100000),
    //     email: 'email@gmail.com',
    //     phone: Math.round(Math.random() * 1000000000).toString()
    //   })
    // }
  },

  components: {
    EditableListTemplate
  }
}
</script>

<style scoped>
  h2 {
    margin: 20px;
  }
</style>
