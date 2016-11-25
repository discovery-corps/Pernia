import React from 'react';
import CSSM from 'util/CSSM';
import styles from './helloworld.scss';

export default CSSM(() => <div styleName="foo">Hello world!AV</div>, styles);
