import * as React from 'react';
import Alert from "../components/Alert"
import ArtWorks from "../components/Artworks"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Loading from "../components/Loading"
import MintNFT from "../components/MintNFT"
import Navigation from "../components/Navigation"
import NFTDetails from "../components/NFTDetails"
import ReactionsModal from "../components/ReactionsModal"
import UpdateNFT from "../components/UpdateNFT"
import CheckENS from "../components/CheckENS"

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import {infuraProvider} from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { avalancheFuji } from 'wagmi/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, avalancheFuji],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY}), publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})
 

const Home = () => {
  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen">
        <div className="gradient-bg-hero">
          <Navigation />
          <Hero />
        </div>
        <ArtWorks />
        <Footer />
        <MintNFT />
        <NFTDetails />
        <UpdateNFT />
        <ReactionsModal />
        <Loading />
        {/* <CheckENS /> */}
        <Alert />
        

     </div>
    </WagmiConfig>
   
  )
}

export default Home
