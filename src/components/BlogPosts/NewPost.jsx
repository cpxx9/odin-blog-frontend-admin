import { useRef } from 'react';
import StyledNewPost from './StyledNewPost';
import { Editor } from '@tinymce/tinymce-react';

const NewPost = () => {
  const editorRef = useRef(null);

  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <StyledNewPost>
      <label htmlFor="title">Title: </label>
      <input required type="text" name="title" id="title" />
      <label htmlFor="subtitle">Post Subtitle</label>
      <input type="text" name="subtitle" id="subtitle" />
      <label htmlFor="post">Post:</label>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      <button onClick={log}>Log editor content</button>
    </StyledNewPost>
  );
};

export default NewPost;
