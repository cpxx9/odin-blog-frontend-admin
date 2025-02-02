import fse from 'fs-extra';
import path from 'path';
const topDir = import.meta.dirname;
fse.emptyDirSync(String(path.join(topDir, 'public', 'tinymce')));
fse.copySync(
  String(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce')),
  {
    overwrite: true,
  },
);
