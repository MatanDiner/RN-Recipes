import {MEALS} from '../../data/dummy-data';
import * as actionsType from '../actions/actionsType';

const initialState = {
    meals:MEALS,
    filteredMeals:MEALS,
    favoritesMeals:[]
}

const mealsReducer = (state = initialState,action) => {
switch(action.type){
    case actionsType.TOGGLE_FAVORITE : return updateFavorites(state,action);break;
    case actionsType.SET_FILTERS : return updateFilteredMealsFilters(state,action);break;
    default: return state;
}
} 

const updateFilteredMealsFilters = (state,action) =>{
const filters = action.filters;
const filteredMeals = state.meals.filter(meal=>{
    if(filters.glutenFree && !meal.isGlutenFree){
        return false;
    }
    if(filters.lactoseFree && !meal.isLactoseFree){
        return false;
    }
    if(filters.vegetarian && !meal.isVegetarian){
        return false;
    }
    if(filters.vegan && !meal.isVegan){
        return false;
    }
    return true;
})
return{
    ...state,
    filteredMeals:filteredMeals
}
}

const updateFavorites = (state,action) =>{
    const favMealIndex = state.favoritesMeals.findIndex(meal=>meal.id === action.mealId);
    const favoritesMeals = [...state.favoritesMeals];
    if(favMealIndex >= 0){
        favoritesMeals.splice(favMealIndex,1);
    }
    else{
        const meal = state.meals.find(meal=>meal.id===action.mealId);
        favoritesMeals.push(meal);
    }
    return{
        ...state,
        favoritesMeals:favoritesMeals
    }
}

export default mealsReducer;