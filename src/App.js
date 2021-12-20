import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";

import { setMovieList } from './redux/movie/movie.action'
import Search from './SearchForm'
import Movies from './Movies'
import './App.css';

const API_ENDPOINT = './api/CONTENTLISTINGPAGE-PAGE'

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({show: false, msg: ''})
  const [searchQuery, setSearchQuery] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { movieList } = props

  if(pageNum ===3) {
    setHasMore(false)
  }

  const fetchMovies = async (pageNum) => {
    const { setMovieList } = props
    setIsLoading(true)
    try {
      const response = await import(`${API_ENDPOINT}${pageNum}.json`);
      setMovieList(response)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies(pageNum)
  }, [pageNum])

  let title
  let contentItems
  let filteredMovies
  console.log('movieList', movieList)
  if (!movieList) {
    return null
  } else {
    const page = movieList['page']
    title = page['title']
    contentItems = page['content-items']
    filteredMovies = contentItems['content'].filter(movie => {
      return movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }
  
  if (!filteredMovies.length && !(error.show)) {
    setError({show: true, msg: 'No Movies Found'})
  }

  const nextMovies = () => {
    setPageNum((oldPageNum) => {
      return oldPageNum + 1
    })
  }

  return (
    <div className="App">
      <header className="header">
        <label className='movie-title'>{title}</label>
        <Search
          searchQuery= {searchQuery}
          setSearchQuery={setSearchQuery}
          error={error}
        />
      </header>
      <section>
        <InfiniteScroll
          dataLength={filteredMovies.length}
          next={nextMovies}
          hasMore={hasMore}
          loader={<p>Load more...</p>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Movies
            movies={filteredMovies}
            isLoading={isLoading}
            error={error}
          />
      </InfiniteScroll>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  movieList: state.movie.movieList
})

const mapDispatchToProps = dispatch => ({
 setMovieList: movieList => dispatch(setMovieList(movieList))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);