import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import StyledPost from './StyledPost';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Post = () => {
  const editorRef = useRef(null);
  const location = useLocation();
  const { postInfo } = location.state;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [showSavedPopUp, setShowSavedPopUp] = useState(false);
  const [title, resetTitle, titleAttributes] = useInput('title', `${postInfo.title}`);
  const [subtitle, resetSubtitle, subtitleAttributes] = useInput(
    'subtitle',
    `${postInfo.subtitle}`,
  );
  const [content, resetContent, contentAttributes] = useInput('content', String(postInfo.content));
  const [published, togglePublished] = useToggle('published', postInfo.published);

  const handleShowSavedPopUp = () => setShowSavedPopUp(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSavedPopUp(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showSavedPopUp]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(
        `/posts/${postInfo.id}`,
        JSON.stringify({
          title,
          subtitle,
          content,
          published,
          datepublished: published ? new Date() : null,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      handleShowSavedPopUp();
    } catch (err) {
      console.log(err);
    }
  };

  const substrs = ['<section', '<div', '</section', '</div', '<main', '</main', '<nav', '</nav'];

  const checkIfStringStartsWith = (str, substrs) => {
    return substrs.some((substr) => str.startsWith(substr));
  };

  const handleEditorChange = (e) => {
    const content = editorRef.current.getContent().split('\n');
    const newContent = content.filter((item) => !checkIfStringStartsWith(item, substrs));
    contentAttributes.onChange(newContent.join(''));
  };

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/posts/${postInfo.id}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledPost>
      {showSavedPopUp && <p>Saved</p>}
      <button onClick={handleDelete}>Delete Post</button>
      <form>
        <button onClick={handleUpdate}>Update Post</button>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" {...titleAttributes} />
        <label htmlFor="subtitle">Post Subtitle</label>
        <input {...subtitleAttributes} type="text" name="subtitle" id="subtitle" />
        <label htmlFor="published">Published: </label>
        <input
          type="checkbox"
          name="published"
          id="published"
          defaultChecked={postInfo.published}
          onChange={togglePublished}
        />
        <label htmlFor="content">Post:</label>
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          value={contentAttributes.value}
          onEditorChange={handleEditorChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'preview',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </form>
    </StyledPost>
  );
};

export default Post;
