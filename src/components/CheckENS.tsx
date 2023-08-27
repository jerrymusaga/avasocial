import { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import * as React from 'react';
import Image from 'next/image';

import { ethers } from 'ethers';



const CheckENS = async () => {
    const [address, setAddress] = useState('')

    const [checkENS] = useGlobalState('checkENSModal')

    const provider = new ethers.providers.EtherscanProvider()
    const _address = '0x9297A132AF2A1481441AB8dc1Ce6e243d879eaFD'

    const ensName = await provider.lookupAddress(_address)
    console.log({ensName})
    const ensAvatarUrl = await provider.getAvatar(ensName)
    console.log(ensName)
    const ensResolver = await provider.getResolver(ensName)
    // You can fetch any key stored in their ENS profile.
    const twitterHandle = await ensResolver.getText('com.twitter')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!address) return;
        setAddress(e.target.value)
        cancelModal()
    }

    const resetForm = () => {
        setAddress('')
    }

    const cancelModal = () => {
        setGlobalState('checkENSModal', 'scale-0')
        resetForm()
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${checkENS}`}>
        <div className='bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex justify-between items-center text-gray-400'>
                    <p className='font-semibold '>Enter an address and check ENS availability</p>
                    <button type='button' className='border-0 bg-transparent focus:outline-none'>
                        <FaTimes onClick={cancelModal}/>
                    </button>
                </div>
     
                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <input className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0' type='text' name='ens'  placeholder='Enter wallet address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                
                <button  className='flex justify-center items-center w-full shadow-lg shadow-black text-white mt-5 font-bold bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2'>Check ENS availability</button>
            </form>
        </div>
    </div>
  )
}

export default CheckENS