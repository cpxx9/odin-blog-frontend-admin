import { useState } from 'react';
import NewPost from '../../components/BlogPosts/NewPost';
import Posts from '../../components/BlogPosts/Posts/Posts';
import Modal from '../../components/Modal/Modal';
import StyledRoot from './StyledRoot';

const Root = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <StyledRoot>
      <h2>Posts</h2>
      <button onClick={() => setIsModelOpen(true)}>New Post</button>
      <Modal open={isModelOpen} onClose={() => setIsModelOpen(false)} title="New Blog post">
        <NewPost />
      </Modal>
      <Posts />
    </StyledRoot>
  );
};

export default Root;
