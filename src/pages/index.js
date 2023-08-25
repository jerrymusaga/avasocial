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


const Home = () => {
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
    <UpdateNFT />
    <ReactionsModal />
    <Loading />
    <Alert />

  </div>
  )
}

export default Home
