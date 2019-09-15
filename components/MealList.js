import React from 'react';
import {View,FlatList, StyleSheet} from 'react-native';
import MealItem from './MealItem';
import {useSelector} from 'react-redux';
const MealList = props =>{
    const favorites = useSelector(state=>state.meals.favoritesMeals);
    const renderItemList = (itemData) => {
      const isFav = favorites.some(meal=>meal.id===itemData.item.id);
      return  <MealItem title={itemData.item.title}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            image={itemData.item.imageUrl}
            onSelectMeal={() => props.navigation.navigate({
                routeName: 'MealDetail', params: {
                   mealId : itemData.item.id,
                   mealTitle:itemData.item.title,
                   isFav:isFav
                }
            })}
        />
        }

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={renderItemList}
                style={{ width: '90%' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MealList;