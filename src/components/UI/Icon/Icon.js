import React from 'react';
import { AiFillGithub, AiOutlineLink, AiOutlineFile, AiOutlineDelete } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsCardHeading } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
const Icon = ({ icon, ...props }) => {
  const icons = {
    github: <AiFillGithub {...props} />,
    title: <BsCardHeading {...props} />,
    webpage: <AiOutlineLink {...props} />,
    description: <AiOutlineFile {...props} />,
    back: <IoMdArrowRoundBack {...props} />,
    edit: <FiEdit {...props} />,
    delete: <AiOutlineDelete {...props}/>
  };
  return icon in icons ? icons[icon] : null;
};

export default Icon;
