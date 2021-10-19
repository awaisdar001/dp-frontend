// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const testEnvFile = path.resolve(process.cwd(), '.env.test');
if (fs.existsSync(testEnvFile)) {
  dotenv.config({ path: testEnvFile });
}
// const searchButtonClickHandler = (event) => {
//   setNavState({
//     ...navState,
//     searchBoxVisibility: !navState.searchBoxVisibility,
//   });
// };

// "build-rename-logo": "renamer   --find \"/([^\\.])\\.[^\\.]+\\.(\\w+)/\" --replace '$1.$2' build/static/media/*",
// "copy-build-logo": "copyfiles -f 'build/static/media/*' '../static/media/'",
