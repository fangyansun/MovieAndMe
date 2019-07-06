import React from 'react'
import {StyleSheet, View, TextInput, FlatList, Text, Button, ActivityIndicator} from 'react-native'
import FilmItem from '../Components/FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import {connect} from 'react-redux'


const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

class Search extends React.Component{

	constructor(props){
		super(props)
		this.searchedText= ""
		this.page = 0
		this.totalPages=0
		this.state = {
			films: [],
			isLoading: false
		}
	}

	_loadFilms() {
	    if (this.searchedText.length > 0) {
	      this.setState({ isLoading: true }) // Lancement du chargement
	      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
	      	  this.page = data.page
	      	  this.totalPages = data.total_pages
	          this.setState({ 
	            films: this.state.films.concat(data.results),
	            isLoading: false
	          })
	      })
	    }
	}

	_searchFilms(){
		//mettre à zero la liste du film, et les compteurs du page
		this.page = 0
	    this.totalPages = 0
		this.setState({
			films:[]
		})

		console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

		//telecharge les films
		this._loadFilms()
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

    _displayDetailForFilm = (idFilm) => {
    	console.log("Display film with id" + idFilm)
    	this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }


	_searchTextInputChanged(text){
		this.searchedText = text
	}


	render(){
		//console.log(this.state.isLoading)
		//console.log(this.page, this.totalPages)
		console.log(this.props)
		return (
			<View style={styles.main_container}>
        		<TextInput 
        			style={styles.textinput} 
        			onSubmitEditing={()=> this._searchFilms()}
        			placeholder='Titre du film'
        			onChangeText={(text) => this._searchTextInputChanged(text)}
        		/>

            	<Button title='Rechercher' color="#841584" onPress={() => this._loadFilms()}/>

	            <FlatList
					data={this.state.films}
					extraData={this.props.favoritesFilm}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => 
						<FilmItem 
							film={item} 
							isFilmFavorite={(this.props.favoritesFilm.findIndex(film=> film.id ===item.id) !== -1)?true: false}
							displayDetailForFilm = {this._displayDetailForFilm}
						/>
					}
					onEndReachedThreashold={0.5}
					onEndReached={()=>{
						if(this.page < this.totalPages){
							this._loadFilms()
						}
					}}
				/>
				{this._displayLoading()}
      		</View>
		)
	}
}


const styles = StyleSheet.create({
	main_container:{
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


export default connect(mapStateToProps)(Search)
