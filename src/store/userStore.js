import {makeAutoObservable} from "mobx";

class UserStore {
    token = ''
    currentUser = {}
    worldRaiting = []
    constructor() {
        makeAutoObservable(this)
    }
    setToken(token){
        this.token  = token
    }
    setCurrentUser(user){
        this.currentUser = user
    }
    setWorldRaiting(r){
        this.worldRaiting = r
    }
}

export default new UserStore();