import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import logo from './logo.svg';
import './App.css';
import './modal.css'
import TopBar from './components/topbar.tsx';
import TwitchEmbed from './components/twitchviewer.tsx';
import FancyButton from './components/fancybutton.js';
import { RiMenu2Fill } from "react-icons/ri";
import { FaYoutube, FaTwitch, FaTrash } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";


function App() {
  const [streamerList, setStreamerList] = useState([]);

  const [streamer, setStreamer] = useState('');
  const [selection, setSelection] = useState('username');

  const [isVideoVisible, setVideoVisible] = useState(false);

  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setContainerDimensions({
        width: window.innerWidth * 0.98,
        height: window.innerHeight * 0.79
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
    <div className={`flex flex-col bg-black h-screen grid ${isVideoVisible ? 'grid-rows-[1fr_8fr_1fr]' : 'grid-rows-[1fr_8fr_1fr]'} App`}>
      <TopBar/>


      <div className="flex bg-black VideoViewer">
        {streamerList.length === 1 ? (
          <div className="grid grid-rows-1 h-full p-1">
            {streamerList.map((streamer, index) => (
              <div key={index} className="flex text-white">
                <TwitchEmbed 
                  streamer={streamer} 
                  chat={true} 
                  width={containerDimensions.width * 0.93} 
                  height={containerDimensions.height} 
                />
                <div className="pl-4 pr-4 bg-[#9d026d] justify-center items-center relative group flex flex-col">
                  <div style={{flex: 1}}>
                      <button className="flex flex-col justify-center items-center">
                        <FaYoutube className="text-7xl text-white" />
                      </button>
                  </div>
                  <div style={{flex: 1}}>
                      <button className="flex flex-col justify-center items-center">
                        <FaTwitch className="text-7xl text-white" />
                      </button>
                  </div>
                  <div style={{flex: 3}}></div>
                  <div style={{flex: 1}}>
                    <button className="flex flex-col justify-center items-center">
                      <IoChatbox className="text-7xl text-white" />
                    </button>
                  </div>
                  <div style={{flex: 1}}>
                    <button className="flex flex-col justify-center items-center">
                      <FaTrash className="text-7xl text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : streamerList.length === 2 ? (
          <div className="grid grid-rows-2 h-full">
            {streamerList.map((streamer, index) => (
              <div key={index} className="flex">
                <TwitchEmbed 
                  streamer={streamer} 
                  chat={true} 
                  width={containerDimensions.width} 
                  height={containerDimensions.height/2} 
                />
              </div>
            ))}
          </div>
        ) : streamerList.length > 2 && streamerList.length <= 4 ? (
          <div className="grid grid-rows-2 grid-cols-2 h-full">
            {streamerList.map((streamer, index) => (
              <div key={index} className="flex">
                <TwitchEmbed 
                  streamer={streamer} 
                  chat={true} 
                  width={containerDimensions.width/2} 
                  height={containerDimensions.height/2} 
                />
              </div>
            ))}
          </div>
        ) : streamerList.length > 4 && streamerList.length <= 8 ? (
          <div className="grid grid-rows-2 grid-cols-4 h-full">
            {streamerList.map((streamer, index) => (
              <div key={index} className="flex">
                <TwitchEmbed 
                  streamer={streamer} 
                  chat={true} 
                  width={containerDimensions.width/4} 
                  height={containerDimensions.height/2} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div>too many streams!</div>
        )
        
        
        }

      </div>

      
      <div className="bg-black border-t-2 border-white text-white flex justify-between items-center p-4">
        <div className="w-fit p-4 bg-black">
          <button>
              <RiMenu2Fill className="text-4xl"/>
          </button>
        </div>

        <div style={{flex: 20}}>
        {isVideoVisible && 
          <div className='flex'>
          
            {streamerList.map((streamer) => {
              return(
                <div className='flex' style={{ marginRight: '10px' }}>
                  <FancyButton streamer={streamer}/>
                </div>
              );
            })}

          </div>
          
          }

          {!isVideoVisible && 
            <div>
              Add your favorite streamers for them to show up here!
            </div>
          }
        </div>

        <Popup 
          trigger={<button className="bg-[#9d026d] text-white p-4 rounded-full shadow-lg hover:bg-[#e3029c] transition">
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
      
    </div>
  );
}

export default App;
