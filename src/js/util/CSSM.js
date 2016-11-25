import CSSM from 'react-css-modules'; // src/index';

export default function(component, styles) {
  return CSSM(component, styles, { errorWhenNotFound: false, allowMultiple: false });
}
