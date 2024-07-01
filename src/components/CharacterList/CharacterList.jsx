
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CharacterList.module.css';

const CharacterList = ({ publicKey, hash }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [letter, setLetter] = useState('A');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        let allCharacters = [];
        let offset = 0;
        let total = 0;

        do {
          const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}&nameStartsWith=${letter}&offset=${offset}&limit=100`
          );

          const { results, total: totalResults } = response.data.data;
          allCharacters = [...allCharacters, ...results];
          total = totalResults;
          offset += 100;
        } while (offset < total);

        setCharacters(allCharacters);
      } catch (error) {
        setError('Failed to fetch characters.');
        console.error('Error fetching characters:', error);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [publicKey, hash, letter]);

  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.characterList}>
      <div className={styles.alphabetPagination}>
        {alphabets.map((char) => (
          <button
            key={char}
            onClick={() => setLetter(char)}
            className={letter === char ? styles.activeLetter : ''}
          >
            {char}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.characterGrid}>
          {characters.map((character) => (
            <Link key={character.id} to={`/character/${character.id}`} className={styles.character}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <h3>{character.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
