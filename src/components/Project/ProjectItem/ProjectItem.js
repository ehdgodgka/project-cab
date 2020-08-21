import React, { useContext } from 'react';
import { ModalContext, MODE } from '../../../contexts/modalContext';

import Card from '../../UI/Card/Card';
// import Icon from '../../UI/Icon/Icon';
import './ProjectItem.scss';
import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';
const ProjectItem = ({ project, onClickReadme }) => {
  const { modal, setModal } = useContext(ModalContext);
  const openEditModal = () => {
    setModal({ mode: MODE.EDIT, project });
  };
  const openReadmeModal = () => {
    setModal({ mode: MODE.README, project });
  };
  const defaultImage =
    'https://grittechnologies.com/wp-content/themes/grit-technologies/assets/img/blog/no-post-image.png';
  return (
    <>
      <Card className='card--rounded card--flex-col project'>
        <Button className='project__edit-btn button--trans' onClick={() => openEditModal()}>
          <Icon icon='edit' />
        </Button>
        <img
          className='project__image'
          src={project.image ? project.image.url : defaultImage}
          alt='project'
        />

        <div className='project__title'>{project.title}</div>
        <div className='project__links'>
          {project.github && (
            <div className={`project__link`}>
              <Icon icon='github' size='18px' />
              <a target='_blank' rel='noopener noreferrer' href={project.github}>
                github
              </a>
            </div>
          )}
          {project.webpage && (
            <div className={'project__link'}>
              <Icon icon='webpage' size='18px' />
              <a target='_blank' rel='noopener noreferrer' href={project.webpage}>
                web
              </a>
            </div>
          )}
          {project.description && (
            <div className={'project__link'} onClick={() => openReadmeModal()}>
              <Icon icon='description' size='18px' />
              readme
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProjectItem;
