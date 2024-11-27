const initial_state = {
 
    StoreDeatil: [],
   
  };

  
const reducer = (state = initial_state, action) => {
    switch (action.type) {
      case "STORE_INFO":
        return {
          ...state,
          StoreDeatil: action.payload,
        };
      default: {
        return state;
      }
    }
  };

  export default reducer;