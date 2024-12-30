import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { v4 as uuidv4 } from 'uuid';
import StyledUsersList from './StyledUsersList';
import User from '../User/User';

const UsersList = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log(res.data);
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
    <StyledUsersList>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={uuidv4()}>
              <User userInfo={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </StyledUsersList>
  );
};

export default UsersList;
