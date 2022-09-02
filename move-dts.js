/** @format */

import path from 'path';
import fs from 'fs';

const writeFiles = (path, name, data, callback = () => {}) => {
  fs.writeFile(path + name, data, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.mkdirSync(path, { recursive: true });
      } else {
        console.error(err);
      }
      writeFiles(path, name, data);
    } else {
      callback();
    }
  });
};

fs.readdir('./components', function (err, files) {
  var dirs = [];
  (function iterator(i) {
    if (i == files.length) {
      dirs.forEach((oneDir) => {
        if (oneDir.indexOf('.d.ts') > -1) {
          fs.readFile(
            `./components/${oneDir}`,
            { encoding: 'utf8' },
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              writeFiles('./dist/types', `/${oneDir}`, data, () => {});
            },
          );
        }
      });
      dirs.forEach((oneDir) => {
        if (oneDir.indexOf('.d.ts') > -1) {
          fs.unlinkSync(`./components/${oneDir}`);
        }
      });
      return;
    }
    fs.stat(path.join('./components', files[i]), function (err, data) {
      if (data.isFile()) {
        dirs.push(files[i]);
      }
      iterator(i + 1);
    });
  })(0);
});
