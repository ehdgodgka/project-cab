import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (collection) {
      const unsub = projectFirestore
        .collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          let documents = [];
          snapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
          });
          console.log(documents);

          setDocs(documents);
        });
      return () => unsub();
    }
  }, [collection]);

  return { docs };
};

export default useFirestore;
