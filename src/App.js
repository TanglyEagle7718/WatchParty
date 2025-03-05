import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import logo from './logo.svg';
import './App.css';
import './modal.css'
import TwitchViewer from './components/twitchviewer.tsx';
import TopBar from './components/topbar.tsx';
import TwitchEmbed from './components/twitchviewer.tsx';

function App() {
  const [streamerList, setStreamerList] = useState([]);

  const [streamer, setStreamer] = useState('');
  const [selection, setSelection] = useState('username');

  const [isVideoVisible, setVideoVisible] = useState(false);

  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setContainerDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.8
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleSubmit = (e, close) => {
      e.preventDefault();
      addStreamer(streamer);
      setStreamer('');
      close();
      setVideoVisible(true)
  };

  const addStreamer = (streamer) => {
    if (!streamerList.includes(streamer)) {
      setStreamerList([...streamerList, streamer]);
    }
  }


  return (
    <div className={`flex flex-col h-screen grid ${isVideoVisible ? 'grid-rows-[1fr_8fr_1fr]' : 'grid-rows-[1fr_8fr_1fr]'} App`}>
      <TopBar/>

      <div className='flex bg-black VideoViewer'>
        {streamerList.map((streamer, index) => {
          let maxLength = streamerList.length;
          console.log("index", index);
          // you can have a max of 8 consecutive streams open
          // breaks: 1, 2, 3-4, 5-8

          if (streamerList.length === 1) {
            console.log("width" + containerDimensions.width);
          } 
          

          return(
          <div>
            <TwitchEmbed streamer={streamer} chat={true} width={containerDimensions.width} height={containerDimensions.height} />
          </div>
          );
        }
        )}
      </div>
      
      <div className="bg-black border-t-2 border-white text-white flex justify-between items-center p-4">
              <div className="text-2xl font-bold">
                  WatchParty
              </div>
          </div>
      <Popup trigger={<button className="fixed bottom-4 right-4 bg-[#9d026d] text-white p-4 rounded-full shadow-lg hover:bg-[#e3029c] transition">
          <Plus size={24} />
        </button>} position="left center" modal>
        
        {close => ( <div className="flex items-center justify-center ">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Streamer</h2>
                <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-6">
                    <div>
                        <label htmlFor="Streamer" className="block text-sm font-medium text-gray-700">Streamer</label>
                        <input
                            type="text"
                            id="Streamer"
                            value={streamer}
                            onChange={(e) => setStreamer(e.target.value)}
                            placeholder="Enter stream/streamer name"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#9d026d] focus:border-[#9d026d]"
                        />
                    </div>
                    <div>
                        <label htmlFor="selection" className="block text-sm font-medium text-gray-700">Select Option</label>
                        <select
                            id="selection"
                            value={selection}
                            onChange={(e) => setSelection(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#9d026d] focus:border-[#9d026d]"
                        >
                            <option value="username">Twitch</option>
                            <option value="userLink">Youtube</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#9d026d] text-white py-3 rounded-lg text-lg font-medium hover:bg-[#e3029c] transition"
                    >
                        Get Livestream
                    </button>
                </form>
            </div>
        </div>)}

      </Popup>
    </div>
  );
}

export default App;
