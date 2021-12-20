import React, {useEffect} from 'react'

export default function Movies(props) {
  const {movies, isLoading} = props
  
  function imageLoaded (){
    console.log('Image loaded')
  }

  useEffect(() => {
    const loadEvent = window.addEventListener('load', imageLoaded)
    return () => {
      window.removeEventListener('load', loadEvent)
    }
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    <div className='movie-container'>
      {movies.map((movie, index) => {
        const {name} = movie
        const posterImage = movie['poster-image']
        return (
          <article className='movie' key={index}>
            <img className='image-container' src={`${process.env.PUBLIC_URL}/${posterImage}`} alt={name} />
            <div>
              {name}
            </div>
          </article>
        )
      })}
    </div>
  )
}
