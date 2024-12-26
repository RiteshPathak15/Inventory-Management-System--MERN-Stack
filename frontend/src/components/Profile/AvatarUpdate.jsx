import React from 'react';

const AvatarUpdate = ({ handleFileChange, handleAvatarUpdate }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border rounded-lg"
      />
      <button
        onClick={handleAvatarUpdate}
        className="w-full p-2 bg-blue-500 text-white rounded-lg mt-2"
      >
        Update Avatar
      </button>
    </div>
  );
};

export default AvatarUpdate;
