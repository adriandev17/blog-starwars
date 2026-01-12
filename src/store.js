export const initialStore=()=>{ 
  return{ 
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action ={}) {
  switch(action.type){
    case 'load_people': 

      return {
        ...store,
        people: action.payload
      }

      case 'load_planets':

      return {
        ...store,
        planets: action.payload
      }

      case 'load_vehicles': 

      return {
        ...store,
        vehicles: action.payload
      }

      case 'add_favorites':

      return {
       ...store,
       favorites: [ ...store.favorites, action.payload ]
      }

      case 'remove_favorites':

      return {
        ...store,
       favorites: store.favorites.filter((item) => item.name !== action.payload)
      }

     default:
      throw Error('Unknown action.');
  } 
}


  
