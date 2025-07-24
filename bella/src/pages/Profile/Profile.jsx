import React from 'react';
import Header from '../../components/Header/Header'

function Profile() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-gray-400">This is your profile page.</p>
    </div>
  );
}

export default Profile; 