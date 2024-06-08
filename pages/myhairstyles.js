/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getHairstylesByUid } from '../api/HairstyleData';
import HairstyleCard from '../components/HairstyleCard';
import { useAuth } from '../utils/context/authContext';
import SearchBar from '../components/SearchBar';

export default function ShowAllHairstlyes() {
  const [hairstyles, setHairstyles] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useAuth();

  const getAllTheHairstyles = async () => {
    const fetchedHairstyles = await getHairstylesByUid(user.uid);
    setHairstyles(fetchedHairstyles);
    setSearchResults(fetchedHairstyles);
  };

  const searchItems = (query) => {
    if (!query) {
      getAllTheHairstyles();
    } else {
      const filtered = hairstyles.filter((hairstyle) => hairstyle.name.toLowerCase().includes(query));
      setSearchResults(filtered);
    }
  };

  useEffect(() => {
    getAllTheHairstyles();
  }, []);

  return (
    <>
      <SearchBar onSearch={searchItems} />
      <div className="hairstyle-page">
        {searchResults?.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>You Have No Hairstyles</h1> : searchResults?.map((hairstyleObject) => (
          <HairstyleCard key={hairstyleObject.firebaseKey} hairstyleObj={hairstyleObject} onUpdate={getAllTheHairstyles} />
        ))}
      </div>
    </>
  );
}
