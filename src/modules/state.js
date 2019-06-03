import Vue from 'vue'
import _ from 'lodash'
import Utils from './utils'
import Blockchain from './blockchain'

let State = {
  // Fields
  contacts: {},
  debts: {},
  syncStatus: 'Synced',

  // Methods
  async loadStateFromBlockchain() {
    console.log('Loading state from blockchain')
    const contacts = await Blockchain.getContacts()
    const debts = await Blockchain.getDebts()
    if (contacts) {
      Vue.set(this, 'contacts', contacts)
    }
    if (debts) {
      Vue.set(this, 'debts', debts)
    }
  },

  async updateStateToBlockchain({
    updateContacts=false,
    updateDebts=false
  }) {
    console.log(
      `Updating blockchain state with contacts: ${updateContacts}, with debts: ${updateDebts}`)
    try {
      if (updateContacts) {
        this.syncStatus = 'Syncing contacts'
        this.updatingStateInBlockchain = true;
        await Blockchain.saveContacts(this.contacts)
      }
      if (updateDebts) {
        this.syncStatus = 'Syncing debts'
        this.updatingStateInBlockchain = true;
        await Blockchain.saveDebts(this.debts)
      }
      this.syncStatus = 'Synced'
    } catch (e) {
      console.error(e)
      this.syncStatus = 'Syncing failed'
    }
  },

  upsertContact(contact) {
    let res = this.defaultUpsert(contact, 'contacts', 'Contact')
    this.updateStateToBlockchain({ updateContacts: true })
    return res
  },

  removeContact(contact) {
    this.defaultRemove(contact, 'contacts', 'Contact')
    this.updateStateToBlockchain({ updateContacts: true })
  },

  upsertDebt(debt) {
    debt.amount = Number(debt.amount)
    let res = this.defaultUpsert(debt, 'debts', 'Debt')
    this.updateStateToBlockchain({ updateDebts: true })
    return res
  },

  removeDebt(debt) {
    this.defaultRemove(debt, 'debts', 'Debt')
    this.updateStateToBlockchain({ updateDebts: true })
  },

  defaultUpsert(el, collectionName, entityName) {
    console.log(`Updating ${entityName}`)
    console.log(el)
    if (!el.id) {
      el.id = Utils.generateId()
    }
    const newEl = _.clone(el)
    Vue.set(this[collectionName], el.id, newEl)
    return newEl
  },

  defaultRemove(el, collectionName, entityName) {
    if (!el.id) {
      throw new Error(`${entityName} without id can not be removed`)
    }
    console.log(`Removing ${entityName}`)
    console.log(el)
    let newElems = _.clone(this[collectionName])
    delete newElems[el.id]
    Vue.set(this, collectionName, newElems)
  }
}

export default State