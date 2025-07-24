import React, { useState } from 'react';
import { BiChat, BiMicrophone, BiUser, BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


function Header({ switchChat, setSwitchChat }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const drawerOptions = [
    { label: 'Bella V2', onClick: () => { setDrawerOpen(false); navigate('/bella'); } },
    { label: 'Profile', onClick: () => { setDrawerOpen(false); navigate('/profile'); } },
    { label: 'AI Settings', onClick: () => { setDrawerOpen(false); navigate('/ai-settings'); } },
    { label: 'About & Support', onClick: () => { setDrawerOpen(false); navigate('/support-project'); } },
  ];
  return (
    <div>
      <div className={`absolute top-0 left-0 w-full h-12 flex items-center ${window.location.pathname === '/bella' ? "justify-between" : "justify-end"} px-4 py-2`}>
        {window.location.pathname === '/bella' && (
          <button onClick={() => setSwitchChat(!switchChat)} className='h-full p-1 bg-zinc-800 rounded-md px-4 flex items-center gap-2  hover:bg-zinc-700 transition-colors'>
            {switchChat ? <BiChat /> : <BiMicrophone />}
            {switchChat ? 'Text Chat' : 'Voice Chat'}
          </button>
        )}
        <button
          className='p-1 bg-zinc-800 rounded-md px-4 flex items-center gap-2 h-full hover:bg-zinc-700 transition-colors'
          onClick={() => setDrawerOpen(true)}
        >
          <BiMenu size={20} />
        </button>
      </div>
      {/* Drawer Overlay */}
      {
        drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm bg-opacity-40 transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />
        )
      }
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: '80vw' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col h-full p-6 gap-4">
          <div className="text-lg font-bold mb-4">Menu</div>
          {drawerOptions.map(opt => (
            <button
              key={opt.label}
              className="text-left py-2 px-3 rounded hover:bg-zinc-800 transition-colors text-white"
              onClick={opt.onClick}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
