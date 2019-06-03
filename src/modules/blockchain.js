import State from './state'
import blockstack from 'blockstack'

// This module allows to read and write data to blockstack blockchain

const appConfig = new blockstack.AppConfig(['store_write', 'publish_data'])
const userSession = new blockstack.UserSession({appConfig})

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

  async addDebt() {
    State.addDebt()
  }
}