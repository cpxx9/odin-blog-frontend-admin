import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import StyledUser from '../../components/Users/User/StyledUser';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { userInfo } = location.state;
  const [commentsToDelete, setCommentsToDelete] = useState([]);

  const handleAdminChange = async (e) => {
    try {
      await axiosPrivate.put(`/users/${userInfo.id}`, JSON.stringify({ admin: e.target.checked }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAuthorChange = async (e) => {
    try {
      await axiosPrivate.put(
        `/users/${userInfo.id}`,
        JSON.stringify({ author: e.target.checked }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComments = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(`/comments`, JSON.stringify({ commentsToDelete }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }

    setCommentsToDelete([]);
  };

  const updateToDeleteList = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setCommentsToDelete(
      checked ? [...commentsToDelete, value] : commentsToDelete.filter((item) => item !== value),
    );
  };

  return (
    <StyledUser>
      <h3>{userInfo.username}</h3>
      <label htmlFor="isAdmin">isAdmin: </label>
      <input
        type="checkbox"
        name="isAdmin"
        id="isAdmin"
        defaultChecked={userInfo.admin}
        onChange={handleAdminChange}
        value="isAuthor"
      />
      <label htmlFor="isAuthor">isAuthor: </label>
      <input
        type="checkbox"
        name="isAuthor"
        id="isAuthor"
        defaultChecked={userInfo.author}
        onChange={handleAuthorChange}
        value="isAuthor"
      />

      <article>
        <h4>Comments</h4>
        <form onSubmit={handleDeleteComments}>
          <button type="submit">Remove Selected</button>
          <table>
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Content</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.comments.map((comment) => (
                <tr key={comment.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={commentsToDelete.includes(comment.id)}
                      onChange={updateToDeleteList}
                      name={comment.id}
                      id={comment.id}
                      value={comment.id}
                    />
                  </td>
                  <td>
                    <label htmlFor={comment.id}>{comment.content}</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </article>
    </StyledUser>
  );
};

export default User;
