import React, { useEffect } from 'react';

const TwitchEmbed = ({ streamer, chat, width, height }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const embedElement = document.getElementById(`twitch-embed-${streamer}`);
      
      embedElement.innerHTML = ''; // Clear the old embed

      if (chat) {
        new window.Twitch.Embed(`twitch-embed-${streamer}`, {
          width: width,
          height: height,
          channel: streamer,
          parent: ['tanglyeagle7718.github.io'],
        });
      } else {
        new window.Twitch.Embed(`twitch-embed-${streamer}`, {
          width: width,
          height: height,
          channel: streamer,
          layout: 'video',
          parent: ['tanglyeagle7718.github.io'],
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [streamer, chat, width, height]);

  return (
    <div>
      <div id={`twitch-embed-${streamer}`}></div>
    </div>
  );
};

export default TwitchEmbed;
