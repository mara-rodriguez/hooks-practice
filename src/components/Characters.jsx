import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react';

const initialState = {
  favorites: []
}

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
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  useEffect(()=> {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, []);
 /*pram2, var q va a estar escuchando, si no esta escuchando nada, arreglo vacio*/
 const handleClick = favorite => {
   dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
 }

 const handleSearch = (/*event*/) => {
  //setSearch(event.target.value) /* obtendremos value desde el input */
  setSearch(searchInput.current.value); //current retorna el value actual
 }

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

      <div className="search">
        <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
      </div>

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