<template>
  <div>
    <h2 class="centered">Debts {{ contact ? " - " + contact : ""}}</h2>

    <div class="cards mdl-grid">
      <Card
        id="total"
        :value="totalBalance"
        label="Total balance"
        color="#1A8FE2"
        icon="money"
        suffix="$"/>

      <Card
        id="youowe"
        :value="youOwe"
        label="You owe"
        icon="money_off"
        color="#1A8FE2"
        suffix="$"/>

      <Card
        id="youareowed"
        :value="youAreOwed"
        label="You are owed"
        icon="attach_money"
        color="#1A8FE2"
        suffix="$"/>

      <Card
        id="debtslength"
        :value="debtsLength"
        label="Number of debts"
        icon="list"
        color="#1A8FE2"
        suffix="pos"/>

      <Card
        id="debtslength"
        :value="debtsLength"
        label="Number of debts"
        icon="list"
        color="#1A8FE2"
        suffix="pos"/>

    </div>

    <EditableListTemplate
      v-bind:elements="elements"
      v-bind:dataModel="dataModel"
      v-bind:addable="true"
      v-bind:editable="true"
      v-bind:removable="true"
      v-bind:upsert="state.upsertDebt.bind(state)"
      v-bind:remove="state.removeDebt.bind(state)"
    />

  </div>
</template>

<script>
import EditableListTemplate from '../EditableListTemplate'
import Card from '../Card'
import State from '../../modules/state'
import Utils from '../../modules/utils'

export default {
  name: 'Debts',

  data() {
    return {
      state: State,
    }
  },

  computed: {
    contact() {
      return this.$route.params.contact
    },
    elements() {
      let debts = Utils.dictToListWithIds(this.state.debts)
      console.log(this.$route)
      if (this.$route.params.contact) {
        // Filtering debts (only for some user)
        const contactObj = Utils.dictToListWithIds(this.state.contacts)
          .find(
            (contact) => contact.name ==  this.$route.params.contact
          )
        if (contactObj) {
          debts = debts.filter(debt => debt.contact == contactObj.id)
        }
      }
      return debts
    },
    dataModel() {
      return {
        contact: {
          kind: 'Reference',
          refCollection: Utils.dictToListWithIds(this.state.contacts)
        },
        amount: 'Money',
        // currency: 'Currency',
        title: 'String',
        description: 'String',
        reminder: 'Date'
      }
    },
    totalBalance() {
      return -this.elements.reduce((acc, cur) => cur.amount ? acc + cur.amount : acc, 0)
    },
    debtsLength() {
      return this.elements.length
    },
    youOwe() {
      return this.elements.reduce((acc, cur) => {
        if (cur.amount > 0) {
          return acc + cur.amount
        } else {
          return acc
        }
      }, 0)
    },
    youAreOwed() {
      return (-1) * this.elements.reduce((acc, cur) => {
        if (cur.amount && cur.amount < 0) {
          return acc + cur.amount
        } else {
          return acc
        }
      }, 0)
    }
  },

  components: {
    EditableListTemplate,
    Card
  }
}
</script>

<style scoped>
  .cards {
    margin: auto;
  }

  h2 {
    margin: 20px;
  }
</style>
