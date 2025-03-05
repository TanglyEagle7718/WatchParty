import React, { useEffect } from 'react';

const TwitchEmbed = ({ streamer, chat, width, height }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const embedElement = document.getElementById('twitch-embed');
      
      // Clean up any existing embed before creating a new one
      embedElement.innerHTML = ''; // Clear the old embed

      // Create the new embed based on current props (width, height, etc.)
      if (chat) {
        new window.Twitch.Embed('twitch-embed', {
          width: width,
          height: height,
          channel: streamer,
          parent: ['tanglyeagle7718.github.io'],
        });
      } else {
        new window.Twitch.Embed('twitch-embed', {
          width: width,
          height: height,
          channel: streamer,
          layout: 'video',
          parent: ['tanglyeagle7718.github.io'],
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, [streamer, chat, width, height]); // Re-run effect when these props change

  return (
    <div>
      <div id="twitch-embed"></div>
    </div>
  );
};

export default TwitchEmbed;
