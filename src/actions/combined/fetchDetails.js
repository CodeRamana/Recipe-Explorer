import api from '../../instances/instance'
const fetchDetails = async () => {
    try {
        const categories = await api.get('/list.php?c=list');
        const ingredients = await api.get('/list.php?i=list');
        const area = await api.get('/list.php?a=list');
        return { category:{title:"Category",options:[...categories.data.meals].map((obj)=>obj.strCategory)}, Ingredients:{title:"ingredients",options: [...ingredients.data.meals].map((obj)=>obj.strIngredient)}, Area:{title:"area",options: [...area.data.meals].map((obj)=>obj.strArea)} }
    }
    catch (err) {
        console.log(err?.message || err?.response?.message);
    }

}

export default fetchDetails