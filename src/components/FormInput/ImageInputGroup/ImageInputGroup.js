import React, { useState, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';
import './ImageInputGroup.scss';
const ImageInputWithPreview = ({ image, setImage }) => {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [keyToReset, setKeyToReset] = useState(0);
  const changeHandler = (event) => {
    console.log(image);
    const selected = event.target.files[0];
    const types = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];
    if (selected && types.includes(selected.type)) {
      setImage({ ...image, file: selected });
      setKeyToReset(Math.random().toString(36));
      setError(null);
    } else {
      setError('please select a valid image file\n(valid formats: png, jpeg, gif)');
    }
  };

  const getPreview = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (res) => {
        resolve(res.target.result);
        reader.onerror = (err) => reject(err);
      };
    });
  };
  const deleteImage = () => {
    setImage({ file: '', storage: null });
  };
  useEffect(() => {
    console.log(image);
    if (image.file) {
      (async function () {
        const preview = await getPreview(image.file);
        setPreview(preview);
      })();
    }
  }, [image.file]);
  return (
    <div className='image-input-group'>
      <div className='image-input-group__preview'>
        {(image.file || image.storage) && (
          <Button
            className='button-trans image-input-group__delete-btn'
            onClick={() => deleteImage()}>
            <Icon icon='delete' size='20px' />
          </Button>
        )}
        {image.file ? (
          <>
            <img className='preview__image' src={preview} alt='preview' />
            <div className='preview__name'>{image.file.name}</div>
          </>
        ) : image.storage ? (
          <>
            <img className='preview__image' src={image.storage.url} alt='preview' />
          </>
        ) : (
          'project image'
        )}
      </div>
      <label className='image-input-group__label' htmlFor='image-input-group__input'>
        change image
      </label>
      <input
        className='image-input-group__input--hidden'
        id='image-input-group__input'
        type='file'
        name='image'
        key={keyToReset}
        onChange={changeHandler}></input>
      {error && <div className='image-input-group__error'>{error}</div>}
    </div>
  );
};

export default ImageInputWithPreview;
