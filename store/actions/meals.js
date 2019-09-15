import * as actionsType from './actionsType';

export const setFilters = filters =>({
    type:actionsType.SET_FILTERS,
    filters:filters
})

export const toggleFavorite = id =>({
    type:actionsType.TOGGLE_FAVORITE,
    mealId:id
})