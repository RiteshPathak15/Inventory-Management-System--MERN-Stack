import React from 'react';

const ProfileInfo = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={user.avatar || "https://via.placeholder.com/150"} // Placeholder URL for a default avatar
        alt="Avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <p className="text-2xl font-bold">{user.fullname}</p>
      <p className="text-xl text-gray-500">@{user.username}</p>
    </div>
  );
};

export default ProfileInfo;
