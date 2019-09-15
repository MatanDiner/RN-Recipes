import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavoriteScreen = props => {
    const favMeals = useSelector(state => state.meals.favoritesMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.notFound}>
                <DefaultText>No favorites meals found,start adding some!</DefaultText>
            </View>
        )
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}


FavoriteScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Favorites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FavoriteScreen;