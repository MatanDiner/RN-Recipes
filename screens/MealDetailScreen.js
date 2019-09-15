import React, { useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
const ListItem = props => (
    <View style={styles.listItem}><DefaultText>{props.children}</DefaultText></View>
)

const MealDetailScreen = props => {
    const meals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoritesMeals.some(meal => meal.id === mealId)
    )

    const selectedmeal = meals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toogleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toogleFavoriteHandler })
    }, [toogleFavoriteHandler])

    
    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite })
    }, [currentMealIsFavorite])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Image source={{ uri: selectedmeal.imageUrl }} style={styles.image} />
                <View style={styles.details}>
                    <DefaultText>{selectedmeal.duration}</DefaultText>
                    <DefaultText>{selectedmeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedmeal.affordability.toUpperCase()}</DefaultText>
                </View>
                <Text style={styles.title}>Ingredients:</Text>
                {selectedmeal.ingredients.map(ing => <ListItem key={ing}>{ing}</ListItem>)}
                <Text style={styles.title}>steps:</Text>
                {selectedmeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
            </View>
        </ScrollView>

    )
}

MealDetailScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite"
                iconName= {isFavorite?'ios-star' : 'ios-star-outline'}
                onPress={toggleFavorite}
            />
        </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    title: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }

})


export default MealDetailScreen;