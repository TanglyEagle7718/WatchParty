import React, { useEffect } from 'react';

const TwitchEmbed = ({streamer}) => {
  useEffect(() => {
    // Load the Twitch Embed script dynamically when the component mounts
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the Twitch embed once the script is loaded
    script.onload = () => {
      new window.Twitch.Embed('twitch-embed', {
        width: 854,
        height: 480,
        channel: streamer,
        parent: ['embed.example.com', 'othersite.example.com']
      });
    };

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* This div will be used for the Twitch embed */}
      <div id="twitch-embed"></div>
    </div>
  );
};

export default TwitchEmbed;
