import dispatcher from '../dispatcher'


export function createCapsule(text){
  console.log(text)
  dispatcher.dispatch({
    type: "CREATE_CAPSULE",
    text,
  })
}


export function deleteCapsule(id){
  dispatcher.dispatch({
    type: "DELETE_CAPSULE",
    id,
  })
}

export function reloadCapsules(){
  dispatcher.dispatch({
    type: "DELETE_CAPSULE",
    id,
  })
}
