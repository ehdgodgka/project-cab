import React from 'react';
import './Backdrop.scss';

const Backdrop = ({ show }) => (show ? <div className='backdrop'></div> : null);

export default Backdrop;
