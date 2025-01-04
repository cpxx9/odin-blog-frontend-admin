import StyledNewPost from './StyledNewPost';

const NewPost = () => {
  return (
    <StyledNewPost>
      <label htmlFor="title">Title: </label>
      <input required type="text" name="title" id="title" />
      <label htmlFor="subtitle">Post Subtitle</label>
      <input type="text" name="subtitle" id="subtitle" />
    </StyledNewPost>
  );
};

export default NewPost;
