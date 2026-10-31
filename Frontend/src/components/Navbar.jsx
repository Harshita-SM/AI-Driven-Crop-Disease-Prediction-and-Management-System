import React, { useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <div className="logo-icon">
            <Leaf size={22} color="#ffffff" />
          </div>
          <span className="logo-text">
            CropCare <span>AI</span>
          </span>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#" className="active" onClick={closeMenu}>Home</a></li>
          <li><a href="#" onClick={closeMenu}>Disease Detection</a></li>
          <li><a href="#" onClick={closeMenu}>Weather</a></li>
          <li><a href="#" onClick={closeMenu}>History</a></li>
          <li><a href="#" onClick={closeMenu}>About</a></li>
        </ul>

        <a href="#hero" className="btn-primary navbar-btn">
          Get Started
        </a>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
