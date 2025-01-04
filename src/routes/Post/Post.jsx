import { useLocation } from 'react-router-dom';
import StyledPost from '../../../StyledPost';

const Post = () => {
  const location = useLocation();
  const { postInfo } = location.state;
  return (
    <StyledPost>
      <h2>{postInfo.title}</h2>
    </StyledPost>
  );
};

export default Post;
