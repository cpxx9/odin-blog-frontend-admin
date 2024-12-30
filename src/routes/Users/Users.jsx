import UsersList from '../../components/Users/Users/UsersList';
import StyledUsers from './StyledUsers';

const Users = () => {
  return (
    <StyledUsers>
      <h2>Users</h2>
      <UsersList />
    </StyledUsers>
  );
};

export default Users;
