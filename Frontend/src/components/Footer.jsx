import React from 'react'
import { Leaf } from 'lucide-react'
import './Footer.css'

function Footer({ setActiveTab }) {
  const currentYear = new Date().getFullYear()

  function handleNavigate(tab) {
    if (setActiveTab) {
      setActiveTab(tab)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div
            className="footer-logo"
            onClick={() => handleNavigate('home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="footer-logo-icon">
              <Leaf size={20} color="#ffffff" />
            </div>
            <span className="footer-logo-text">
              CropCare <span>AI</span>
            </span>
          </div>
          <p className="footer-description">
            An AI-powered agricultural tool to help farmers detect crop diseases
            early, assess weather risks, and make smarter crop management decisions.
          </p>
        </div>

        <div className="footer-section">
          <h4>Platform Navigation</h4>
          <ul>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('detection')}
              >
                Disease Detection
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('weather')}
              >
                Weather & Disease Risk
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('history')}
              >
                Scan History
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('about')}
              >
                About ICAR Initiative
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Agricultural Intelligence</h4>
          <ul>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('detection')}
              >
                Leaf Pathology Analysis
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('weather')}
              >
                Outbreak Warning Thresholds
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('about')}
              >
                CNN Deep Learning Model
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => handleNavigate('about')}
              >
                IPM Guidance Protocols
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} CropCare AI. Proposed by Ministry of Agriculture & ICAR.
        </p>
        <p className="footer-disclaimer">
          ⚠️ Disclaimer: AI-generated predictions are diagnostic estimates and should
          not replace verified lab assays or direct field consultations with qualified agronomists.
        </p>
      </div>
    </footer>
  )
}

export default Footer
