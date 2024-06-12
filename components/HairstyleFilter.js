/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getAllHairstyleType } from '../api/HairstyleTypeData';
import { getAllHairstyleOccasion } from '../api/HairstyleOccasionData';

export default function HairstyleTypeFilter({ filterTypeFunction, filterOccasionFunction, filterAll }) {
  const [hairstyleType, setHairstyleType] = useState([]);
  const [hairstyleOccasion, setHairstyleOccasion] = useState([]);

  const filterHairstyleType = async () => {
    await getAllHairstyleType().then(setHairstyleType);
  };

  const filterHairstyleOccasion = async () => {
    await getAllHairstyleOccasion().then(setHairstyleOccasion);
  };

  useEffect(async () => {
    await filterHairstyleType();
    await filterHairstyleOccasion();
  }, []);

  return (
    <div className="type-filter">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => filterAll()}
          >All
          </Dropdown.Item>
          <p style={{ marginLeft: '5px', marginBottom: '5px' }}><strong>Type</strong></p>
          {
            hairstyleType?.map((type) => (
              <Dropdown.Item
                key={type.firebaseKey}
                value={type.firebaseKey}
                onClick={() => filterTypeFunction(type.firebaseKey)}
              >{type.name}
              </Dropdown.Item>
            ))
          }
          <p style={{ marginLeft: '5px', marginBottom: '5px', marginTop: '10px' }}><strong>Occasion</strong></p>
          {
            hairstyleOccasion?.map((occasion) => (
              <Dropdown.Item
                key={occasion.firebaseKey}
                value={occasion.firebaseKey}
                onClick={() => filterOccasionFunction(occasion.firebaseKey)}
              >{occasion.name}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

HairstyleTypeFilter.propTypes = {
  filterTypeFunction: PropTypes.func.isRequired,
  filterOccasionFunction: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
};
