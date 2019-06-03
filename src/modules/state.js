import Vue from 'vue'
import _ from 'lodash'
import Utils from './utils'

let State = {
  // Fields
  contacts: {},
  debts: {},
  session: null,


  // Methods
  upsertContact(contact) {
    return this.defaultUpsert(contact, 'contacts', 'Contact')
  },

  removeContact(contact) {
    this.defaultRemove(contact, 'contacts', 'Contact')
  },

  upsertDebt(debt) {
    debt.amount = Number(debt.amount)
    return this.defaultUpsert(debt, 'debts', 'Debt')
  },

  removeDebt(debt) {
    this.defaultRemove(debt, 'debts', 'Debt')
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