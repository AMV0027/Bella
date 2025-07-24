import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'

function TextInput() {
  const [message, setMessage] = useState('');
  const handleSend = () => {
    console.log(message);
  }
  return (
    <div className='z-10 w-full min-h-20 flex flex-row gap-2 items-center justify-between absolute bottom-0 left-0 px-2'>
      <textarea
        type="text"
        className='w-full h-15 bg-zinc-800 p-1 resize-none rounded-md'
        placeholder='Bella is always here to help you...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='p-2 bg-blue-500 rounded-md h-15 text-md ' onClick={handleSend}>
        <BiSend />
      </button>
    </div>
  )
}

export default TextInput
