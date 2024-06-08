import React, { useEffect, useState } from 'react';
import HairstyleCard from '../components/HairstyleCard';
import { getPublicHairstyle } from '../api/mergedData';
import SearchBar from '../components/SearchBar';

export default function ShowAllHairstlyes() {
  const [hairstyles, setHairstyles] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const getAllTheHairstyles = async () => {
    const fetchedHairstyles = await getPublicHairstyle();
    setHairstyles(fetchedHairstyles);
    setSearchResults(fetchedHairstyles);
  };

  useEffect(() => {
    getAllTheHairstyles();
  }, []);

  const searchItems = (query) => {
    // If search value is empty, show all public hairstyles
    if (!query) {
      getAllTheHairstyles();
    } else {
      const filtered = hairstyles.filter((hairstyle) => hairstyle.name.toLowerCase().includes(query));
      setSearchResults(filtered);
    }
  };

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
