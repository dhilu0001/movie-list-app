const INITIAL_STATE = {
  movieList: null
}

const movieReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_MOVIE_LIST':
			return {
				...state,
				...state.movieList,
				movieList: action.payload
			}
		default:
			return state
	}
}

export default movieReducer