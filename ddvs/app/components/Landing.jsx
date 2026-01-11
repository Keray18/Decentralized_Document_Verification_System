'use client'

import React, { useState } from 'react'
import { ethers } from 'ethers';
import Link from 'next/link';


const Landing = () => {
  const [address, setAddress] = useState('');
  const connectWallet = async () => {
    if(!window.ethereum) {
      alert('Please install a wallet extention like MetaMask.');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAddress(await signer.getAddress());
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Decentralized Document Verifier
      </h1>
      <button 
        onClick={connectWallet} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
      >
        Connect Wallet
      </button>
      {address && <p className="text-lg text-gray-300 mb-6">Connected: <span className="font-mono text-blue-300">{address}</span></p>}
      <div className="flex space-x-6 text-lg">
        <Link href="/upload" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out">
          Upload
        </Link>
        <span className="text-gray-500">|</span>
        <Link href="/verify" className="text-purple-400 hover:text-purple-300 transition duration-300 ease-in-out">
          Verify
        </Link>
      </div>
    </div>
  )
}

export default Landing
