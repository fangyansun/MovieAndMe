const initialState = { favoritesFilm:[]}

function toggleFavorite(state = initialState, action){
	let nextState
	switch(action.type){
		case 'TOGGLE_FAVORITE':
			const favoritesFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
			//le film est déjà dans la liste de films favories
			if (favoritesFilmIndex !== -1){
				nextState = {
					...state,
					favoritesFilm: state.favoritesFilm.filter((item,index) => index!==favoritesFilmIndex)
				}
			}
			//le film n'est pas encore dans la liste de films favories
			else{
				nextState = {
					...state,
					favoritesFilm: [...state.favoritesFilm, action.value]
				}

			}
				
			return nextState || state
		default:
			return state
	}
}

export default toggleFavorite