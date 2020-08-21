import React from 'react';

import ProjectItem from '../ProjectItem/ProjectItem';
import useFirestore from '../../../hooks/useFirestore';

import './ProjectList.scss';
const ProjectList = () => {
  const { docs } = useFirestore('projects');
  console.log(docs);
  return (
    <div className='project-list'>{docs && docs.map((doc) => <ProjectItem project={doc} />)}</div>
  );
};

export default React.memo(ProjectList);
