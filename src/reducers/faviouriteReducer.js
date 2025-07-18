    const faviouriteReducer = (state,action) => {
        switch(action.type){
            case "ADD":{
                   return {
                        ...state,
                        totalfaviouriteRecipes:state['totalfaviouriteRecipes'] + 1,
                        faviouriteRecipes:[...state['faviouriteRecipes'],action.payload]
                    };
            }
            default:
                return state;  
        }
    }

    export default faviouriteReducer;