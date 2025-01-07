import { useRef } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { jwtDecode } from 'jwt-decode';
import StyledNewPost from './StyledNewPost';
import { Editor } from '@tinymce/tinymce-react';
import useInput from '../../hooks/useInput';
import useAuth from '../../hooks/useAuth';

const NewPost = ({ posts, setPosts }) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const editorRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const [title, resetTitle, titleAttributes] = useInput('title', '');
  const [subtitle, resetSubtitle, subtitleAttributes] = useInput('subtitle', '');
  const [content, resetContent, contentAttributes] = useInput('content', '');

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post('/posts', JSON.stringify({ title, subtitle, content }), {
        headers: { 'Content-Type': 'application/json' },
      });
      const newPost = {
        ...res.data.data,
        author: {
          username: decoded.user.username,
          firstname: decoded.user.firstname,
          lastname: decoded.user.lastname,
        },
      };
      const newPosts = [...posts, newPost];
      setPosts(newPosts);
      resetTitle();
      resetSubtitle();
      resetContent();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledNewPost>
      <label htmlFor="title">Title: </label>
      <input {...titleAttributes} required type="text" name="title" id="title" />
      <label htmlFor="subtitle">Post Subtitle</label>
      <input {...subtitleAttributes} type="text" name="subtitle" id="subtitle" />
      <label htmlFor="content">Post:</label>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={contentAttributes.value}
        onEditorChange={contentAttributes.onChange}
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
      <button onClick={handleNewPost}>Create Post</button>
    </StyledNewPost>
  );
};

export default NewPost;
