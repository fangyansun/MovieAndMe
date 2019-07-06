import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'


const SearchStackNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions:{
			title: "Rechercher"
		}
	},

	FilmDetail:{
		screen:FilmDetail
	}
})

const MoviesTabNavigator = createBottomTabNavigator(
	{
		Search: {
			screen: SearchStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return <Image
					source = {require('../Images/search.png')}
					style = {styles.icon} />
				}
			}
		},
		Favorites:{
			screen: Favorites,
			navigationOptions: {
	        tabBarIcon: () => {
	          return <Image
	            source={require('../Images/favorite.png')}
	            style={styles.icon}/>
	        }
	      }
		}
	},
	{
		tabBarOptions: {
		  activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
		  inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
		  showLabel: false, // On masque les titres
		  showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
		}
	}
)

const styles = StyleSheet.create({
	icon: {
		width:30,
		height:30
	}
})

export default createAppContainer(MoviesTabNavigator)