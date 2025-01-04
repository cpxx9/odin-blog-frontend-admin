import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from '../../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import StyledPosts from './StyledPosts';

const Posts = ({ posts, setPosts }) => {
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const res = await axios.get('/posts', {
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
          {posts.map((post) => {
            <li key={uuidv4()}>
              <h4>{post.title}</h4>
              <p>{post.subtitle}</p>
              <p>
                <em>Created by: </em>
                {post.author}
              </p>
            </li>;
          })}
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
