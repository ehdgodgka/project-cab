import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
// 로그인 상태 firebase 에서 확인
const useAuth = () => {
  const [loginState, setLoginState] = useState();
  useEffect(() => {
    const unscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if (userAuth) {
      //   const userRef = await createUserProfileDocument(userAuth);
      //   userRef.onSnapshot((snapshot) => {
      //     setLoginState({ id: snapshot.id, ...snapshot.data() });
      //   });
      // }
      setLoginState(userAuth);
    });
    return unscribeFromAuth;
  }, []);
  return { loginState };
};

export default useAuth;
