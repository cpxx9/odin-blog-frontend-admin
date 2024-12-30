import StyledUser from './StyledUser';

const User = ({ userInfo }) => {
  return (
    <StyledUser>
      <h4>{userInfo.username}</h4>
      <p>
        <em>Created on: </em>
        {userInfo.created}
      </p>
    </StyledUser>
  );
};

export default User;
