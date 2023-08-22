import Hero from "./components/Hero"
import Navigation from "./components/Navigation"

const App = () => {
  return (
    <div className="min-h-screen">
    <div className="gradient-bg-hero">
      <Navigation />
      <Hero />
    </div>

  </div>
  )
}

export default App
