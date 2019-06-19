import React from 'react'
import {StyleSheet, View, TextInput, FlatList, Text, Button} from 'react-native'
import FilmItem from '../Components/FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'




class Search extends React.Component{

	constructor(props){
		super(props)
		this.searchedText= ""
		this.state = {films: []}
	}

	_loadFilms(){
		if (this.searchedText.length>0){
			getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({films: data.results}));
		}
		
	}

	_searchTextInputChanged(text){
		this.searchedText = text
	}


	render(){
		return (
			<View style={styles.main_container}>
        		<TextInput 
        			style={styles.textinput} 
        			placeholder='Titre du film'
        			onChangeText={(text) => this._searchTextInputChanged(text)}
        		/>

            	<Button style={styles.button} title='Rechercher' color="#841584" onPress={() => this._loadFilms()}/>

	            <FlatList
					data={this.state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <FilmItem film={item}/>}
				/>
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

  	button:{
  		height:10,
  		margin:5,
  		padding:5,
  		flex:1, 
  	}
});


export default Search