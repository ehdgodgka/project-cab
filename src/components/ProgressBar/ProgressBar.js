import React from 'react';
import './ProgressBar.scss';
const ProgressBar = ({ progress }) => {
  return (
    <>
      <span>loading...</span>
      <div className='progress-bar-outer'>
        <div className='progress-bar' style={{ width: progress + '%' }}></div>
      </div>
    </>
  );
};

export default ProgressBar;
