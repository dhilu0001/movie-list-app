import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchForm(props) {
  const { error, searchQuery, setSearchQuery } = props
  console.log({error, searchQuery, setSearchQuery})
  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
    <input
    type='text'
    className='form-input'
    onChange={(e)=> setSearchQuery(e.target.value)}
    placeholder='Search Movies'
    value={searchQuery}
    />
    <FontAwesomeIcon icon={faSearch} className='search-icon' />
    </form>
  )
}
