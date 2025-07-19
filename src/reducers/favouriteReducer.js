    const favouriteReducer = (state,action) => {
        switch(action.type){
            case "ADD":{
                   return {
                        ...state,
                        totalfavouriteRecipes:state['totalfavouriteRecipes'] + 1,
                        favouriteRecipes:[...state['favouriteRecipes'],action.payload]
                    };
            }
            default:
                return state;  
        }
    }

    export default favouriteReducer;