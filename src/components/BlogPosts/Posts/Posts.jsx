import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import StyledPosts from './StyledPosts';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Posts = ({ posts, setPosts }) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  let PATH = '/posts';
  if (!decoded?.user?.admin) {
    PATH = `posts?userId=${decoded?.user?.id}`;
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const res = await axios.get(PATH, {
          signal: controller.signal,
        });
        isMounted && setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <StyledPosts>
      {posts?.length ? (
        <ul>
          {posts.map((post) => (
            <li key={uuidv4()}>
              <h4>{post.title}</h4>
              <p>{post.author.username}</p>
              <p>{`${post.author.firstname} ${post.author.lastname}`}</p>
              <Link to={`/posts/${post.id}`} state={{ postInfo: post }}>
                Edit post
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts to display</p>
      )}
    </StyledPosts>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
