import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SilkWavePage from "./pages/components/SilkWave"
import OrbitButtonPage from "./pages/components/OrbitButton"
import ScrollIndicatorPage from "./pages/components/ScrollIndicator"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components/silk-wave" element={<SilkWavePage />} />
        <Route path="/components/orbit-button" element={<OrbitButtonPage />} />
        <Route
          path="/components/scroll-indicator"
          element={<ScrollIndicatorPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}
