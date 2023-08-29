import * as React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import { setGlobalState, useGlobalState, setLoadingMsg, truncate, setAlert } from '../store'
import Image from 'next/image'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork, 
  useSignMessage 
} from 'wagmi'
import { SiweMessage } from 'siwe'

export function MetaMask() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full'
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div> {setLoadingMsg(error.message)}</div>}
    </div>
  )
}


const Navigation = () => {
  
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const {signMessageAsync} = useSignMessage()

  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  const SignIn = async () => {
    try {
      const chainId = chain?.id
      const nonceRes = await fetch('api/nonce')
      const nonce = await nonceRes.text()

      if (!address || !chainId) return setAlert('No account or chain', 'red');

      setState((x) => ({ ...x, error: undefined, loading: true }));
      
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to AvaSocial.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
      
      const signature = await signMessageAsync({message: message.prepareMessage()})


      //Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')
      setState((x) => ({ ...x, error: undefined, loading: false }));
      //@ts-expect-error
    }catch(err: Error){
      setState((x) => ({...x, err}))
      
    }
    
  }

  const signOut = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setState({});
  };

  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {
        console.error(_error)
      }
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);


  return (
    <div className='w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto'>
        <div className='md:flex-[0.5] flex-initial justify-center items-center text-gradient text-5xl font-bold'>
            AvaSocial
        </div>
        
        <ul className='md:flex-[0.5] text-white md:flex hidden list-none justify-between items-center flex-initial'  >
            {
              isConnected && state.address ? (
                <>
                  <li className='mx-4 cursor-pointer'>Market</li>
                  <li className='mx-4 cursor-pointer'>Blog</li>
                  <li className='mx-4 cursor-pointer'>Token</li>
                  <Image src={ensAvatar} alt="ENS Avatar" />
                  <div>{ensName ? `${ensName} (${truncate(address, 4,4,11)})` : truncate(address, 4,4,11)}</div>
                  
                  <button onClick={signOut} className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full' >LogOut</button>
                  <button className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full' onClick={disconnect}>Disconnect</button>
                </>
              ) : (
                <>
                  <li className='mx-4 cursor-pointer'>Market</li>
                  <li className='mx-4 cursor-pointer'>Blog</li>
                  <li className='mx-4 cursor-pointer'>Token</li>
                  <button onClick={SignIn} className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xl p-2 rounded-full' >SIWE</button>
                  <MetaMask />
                </>
              )
              }
            
        </ul>
        
    </div>
  )
}

export default Navigation