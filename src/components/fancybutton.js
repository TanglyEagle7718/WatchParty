import { RiAddFill, RiDeleteBinFill } from 'react-icons/ri';

function FancyButton({streamer}) {
  return (
    <button className="flex items-center justify-between p-3 bg-[#9d026d] text-white rounded-lg hover:bg-[#e3029c] transition duration-300">
      <span className="mr-3">{streamer}</span>
      
      <div className="flex space-x-2">
        <RiAddFill className="text-2xl cursor-pointer hover:text-green-400 transition duration-300" />
        <RiDeleteBinFill className="text-2xl cursor-pointer hover:text-red-400 transition duration-300" />
      </div>
    </button>
  );
}

export default FancyButton;
