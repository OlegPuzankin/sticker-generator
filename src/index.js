import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import StickerGeneratorApp from './StickerGeneratopApp';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<StickerGeneratorApp/>, document.getElementById('root'));

serviceWorker.unregister();
