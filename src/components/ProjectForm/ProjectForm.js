import React, { useState, useReducer, useEffect, useContext } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import ImageInputGroup from '../FormInput/ImageInputGroup/ImageInputGroup';
import InputGroup from '../FormInput/InputGroup/InputGroup';
import useStorage from '../../hooks/useStorage';
import { ModalContext, MODE } from '../../contexts/modalContext';

import './ProjectForm.scss';
const ProjectForm = ({ finishSubmit }) => {
  const { modal } = useContext(ModalContext);
  const [actionType, setActionType] = useState('');

  let imageInitial = { file: '', storage: null };
  let projectInitial = {
    title: '',
    github: '',
    webpage: '',
    description: ''
  };

  // edit mode
  let projectSaved = {};
  if (modal.mode === MODE.EDIT) {
    const { image, title, github, webpage, description, id, createdAt } = modal.project;
    projectSaved = { image, title, github, webpage, description, id, createdAt };
    if (image) imageInitial.storage = image;
    projectInitial = { ...projectInitial, ...projectSaved };
  }

  // const [imageFile, setImageFile] = useState('');
  const [image, setImage] = useState(imageInitial);
  const [project, setProject] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    projectInitial
  );
  const { progress, firebaseError, done } = useStorage(projectSaved, image, project, actionType);

  const [error, setError] = useState(null);

  const changeHandler = (event) => {
    setProject({ [event.target.name]: event.target.value });
  };
  const submitHandler = async (event) => {
    console.log(event.target);
    event.preventDefault();
    if (project.title.trim()) {
      console.log('trigger save to firebase ');
      // save to storage first
      console.log(event.target.name);
      setActionType(event.target.name);
    } else {
      setError('title is required');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  useEffect(() => {
    if (done) {
      setActionType(null);
      setImage(imageInitial);
      setProject({
        title: '',
        github: '',
        webpage: '',
        description: ''
      });
      finishSubmit();
      alert('new project added!');
      //form 데이터 지우기 , hook reset 하기, 모달 닫기
    }
  }, [done]);

  return (
    <div>
      <form className='form'>
        <ImageInputGroup image={image} setImage={setImage} />
        <InputGroup
          label='title'
          name='title'
          handleChange={changeHandler}
          value={project.title}
          inputStyle='underline'
        />
        <InputGroup
          label='github'
          name='github'
          handleChange={changeHandler}
          value={project.github}
          inputStyle='underline'
        />
        <InputGroup
          label='webpage'
          name='webpage'
          handleChange={changeHandler}
          value={project.webpage}
          inputStyle='underline'
        />
        <InputGroup
          label='description'
          name='description'
          handleChange={changeHandler}
          value={project.description}
          textarea='true'
        />
        {actionType && <ProgressBar progress={progress} />}
        <div className='form__error'> {error || firebaseError}</div>
        <div className='form__buttons'>
          {modal.mode === MODE.EDIT && (
            <input
              className='button button--danger'
              name='DELETE'
              type='submit'
              value='DELETE'
              onClick={submitHandler}
            />
          )}
          <input
            className='button'
            type='submit'
            name={modal.mode}
            value={modal.mode === MODE.ADD ? 'ADD PROJECT' : 'EDIT PROJECT'}
            onClick={submitHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
