import React from 'react';
import logo from '../../assets/developer.png';
import './Title.scss';
const Title = () => {
  return (
    <div className='title'>
      <h1 className='title--brand title--center'>project-cab</h1>

      <h2 className='title--main title--center'>
        <img src={logo} alt='developer-icon' />
        soodang's projects
      </h2>
      <p className='title--sub title--center'>
        One step towards a more passionate and interactive developer{' '}
      </p>
    </div>
  );
};

export default Title;
