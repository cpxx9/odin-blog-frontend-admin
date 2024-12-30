import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import StyledUsers from './StyledUsers';

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axios.get('/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <StyledUsers>
      {users?.length ? (
        <ul>
          {users.map((user) => {
            <li key={uuidv4()}>
              <h4>{user.username}</h4>
              <p>
                <em>Created on: </em>
                {user.created}
              </p>
            </li>;
          })}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </StyledUsers>
  );
};

export default Users;
