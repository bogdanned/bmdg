import * as request from "superagent"
import * as cookie from 'react-cookie'
import { autorun, observable } from 'mobx'


class CapsulesStore{
    @observable capsules = ["none"]
    @observable capsulesfilter = []
}


const capsulesStore = window.store = new CapsulesStore


export default capsulesStore


autorun(() => {
  console.log(capsulesStore.capsules[0])
})
