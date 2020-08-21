import React, { useState, useContext } from 'react';
import Title from './components/Title/Title';
import InputGroup from './components/FormInput/InputGroup/InputGroup';
import Button from './components/UI/Button/Button';
import Modal from './components/UI/Modal/Modal';
import ProjectForm from './components/ProjectForm/ProjectForm';
import ProjectList from './components/Project/ProjectList/ProjectList';
import ReadmeView from './components/Project/ReadmeView/ReadmeView';
import { ModalContext, MODE } from './contexts/modalContext';
import useAuth from './hooks/useAuth';
import './App.scss';
function App() {
  const { loginState } = useAuth();
  const { modal, setModal } = useContext(ModalContext);
  const [adminCode, setAdminCode] = useState('');
  const [codeFormVisible, setCodeFormVisible] = useState(false);

  const closeModal = () => {
    setModal({ mode: MODE.CLOSE, project: null });
  };
  const openModal = (mode, project) => {
    setModal({ mode, project });
  };
  // const openModal = mode;

  const getModalView = () => {
    switch (modal.mode) {
      case MODE.ADD:
        return <ProjectForm finishSubmit={closeModal} />;
      case MODE.EDIT:
        return <ProjectForm finishSubmit={closeModal} />;
      case MODE.README:
        return <ReadmeView markdown={modal.project.description} />;
      default:
        return <div>wrong mode</div>;
    }
  };
  const changeHandler = (event) => {
    setAdminCode(event.target.value);
  };
  const toggleCodeForm = () => {
    setCodeFormVisible(!codeFormVisible);
  };

  return (
    <div className='App'>
      <Title />
      {/* {loginState ? (
        <div className='auth-mode'>
          <span>Admin Mode</span>
          <Button>To Guest</Button>
        </div>
      ) : (
        <>
          <div className='auth-mode'>
            <span>Guest Mode</span>
            <Button onClick={toggleCodeForm}>To Admin</Button>
          </div>
        </>
      )} 
      {codeFormVisible && (
        <div className='auth-mode__input'>
          <InputGroup type='password' value={adminCode} handleChange={changeHandler} />
          <Button onClick={toggleCodeForm}>confirm</Button>
        </div>
      )}
*/}
      <div className='App__button-row'>
        <Button
          className='App__button--add-project button button--big'
          onClick={() => openModal(MODE.ADD)}
          value='add project'>
          add project
        </Button>
      </div>

      <ProjectList />
      <Modal show={modal.mode !== MODE.CLOSE} onClickCloseBtn={() => closeModal()}>
        {getModalView()}
      </Modal>
    </div>
  );
}

export default App;
