import React, { useEffect, useState } from 'react';
import HairstyleCard from '../components/HairstyleCard';
import { getPublicHairstyle } from '../api/mergedData';

export default function ShowAllHairstlyes() {
  const [hairstyles, setHairstyles] = useState();

  const getAllTheHairstyles = () => {
    getPublicHairstyle().then(setHairstyles);
  };

  useEffect(() => {
    getAllTheHairstyles();
  }, []);

  return (
    <>
      <div className="hairstyle-page">
        {hairstyles?.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>You Have No Hairstyles</h1> : hairstyles?.map((hairstyle) => (
          <HairstyleCard key={hairstyle.firebaseKey} hairstyleObj={hairstyle} onUpdate={getAllTheHairstyles} />
        ))}
      </div>
    </>
  );
}
