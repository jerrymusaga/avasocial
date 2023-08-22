import ArtWorks from "./components/Artworks"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navigation from "./components/Navigation"

const App = () => {
  return (
    <div className="min-h-screen">
    <div className="gradient-bg-hero">
      <Navigation />
      <Hero />
    </div>
    <ArtWorks />
    <Footer />

  </div>
  )
}

export default App
