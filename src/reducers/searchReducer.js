const searchReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TERM": {
            return { ...state, searchTerm: action.payload }
        }
        case "ADD_CATEGORY": {
            return { ...state, category: action.payload }
        }
        case "ADD_INGREDIENT": {
            return { ...state, ingredients: action.payload }
        }
        case "ADD_AREA": {
            return { ...state, area: action.payload }
        }
        default:
            return state
    }
}

export default searchReducer