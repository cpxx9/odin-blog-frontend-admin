import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import StyledPost from './StyledPost';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';

const Post = () => {
  const editorRef = useRef(null);
  const location = useLocation();
  const { postInfo } = location.state;

  const [title, resetTitle, titleAttributes] = useInput('title', `${postInfo.title}`);
  const [subtitle, resetSubtitle, subtitleAttributes] = useInput(
    'subtitle',
    `${postInfo.subtitle}`,
  );
  const [content, resetContent, contentAttributes] = useInput('content', String(postInfo.content));
  const [published, setPublished] = useToggle('published', postInfo.published);

  return (
    <StyledPost>
      <form>
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
        />
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
      </form>
    </StyledPost>
  );
};

export default Post;
