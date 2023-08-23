import ArtWorks from "./components/Artworks"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import MintNFT from "./components/MintNFT"
import Navigation from "./components/Navigation"
import NFTDetails from "./components/NFTDetails"

const App = () => {
  return (
    <div className="min-h-screen">
    <div className="gradient-bg-hero">
      <Navigation />
      <Hero />
    </div>
    <ArtWorks />
    <Footer />
    <MintNFT />
    <NFTDetails />

  </div>
  )
}

export default App
