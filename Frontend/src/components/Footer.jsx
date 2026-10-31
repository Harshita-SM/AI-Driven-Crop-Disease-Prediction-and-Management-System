import React from 'react'
import { Leaf } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Leaf size={20} color="#ffffff" />
            </div>
            <span className="footer-logo-text">
              CropCare <span>AI</span>
            </span>
          </div>
          <p className="footer-description">
            An AI-powered agricultural tool to help farmers detect crop diseases
            early and make smarter crop management decisions.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Disease Detection</a></li>
            <li><a href="#">Weather</a></li>
            <li><a href="#">History</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Information</h4>
          <ul>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} CropCare AI. All rights reserved. | College Project
        </p>
        <p className="footer-disclaimer">
          ⚠️ Disclaimer: AI-generated predictions are estimates only and should
          not replace professional agricultural or agronomical advice.
          Always consult a qualified expert for critical crop decisions.
        </p>
      </div>
    </footer>
  )
}

export default Footer
