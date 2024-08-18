import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './PriceFilter.module.css';

const PriceFilter = ({ onPriceChange }) => {
  const valuesMap = [0, 300, 500, 1000, 5000, 10000, 50000, '50000+'];

  const [values, setValues] = useState([0, 7]);

  const handleChange = (newValues) => {
    const [min, max] = newValues;
    if (min >= 6) {
      setValues([6, max]);
      onPriceChange(`${valuesMap[6]}-${valuesMap[max]}`);
      console.log(`${valuesMap[6]}-${valuesMap[max]}`)
    } else if (max <= min + 1) {
      setValues([min, min + 1]);
      onPriceChange(`${valuesMap[min]}-${valuesMap[min + 1]}`); 
      console.log(`${valuesMap[min]}-${valuesMap[min + 1]}`)
    } else {
      setValues(newValues);
      onPriceChange(`${valuesMap[min]}-${valuesMap[max]}`);
      console.log(`${valuesMap[min]}-${valuesMap[max]}`)
    }
  };

  return (
    <div className={styles.rangeContainer}>
      <Range
        values={values}
        step={1}
        min={0}
        max={7}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              className={styles.track}
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#B89E80', '#ccc'],
                  min: 0,
                  max: 7
                })
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            className={styles.thumb}
          >
          </div>
        )}
      />
      <div className={styles.output}>
        {valuesMap[values[0]]} - {valuesMap[values[1]]}
      </div>
    </div>
  );
};

export default PriceFilter;