import blockstack from 'blockstack'

const FILENAMES = {
  contacts: 'dfmapp_contacts.json',
  debts: 'dfmapp_debts.json'
}

const appConfig = new blockstack.AppConfig(['store_write', 'publish_data'])
const userSession = new blockstack.UserSession({appConfig})

async function saveObjectToFile(obj, filename, opts={ encrypt: true }) {
  await userSession.putFile(filename, JSON.stringify(obj), opts)
}

async function readObjFromFile(filename, opts={ decrypt: true }) {
  console.log('Reading the file: ' + filename)
  const content = await userSession.getFile(filename, opts)
  try {
    console.log('Got content: ' + content)
    return JSON.parse(content)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default {
  pendingAuth: false,

  getUserSession() {
    return userSession
  },

  getUserName() {
    return userSession.loadUserData().username
  },

  isUserSignedIn() {
    return userSession.isUserSignedIn()
  },

  async checkAuth() {
    if (userSession.isSignInPending()) {
      try {
        this.pendingAuth = true
        await userSession.handlePendingSignIn()
      } catch (e) {
        console.error(e)
      } finally {
        this.pendingAuth = false
      }
    }
  },

  signIn() {
    userSession.redirectToSignIn()
  },

  signOut() {
    userSession.signUserOut()
    location.reload()
  },

  async getContacts() {
    return await readObjFromFile(FILENAMES.contacts)
  },

  async getDebts() {
    return await readObjFromFile(FILENAMES.debts)
  },

  async saveContacts(contacts) {
    await saveObjectToFile(contacts, FILENAMES.contacts)
  },

  async saveDebts(debts) {
    await saveObjectToFile(debts, FILENAMES.debts)
  },
}