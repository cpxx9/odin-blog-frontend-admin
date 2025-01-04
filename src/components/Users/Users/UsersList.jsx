import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { v4 as uuidv4 } from 'uuid';
import StyledUsersList from './StyledUsersList';
import User from '../User/User';

const UsersList = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        isMounted && setUsers(res.data.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
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
              <User userInfo={user} users={users} setUsers={setUsers} />
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
