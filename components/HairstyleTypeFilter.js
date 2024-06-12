/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getPublicHairstyle } from '../api/mergedData';
import { getAllHairstyleType } from '../api/HairstyleTypeData';
import { getAllHairstyleOccasion } from '../api/HairstyleOccasionData';
import { getHairstylesbyType } from '../api/HairstyleData';

export default function HairstyleTypeFilter() {
  const [hairstyles, setHairstyles] = useState();
  // const [filter, setFilter] = useState('all');
  const [hairstyleType, setHairstyleType] = useState([]);
  const [hairstyleOccasion, setHairstyleOccasion] = useState([]);
  const router = useRouter();
  console.warn(router);

  const filterHairstyleType = async () => {
    await getAllHairstyleType().then(setHairstyleType);
    // console.warn(hairstyleType);
  };

  const filterHairstyleOccasion = async () => {
    await getAllHairstyleOccasion().then(setHairstyleOccasion);
    // console.warn(hairstyleOccasion);
  };

  const getAllTheHairstyles = async () => {
    const fetchedHairstyles = await getPublicHairstyle();
    setHairstyles(fetchedHairstyles);
    console.warn(hairstyles);
  };

  useEffect(async () => {
    await filterHairstyleType();
    await filterHairstyleOccasion();
    await getAllTheHairstyles();
    await getHairstylesbyType();
  }, []);

  return (
    <div className="type-filter">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <p style={{ marginLeft: '5px', marginBottom: '5px' }}><strong>Type</strong></p>
          {
            hairstyleType?.map((type) => (
              <Dropdown.Item
                href={`#/${type.firebaseKey}`}
                key={type.firebaseKey}
                value={type.firebaseKey}
              >{type.name}
              </Dropdown.Item>
            ))
          }
          <p style={{ marginLeft: '5px', marginBottom: '5px', marginTop: '10px' }}><strong>Occasion</strong></p>
          {
            hairstyleOccasion?.map((occasion) => (
              <Dropdown.Item
                href={`#/${occasion.firebaseKey}`}
                key={occasion.firebaseKey}
                value={occasion.firebaseKey}
              >{occasion.name}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
