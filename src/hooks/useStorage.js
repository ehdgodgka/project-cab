import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (projectSaved, image, project, actionType) => {
  const [progress, setProgress] = useState(0);
  const [firebaseError, setFirebaseError] = useState(null);
  const [done, setDone] = useState(false);
  const collectionRef = projectFirestore.collection('projects');

  const saveFile = (file) => {
    let fileName;
    let storageRef;
    fileName = Math.floor(Date.now() / 1000).toString();

    // get a reference to save
    storageRef = projectStorage.ref(fileName);

    return new Promise((resolve, reject) => {
      storageRef.put(file).on(
        'state_changed',
        (snapshot) => {
          // task progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 80;
          setProgress(progress);
        },
        (error) => {
          //error
          reject(error);
        },
        async () => {
          //complete
          const url = await storageRef.getDownloadURL();
          resolve({ name: fileName, url });
        }
      );
    });
  };

  const deleteFile = (fileName) => {
    const fileRef = projectStorage.ref(fileName);
    return new Promise((resolve, reject) => {
      fileRef
        .delete()
        .then(function () {
          console.log('file successfully deleted!');
          resolve();
        })
        .catch(function (error) {
          console.error('Error removing file: ', error);
          reject(error);
        });
    });
  };

  const saveDoc = (doc) => {
    return new Promise((resolve, reject) => {
      collectionRef
        .add({ createdAt: timestamp(), ...doc })
        .then(function (docRef) {
          console.log(docRef);
          //complete
          setProgress(100);
          setTimeout(setDone(true), 500);
        })
        .catch(function (error) {
          //error
          setFirebaseError(error);
        });
    });
  };

  const updateDoc = (doc, docId) => {
    return new Promise((resolve, reject) => {
      collectionRef
        .doc(docId)
        .set({ ...doc, updateAt: timestamp() })
        .then(function () {
          console.log('Document successfully written!');
          resolve();
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
          reject(error);
        });
    });
  };

  const deleteDoc = (docId) => {
    return new Promise((resolve, reject) => {
      collectionRef
        .doc(docId)
        .delete()
        .then(function () {
          console.log('Document successfully deleted!');
          resolve();
        })
        .catch(function (error) {
          console.error('Error removing document: ', error);
          reject(error);
        });
    });
  };

  const addProject = async () => {
    let projectToSave = { ...project };

    try {
      if (image.file) {
        const imageStorage = await saveFile(image.file);
        projectToSave.image = imageStorage;
      }
      await saveDoc(projectToSave);
      setProgress(100);
      setTimeout(setDone(true), 500);
    } catch (error) {
      setFirebaseError(error);
    }
  };

  const updateProject = async () => {
    const projectToUpdate = { ...project };
    console.log('update project doc ');
    try {
      if (projectSaved.image) {
        // 기존 이미지파일 삭제
        if (image.file || !image.storage) {
          console.log(`기존 이미지${projectSaved.image.name} 삭제합니다`);
          await deleteFile(projectSaved.image.name);
          delete projectToUpdate.image;
          console.log('이미지 파일 삭제');
        }
      }

      if (image.file) {
        // 새로운 이미지 저장
        const imageStorage = await saveFile(image.file);
        projectToUpdate.image = imageStorage;
      }
      console.log(projectToUpdate);
      await updateDoc(projectToUpdate, projectToUpdate.id);
      setProgress(100);
      setTimeout(setDone(true), 500);
    } catch (error) {
      setFirebaseError(error);
    }
  };

  const deleteProject = async () => {
    console.log('delete fire');
    try {
      console.log(projectSaved);
      if (projectSaved.image) {
        //delete imagefile
        console.log('delete file');
        await deleteFile(projectSaved.image.name);
      }
      setProgress(50);
      //delete project doc
      console.log('delete doc');
      await deleteDoc(projectSaved.id);
      setProgress(100);
      setTimeout(setDone(true), 500);
    } catch (error) {
      setFirebaseError(error);
    }
  };
  const reset = () => {
    setProgress(0);
    setFirebaseError(null);
    setDone(false);
  };
  useEffect(() => {
    switch (actionType) {
      case 'ADD':
        addProject();
        break;
      case 'EDIT':
        updateProject();
        break;
      case 'DELETE':
        deleteProject();
        break;
      default:
        reset();
        break;
    }
  }, [actionType]);

  return { progress, firebaseError, done };
};

export default useStorage;
//custom hook : file 이 변할때 마다 실행될 것이다.
