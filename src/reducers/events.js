export const eventReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_EVENT' :
      return action.events
    default: 
      return state
  }
}