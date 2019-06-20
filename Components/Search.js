import React from 'react'
import {StyleSheet, View, TextInput, FlatList, Text, Button, ActivityIndicator} from 'react-native'
import FilmItem from '../Components/FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'




class Search extends React.Component{

	constructor(props){
		super(props)
		this.searchedText= ""
		this.state = {
			films: [],
			isLoading: false
		}
	}

	_loadFilms() {
	    if (this.searchedText.length > 0) {
	      this.setState({ isLoading: true }) // Lancement du chargement
	      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
	          this.setState({ 
	            films: data.results,
	            isLoading: false
	          })
	      })
	    }
	}

	_displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }


	_searchTextInputChanged(text){
		this.searchedText = text
	}


	render(){
		console.log(this.state.isLoading)
		return (
			<View style={styles.main_container}>
        		<TextInput 
        			style={styles.textinput} 
        			onSubmitEditing={()=> this._loadFilms}
        			placeholder='Titre du film'
        			onChangeText={(text) => this._searchTextInputChanged(text)}
        		/>

            	<Button title='Rechercher' color="#841584" onPress={() => this._loadFilms()}/>

	            <FlatList
					data={this.state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <FilmItem film={item}/>}
				/>
				{this._displayLoading()}
      		</View>
		)
	}
}


const styles = StyleSheet.create({
	main_container:{
		marginTop: 20, 
		flex:1
	},

  	textinput: {
    	marginLeft: 5,
    	marginRight: 5,
    	height: 50,
    	borderColor: '#000000',
    	borderWidth: 1,
    	paddingLeft: 5
  	},

  	loading_container: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 100,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center'
	}
});


export default Search