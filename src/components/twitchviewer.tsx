import React, { useEffect } from 'react';

const TwitchEmbed = ({streamer}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.Twitch.Embed('twitch-embed', {
        width: 854,
        height: 480,
        channel: streamer,
        layout: 'video',
        parent: ['tanglyeagle7718.github.io']
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="twitch-embed"></div>
    </div>
  );
};

export default TwitchEmbed;
