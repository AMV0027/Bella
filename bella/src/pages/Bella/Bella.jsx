import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import TextInput from './components/TextInput/TextInput';
import VoiceInput from './components/VoiceInput/VoiceInput';

function Bella() {
  const [switchChat, setSwitchChat] = useState(true);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-black text-white px-4" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Header switchChat={switchChat} setSwitchChat={setSwitchChat} />
      
      {switchChat ? <TextInput /> : <VoiceInput />}
    </div>
  )
}

export default Bella
