import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
import useCharacters from './hooks/useCharacters';

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

function Characters() {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);

 const handleClick = favorite => {
   dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
 }

//  const handleSearch = (/*event*/) => {
//   //setSearch(event.target.value) /* obtendremos value desde el input */
//   setSearch(searchInput.current.value); //current retorna el value actual
//  }

 const handleSearch = useCallback(() => {
  setSearch(searchInput.current.value);
 }, [])

 /*const filteredUsers = characters.filter((user) => {
  return user.name.toLowerCase().includes(search.toLowerCase());
 })*/

 const filteredUsers = useMemo(() => 
   characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }),
  [characters, search]) /*cuando cambien los pers o cunado cambie search va a recordar el valor. */
 

  return (
    <div className='Characters'>
      {favorites.favorites.map( favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

    <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>

      {filteredUsers.map(character =>(
        <div className='item' key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name}/>
          <button type='button' onClick={()=> handleClick(character)}>Add Fav</button>
        </div>
      ))}
    </div>
  )
}

export default Characters;