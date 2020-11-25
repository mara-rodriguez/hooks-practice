import React, { useState, useEffect } from 'react';

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(()=> {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, []);
 /*pram2, var q va a estar escuchando, si no esta escuchando nada, arreglo vacio*/
  return (
    <div>
      {characters.map(character =>(
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name}/>
        </div>
      ))}
    </div>
  )
}

export default Characters;