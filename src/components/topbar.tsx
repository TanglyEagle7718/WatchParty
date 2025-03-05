import React, { useEffect } from 'react';
import { IoIosSettings } from "react-icons/io";


const TopBar = () => {
  

  return (
    <div className="bg-[#9d026d] text-white flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
            WatchParty
        </div>
        <div className="text-2xl font-bold">
            <IoIosSettings />
        </div>
    </div>
  );
};

export default TopBar;
