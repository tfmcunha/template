import ReactDOM from 'react-dom';
import React from 'react';
import ReactPlayer from 'react-player';

import { component } from 'picoapp';

function MediaPlayer({url}) {
    return <ReactPlayer 
        className="video_player"
        width='100%'
        height='100%'
        url={url}/>
}

export default component((node, ctx) => {
  const video_url = node.dataset.url
  ReactDOM.render(<MediaPlayer url={video_url}/>, node);
});