import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bellaIcon from '../../assets/icon.webp'
import { MdEmail } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { initFirebaseAuth } from '../../config/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

function Login() {
  const [loginMethod, setLoginMethod] = useState('email') // 'email', 'google'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const session = localStorage.getItem('sessionKey')
    if (session === 'bella-session') {
      navigate('/bella')
    }
  }, [navigate])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { auth } = await initFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('sessionKey', 'bella-session')
      navigate('/bella')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const { auth } = await initFirebaseAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      localStorage.setItem('sessionKey', 'bella-session')
      navigate('/bella')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-4" style={{ maxWidth: 400, margin: '0 auto' }}>
      {/* Bella Icon */}
      <img src={bellaIcon} alt="Bella Icon" className="w-[250px] h-[250px]  rounded-full object-contain select-none" />
      <h1 className="text-3xl font-bold mb-2 tracking-wide">Welcome Back</h1>
      <p className="text-gray-400 mb-4 text-center">Sign in to continue to Bella</p>
      {/* Login Method Switcher */}
      <div className="flex justify-center gap-4 w-full mb-8">
        <button
          type="button"
          className={`bg-zinc-900 p-3 rounded-full shadow hover:bg-zinc-800 transition-all flex items-center justify-center ${loginMethod === 'email' ? 'ring-2 ring-purple-500' : ''}`}
          onClick={() => setLoginMethod('email')}
          aria-label="Login with Email"
        >
          <MdEmail className="w-7 h-7 text-white" />
        </button>
        <button
          type="button"
          className={`bg-zinc-900 p-3 rounded-full shadow hover:bg-zinc-800 transition-all flex items-center justify-center ${loginMethod === 'google' ? 'ring-2 ring-purple-500' : ''}`}
          onClick={() => setLoginMethod('google')}
          aria-label="Login with Google"
        >
          <FcGoogle className="w-7 h-7" />
        </button>
      </div>
      {/* Login Form or Placeholder */}
      {loginMethod === 'email' && (
        <form className="w-full flex flex-col gap-4 mb-6" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-zinc-900 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-zinc-900 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition-all"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
      {loginMethod === 'google' && (
        <div className="w-full flex flex-col items-center mb-6">
          <button
            type="button"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition-all w-full rounded-lg"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue with Google'}
          </button>
          {error && <div className="text-red-400 text-sm text-center mt-2">{error}</div>}
        </div>
      )}
      <p className="text-gray-500 text-sm mb-4">Don't have an account? <span className="text-purple-400 underline">Sign up</span></p>
    </div>
  )
}

export default Login
