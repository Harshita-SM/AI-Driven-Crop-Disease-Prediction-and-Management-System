import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DiseaseDetection from './pages/DiseaseDetection'
import WeatherAnalysis from './pages/WeatherAnalysis'
import ScanHistory from './pages/ScanHistory'
import AboutProject from './pages/AboutProject'

const INITIAL_SCANS = [
  {
    id: 'scan-1',
    crop: 'Tomato',
    diseaseName: 'Tomato Early Blight',
    status: 'Infected',
    severity: 'Moderate',
    confidence: 96.4,
    timestamp: 'Oct 30, 2026, 09:40 AM',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?w=600&q=80'
  },
  {
    id: 'scan-2',
    crop: 'Potato',
    diseaseName: 'Potato Late Blight',
    status: 'Infected',
    severity: 'High',
    confidence: 98.2,
    timestamp: 'Oct 28, 2026, 03:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80'
  },
  {
    id: 'scan-3',
    crop: 'Tomato',
    diseaseName: 'Healthy Crop Foliage',
    status: 'Healthy',
    severity: 'None',
    confidence: 99.1,
    timestamp: 'Oct 26, 2026, 11:20 AM',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&q=80'
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [scans, setScans] = useState(() => {
    try {
      const saved = localStorage.getItem('cropcare_scans')
      return saved ? JSON.parse(saved) : INITIAL_SCANS
    } catch {
      return INITIAL_SCANS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cropcare_scans', JSON.stringify(scans))
    } catch (e) {
      console.error('Failed to save to localStorage', e)
    }
  }, [scans])

  function handleSaveScan(newScan) {
    setScans((prev) => [newScan, ...prev])
  }

  function handleClearHistory() {
    setScans([])
  }

  function handleNavigate(tab) {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={handleNavigate} />
      <main>
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'detection' && (
          <DiseaseDetection
            onSaveScan={handleSaveScan}
            onNavigateToWeather={() => handleNavigate('weather')}
          />
        )}
        {activeTab === 'weather' && (
          <WeatherAnalysis
            onNavigateToDetection={() => handleNavigate('detection')}
          />
        )}
        {activeTab === 'history' && (
          <ScanHistory
            scans={scans}
            onClearHistory={handleClearHistory}
            onNavigateToDetection={() => handleNavigate('detection')}
          />
        )}
        {activeTab === 'about' && (
          <AboutProject
            onNavigateToDetection={() => handleNavigate('detection')}
          />
        )}
      </main>
      <Footer setActiveTab={handleNavigate} />
    </div>
  )
}

export default App
