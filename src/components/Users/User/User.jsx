import { useState, useEffect } from 'react';
import StyledUser from './StyledUser';
import { axiosPrivate } from '../../../api/axios';

const User = ({ userInfo, users, setUsers }) => {
  const [errMsg, setErrMsg] = useState('');

  const DELETE_URL = `/users/${userInfo.id}`;

  const betterDate = (str) => {
    return new Date(str);
  };

  const createdDate = betterDate(userInfo.created);
  const updatedDate = betterDate(userInfo.updated);

  const handleDelete = async (e) => {
    e.preventDefault();
    setErrMsg('');
    try {
      const res = await axiosPrivate.delete(DELETE_URL);
      const newUsers = users.filter((user) => user.id !== userInfo.id);
      setUsers(newUsers);
    } catch (err) {
      const errDat = err.code === 'ERR_NETWORK' ? 'Server error' : err.response.data.msg;
      console.log(err);
      setErrMsg(errDat);
    }
  };

  return (
    <StyledUser>
      <h4>{userInfo.username}</h4>
      <p>
        {userInfo.firstname} {userInfo.lastname}
      </p>
      <p>
        <em>Created on: </em>
        {`${createdDate.getMonth() + 1}`}
        <strong>/</strong>
        {`${createdDate.getDate()}`}
        <strong>/</strong>
        {`${createdDate.getFullYear()}`}
      </p>
      <p>
        <em>Updated: </em>
        {`${updatedDate.getMonth() + 1}`}
        <strong>/</strong>
        {`${updatedDate.getDate()}`}
        <strong>/</strong>
        {`${updatedDate.getFullYear()}`}
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button>Edit</button>
    </StyledUser>
  );
};

export default User;
