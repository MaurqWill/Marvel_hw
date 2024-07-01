import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CharacterDetails.module.css';

const CharacterDetails = ({ publicKey, hash }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();
  const URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(URL);
        console.log('API Response:', response.data); 
        setCharacter(response.data.data.results[0]); 
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacter();
  }, [URL]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className={styles.characterDetails}>
      <h2>{character.name}</h2>
      <p>{character.description || 'No description available.'}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.map(comic => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back to Character List</button>
    </div>
  );
};

export default CharacterDetails;
