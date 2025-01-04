import { useRef, useEffect } from 'react';
import StyledNewPost from './StyledNewPost';
import { Editor } from '@tinymce/tinymce-react';
import useInput from '../../hooks/useInput';

const NewPost = ({ posts, setPosts }) => {
  const editorRef = useRef(null);

  const [title, resetTitle, titleAttributes] = useInput('title', '');
  const [subtitle, resetSubtitle, subtitleAttributes] = useInput('subtitle', '');
  const [content, resetContent, contentAttributes] = useInput('content', '');

  const handleNewPost = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
