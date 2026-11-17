import React, { useState } from 'react'
import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  MapPin,
  TrendingUp,
  Info,
  ArrowRight
} from 'lucide-react'
import './WeatherAnalysis.css'

const REGIONS_DATA = {
  punjab: {
    name: 'Punjab (Ludhiana Belt)',
    crops: 'Wheat, Rice, Maize',
    temp: 26,
    humidity: 78,
    rainfall: '14 mm',
    wind: '12 km/h',
    soilMoisture: '65%',
    overallRisk: 'High',
    riskScore: 76,
    alerts: [
      {
        disease: 'Wheat Yellow/Stripe Rust',
        crop: 'Wheat',
        risk: 'High',
        reason: 'Cool morning temperatures (12-16°C) and persistent dew trigger spore dispersal.'
      },
      {
        disease: 'Rice Bacterial Leaf Blight',
        crop: 'Rice',
        risk: 'Moderate',
        reason: 'Elevated humidity combined with moderate wind can spread bacteria through leaf wounds.'
      },
      {
        disease: 'Powdery Mildew',
        crop: 'Legumes / Vegetables',
        risk: 'Low',
        reason: 'Current moisture exceeds optimal dry-air dispersal for powdery mildew.'
      }
    ],
    advisory: 'Postpone nitrogen top-dressing during heavy moisture. Apply preventive Mancozeb or Propiconazole spray during calm morning hours.'
  },
  maharashtra: {
    name: 'Maharashtra (Nashik Belt)',
    crops: 'Tomato, Grape, Onion',
    temp: 29,
    humidity: 84,
    rainfall: '28 mm',
    wind: '18 km/h',
    soilMoisture: '78%',
    overallRisk: 'Critical',
    riskScore: 88,
    alerts: [
      {
        disease: 'Tomato & Potato Late Blight',
        crop: 'Tomato, Potato',
        risk: 'Critical',
        reason: 'Continuous leaf wetness for >10 hours with 84% humidity accelerates Phytophthora zoospores.'
      },
      {
        disease: 'Grape Downy Mildew',
        crop: 'Grape',
        risk: 'High',
        reason: 'Warm humid nights favor oil-spot formation on young vine clusters.'
      },
      {
        disease: 'Onion Purple Blotch',
        crop: 'Onion',
        risk: 'Moderate',
        reason: 'Splashing rain facilitates soil-borne fungal spores lodging into onion leaf folds.'
      }
    ],
    advisory: 'Immediate systemic fungicide application recommended (Metalaxyl or Dimethomorph). Improve field drainage to avoid root hypoxia.'
  },
  uttar_pradesh: {
    name: 'Uttar Pradesh (Varanasi / Eastern Plains)',
    crops: 'Potato, Mustard, Tomato',
    temp: 23,
    humidity: 62,
    rainfall: '0 mm',
    wind: '8 km/h',
    soilMoisture: '48%',
    overallRisk: 'Moderate',
    riskScore: 52,
    alerts: [
      {
        disease: 'Early Blight (Alternaria)',
        crop: 'Potato, Tomato',
        risk: 'Moderate',
        reason: 'Warm days with cooler dry nights promote Alternaria target-spot lesion expansion.'
      },
      {
        disease: 'White Rust',
        crop: 'Mustard',
        risk: 'Moderate',
        reason: 'Moderate relative humidity supports white blister pustule formation on leaves.'
      },
      {
        disease: 'Bacterial Wilt',
        crop: 'Solanaceous vegetables',
        risk: 'Low',
        reason: 'Current soil moisture levels are below critical saturated threshold.'
      }
    ],
    advisory: 'Maintain scheduled drip irrigation. Inspect lower canopy foliage for early target lesions.'
  },
  karnataka: {
    name: 'Karnataka (Bengaluru Rural / Kolar)',
    crops: 'Tomato, Capsicum, Maize',
    temp: 27,
    humidity: 55,
    rainfall: '2 mm',
    wind: '15 km/h',
    soilMoisture: '52%',
    overallRisk: 'Low',
    riskScore: 34,
    alerts: [
      {
        disease: 'Corn Common Rust',
        crop: 'Maize',
        risk: 'Low',
        reason: 'Moderate temperature and low rainfall limit rust spore germination.'
      },
      {
        disease: 'Tomato Leaf Curl Virus',
        crop: 'Tomato',
        risk: 'Moderate',
        reason: 'Warm and dry breeze favors whitefly vector migration between crop plots.'
      },
      {
        disease: 'Damping Off',
        crop: 'Nursery seedlings',
        risk: 'Low',
        reason: 'Adequate soil aeration and absence of waterlogging.'
      }
    ],
    advisory: 'Favorable spraying window available. Monitor yellow sticky traps for insect pest vectors.'
  }
}

function WeatherAnalysis({ onNavigateToDetection }) {
  const [selectedKey, setSelectedKey] = useState('maharashtra')
  const current = REGIONS_DATA[selectedKey]

  return (
    <div className="weather-page section">
      <div className="container">
        {/* Header */}
        <div className="weather-header">
          <span className="badge-pill">
            <CloudSun size={16} /> Environmental Intelligence
          </span>
          <h1 className="section-title">Weather & Disease Risk Assessment</h1>
          <p className="section-subtitle">
            Environmental factors like temperature, humidity, and rainfall directly determine
            plant pathogen incubation. Monitor regional risks to protect your harvest early.
          </p>
        </div>

        {/* Region Selector Bar */}
        <div className="region-selector-bar">
          <div className="selector-label">
            <MapPin size={20} color="#2d8a56" />
            <span>Select Agricultural Zone:</span>
          </div>
          <div className="region-buttons">
            {Object.keys(REGIONS_DATA).map((key) => (
              <button
                key={key}
                type="button"
                className={`region-btn ${selectedKey === key ? 'active' : ''}`}
                onClick={() => setSelectedKey(key)}
              >
                {REGIONS_DATA[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Top Cards: Weather Metrics */}
        <div className="weather-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon temp-icon">
              <Thermometer size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Temperature</span>
              <strong className="metric-value">{current.temp}°C</strong>
              <span className="metric-sub">Optimal crop range</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon humidity-icon">
              <Droplets size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Relative Humidity</span>
              <strong className="metric-value">{current.humidity}%</strong>
              <span className={`metric-sub ${current.humidity > 80 ? 'sub-danger' : ''}`}>
                {current.humidity > 80 ? '⚠️ High fungal risk' : 'Moderate range'}
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon rain-icon">
              <CloudSun size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Rainfall (24h)</span>
              <strong className="metric-value">{current.rainfall}</strong>
              <span className="metric-sub">Precipitation level</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon wind-icon">
              <Wind size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Wind Speed</span>
              <strong className="metric-value">{current.wind}</strong>
              <span className="metric-sub">Spore drift rate</span>
            </div>
          </div>
        </div>

        {/* Risk Assessment Summary Section */}
        <div className="risk-overview-card">
          <div className="risk-overview-header">
            <div className="risk-title-group">
              <ShieldAlert size={28} color={current.riskScore > 75 ? '#dc2626' : current.riskScore > 45 ? '#d97706' : '#16a34a'} />
              <div>
                <h2>{current.name} Disease Risk Level: <span className={`risk-badge-text ${current.overallRisk.toLowerCase()}`}>{current.overallRisk}</span></h2>
                <p className="primary-crops">Primary Crops in Zone: <strong>{current.crops}</strong></p>
              </div>
            </div>

            <div className="risk-score-gauge">
              <div className="gauge-number">{current.riskScore}<span>/100</span></div>
              <span className="gauge-label">Outbreak Risk Index</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="risk-progress-bar-bg">
            <div
              className={`risk-progress-bar-fill ${current.overallRisk.toLowerCase()}`}
              style={{ width: `${current.riskScore}%` }}
            ></div>
          </div>

          {/* Agricultural Advisory */}
          <div className="advisory-box">
            <div className="advisory-icon">
              <Info size={22} color="#1a5c38" />
            </div>
            <div className="advisory-text">
              <strong>Agronomist Advisory for {current.name}:</strong>
              <p>{current.advisory}</p>
            </div>
          </div>
        </div>

        {/* Detailed Alerts Table */}
        <div className="alerts-section">
          <h3 className="section-subheading">Crop-Specific Outbreak Vulnerabilities</h3>
          <div className="alerts-grid">
            {current.alerts.map((alert, index) => (
              <div key={index} className={`alert-card risk-${alert.risk.toLowerCase()}`}>
                <div className="alert-card-top">
                  <div>
                    <span className="alert-crop-badge">{alert.crop}</span>
                    <h4 className="alert-disease-name">{alert.disease}</h4>
                  </div>
                  <span className={`risk-status-pill pill-${alert.risk.toLowerCase()}`}>
                    {alert.risk === 'Critical' || alert.risk === 'High' ? (
                      <AlertTriangle size={14} />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    {alert.risk} Risk
                  </span>
                </div>
                <p className="alert-reason">{alert.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Disease Detection */}
        <div className="weather-cta-box">
          <div className="cta-content">
            <h3>Noticed suspicious spots on your crops in this region?</h3>
            <p>Upload a leaf photo directly to our AI model to verify whether infection has already taken hold.</p>
          </div>
          <button
            className="btn-primary weather-cta-btn"
            onClick={onNavigateToDetection}
          >
            Launch Disease Detection <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeatherAnalysis
