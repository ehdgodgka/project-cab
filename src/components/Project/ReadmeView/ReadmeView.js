import React from 'react';
import './ReadmeView.scss';
const ReactMarkdown = require('react-markdown');
const ReadmeView = ({ markdown }) => {
  return (
    <div className='markdown'>
      <ReactMarkdown source={markdown} />
    </div>
  );
};

export default ReadmeView;
