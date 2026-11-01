import React, { useState } from 'react'
import { Leaf, Menu, X, Sparkles } from 'lucide-react'
import './Navbar.css'

function Navbar({ activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  function handleNavClick(tab) {
    if (setActiveTab) {
      setActiveTab(tab)
    }
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className="navbar-logo"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
        >
          <div className="logo-icon">
            <Leaf size={22} color="#ffffff" />
          </div>
          <span className="logo-text">
            CropCare <span>AI</span>
          </span>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === 'detection' ? 'active' : ''}`}
              onClick={() => handleNavClick('detection')}
            >
              Disease Detection
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === 'weather' ? 'active' : ''}`}
              onClick={() => handleNavClick('weather')}
            >
              Weather & Risks
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => handleNavClick('history')}
            >
              History
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="btn-primary navbar-btn"
          onClick={() => handleNavClick('detection')}
        >
          <Sparkles size={16} />
          <span>Get Started</span>
        </button>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
