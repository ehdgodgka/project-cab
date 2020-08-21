import React, { useState } from 'react';
export const MODE = { CLOSE: 'CLOSE', README: 'README', EDIT: 'EDIT', ADD: 'ADD' };
export const ModalContext = React.createContext({ modal: null, setModal: () => {} });

export default (props) => {
  const [modal, setModal] = useState({ mode: MODE.CLOSE, project: null });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>{props.children}</ModalContext.Provider>
  );
};
