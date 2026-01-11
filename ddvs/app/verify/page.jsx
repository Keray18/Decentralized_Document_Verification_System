import React, { useState } from 'react'
import { generateHash } from '../utils/hash';

const Verify = () => {
    const [file, setFile] = useState();

    const verify = async () => {
        const hash = await generateHash(file);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const constract = new ethers.constract
    }
  return (
    <div>
      
    </div>
  )
}

export default Verify
