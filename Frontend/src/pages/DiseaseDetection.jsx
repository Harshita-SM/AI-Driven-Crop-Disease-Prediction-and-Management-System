import React, { useState } from 'react'
import {
  Upload,
  Brain,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Droplets,
  Thermometer,
  Layers,
  ArrowRight,
  BookmarkCheck
} from 'lucide-react'
import { CROP_DISEASES, CROPS_LIST } from '../data/cropDiseases'
import './DiseaseDetection.css'

function DiseaseDetection({ onSaveScan, onNavigateToWeather }) {
  const [selectedCrop, setSelectedCrop] = useState('Tomato')
  const [imagePreview, setImagePreview] = useState(CROP_DISEASES[0].sampleImage)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('organic')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Handle local file upload
  function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setResult(null)
        setSaveSuccess(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle sample image pick
  function handleSelectSample(sample) {
    setImagePreview(sample.sampleImage)
    setSelectedCrop(sample.crop)
    setResult(null)
    setSaveSuccess(false)
  }

  // Trigger simulated AI Analysis
  function runAnalysis() {
    setIsAnalyzing(true)
    setResult(null)
    setSaveSuccess(false)

    setTimeout(() => {
      // Find matching disease or pick relevant one
      const matching = CROP_DISEASES.find(
        (d) => d.crop.toLowerCase() === selectedCrop.toLowerCase() && d.sampleImage === imagePreview
      ) || CROP_DISEASES.find(
        (d) => d.crop.toLowerCase() === selectedCrop.toLowerCase()
      ) || CROP_DISEASES[0]

      setResult(matching)
      setIsAnalyzing(false)
    }, 1200)
  }

  // Save scan to scan history
  function handleSave() {
    if (!result) return
    const scanItem = {
      id: Date.now().toString(),
      crop: result.crop,
      diseaseName: result.diseaseName,
      status: result.status,
      severity: result.severity,
      confidence: result.confidence,
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      imageUrl: imagePreview
    }
    if (onSaveScan) {
      onSaveScan(scanItem)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  return (
    <div className="detection-page section">
      <div className="container">
        {/* Header */}
        <div className="detection-header">
          <span className="badge-pill">
            <Brain size={16} /> AI Diagnostic Engine
          </span>
          <h1 className="section-title">AI Crop Disease Detection</h1>
          <p className="section-subtitle">
            Upload an image of your crop leaf or choose a sample to analyze visible
            symptoms, identify plant pathogens, and get treatment recommendations.
          </p>
        </div>

        <div className="detection-grid">
          {/* Left: Input & Image Upload */}
          <div className="input-card">
            <h3>1. Select Crop & Upload Leaf Image</h3>

            <div className="form-group">
              <label htmlFor="crop-select">Select Crop Variety</label>
              <select
                id="crop-select"
                value={selectedCrop}
                onChange={(e) => {
                  setSelectedCrop(e.target.value)
                  setResult(null)
                }}
                className="crop-dropdown"
              >
                {CROPS_LIST.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Box */}
            <div className="upload-dropzone">
              {imagePreview ? (
                <div className="image-preview-wrapper">
                  <img
                    src={imagePreview}
                    alt="Uploaded crop leaf"
                    className="preview-img"
                  />
                  <div className="image-overlay">
                    <label className="btn-secondary change-img-btn">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <Upload size={38} className="upload-icon" />
                  <span className="upload-title">Click to upload or drag leaf image</span>
                  <span className="upload-hint">Supports JPG, PNG, WEBP (Max 10MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              )}
            </div>

            {/* Quick Sample Selector */}
            <div className="sample-strip">
              <span className="sample-label">Or quick-test with samples:</span>
              <div className="sample-buttons">
                {CROP_DISEASES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`sample-pill ${
                      imagePreview === sample.sampleImage ? 'active' : ''
                    }`}
                  >
                    {sample.crop}: {sample.status === 'Healthy' ? 'Healthy' : sample.diseaseName.split(' ').slice(1).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze CTA */}
            <button
              className="btn-primary analyze-btn"
              onClick={runAnalysis}
              disabled={isAnalyzing || !imagePreview}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="spinner-icon" />
                  Running AI Analysis...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze Crop Leaf Now
                </>
              )}
            </button>
          </div>

          {/* Right: Results or Instructions */}
          <div className="results-container">
            {isAnalyzing && (
              <div className="analyzing-state">
                <div className="ai-loader">
                  <div className="scanner-line"></div>
                </div>
                <h3>Processing Image Features...</h3>
                <p>Applying Deep Neural Network convolutional filters for pathology identification.</p>
              </div>
            )}

            {!isAnalyzing && !result && (
              <div className="empty-state">
                <div className="empty-icon-box">
                  <Layers size={44} color="#2d8a56" />
                </div>
                <h3>Ready for Diagnosis</h3>
                <p>
                  Select your crop, upload a leaf photo, and click <strong>"Analyze Crop Leaf Now"</strong>.
                  Our trained AI model will detect potential diseases, calculate confidence ratings, and generate management advisories.
                </p>
                <div className="tips-box">
                  <h4>💡 Photography Tips for Best Accuracy:</h4>
                  <ul>
                    <li>Capture a clear, well-lit photo of the affected leaf surface.</li>
                    <li>Avoid blurry or heavily shadowed angles.</li>
                    <li>Ensure visible spots, discoloration, or lesions are centered.</li>
                  </ul>
                </div>
              </div>
            )}

            {!isAnalyzing && result && (
              <div className="diagnosis-result-card">
                {/* Result Top Banner */}
                <div className={`status-banner ${result.status.toLowerCase()}`}>
                  <div className="status-header-text">
                    <div className="status-tag-row">
                      <span className={`status-tag ${result.status.toLowerCase()}`}>
                        {result.status === 'Healthy' ? (
                          <><CheckCircle2 size={16} /> Healthy Crop</>
                        ) : (
                          <><AlertTriangle size={16} /> Disease Detected</>
                        )}
                      </span>
                      <span className={`severity-tag severity-${result.severity.toLowerCase()}`}>
                        {result.severity} Severity
                      </span>
                    </div>
                    <h2 className="disease-title">{result.diseaseName}</h2>
                    <p className="scientific-name"><em>Pathogen: {result.scientificName}</em></p>
                  </div>

                  <div className="confidence-badge">
                    <span className="conf-value">{result.confidence}%</span>
                    <span className="conf-label">Confidence</span>
                  </div>
                </div>

                {/* Description */}
                <p className="result-description">{result.description}</p>

                {/* Environmental triggers */}
                <div className="env-triggers">
                  <div className="env-item">
                    <Thermometer size={18} color="#2d8a56" />
                    <div>
                      <strong>Favorable Temp:</strong> {result.favorableConditions.temperature}
                    </div>
                  </div>
                  <div className="env-item">
                    <Droplets size={18} color="#2d8a56" />
                    <div>
                      <strong>Favorable Humidity:</strong> {result.favorableConditions.humidity}
                    </div>
                  </div>
                </div>

                {/* Symptoms list */}
                <div className="symptoms-section">
                  <h4>Identified Symptoms & Visual Markers</h4>
                  <ul className="symptoms-list">
                    {result.symptoms.map((symptom, idx) => (
                      <li key={idx}>
                        <span className="bullet-dot"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment Recommendations Tabs */}
                <div className="recommendations-box">
                  <div className="rec-tabs">
                    <button
                      className={`rec-tab ${activeTab === 'organic' ? 'active' : ''}`}
                      onClick={() => setActiveTab('organic')}
                    >
                      🌿 Organic Management
                    </button>
                    <button
                      className={`rec-tab ${activeTab === 'chemical' ? 'active' : ''}`}
                      onClick={() => setActiveTab('chemical')}
                    >
                      🧪 Chemical Control
                    </button>
                    <button
                      className={`rec-tab ${activeTab === 'prevention' ? 'active' : ''}`}
                      onClick={() => setActiveTab('prevention')}
                    >
                      🛡️ Preventive Practices
                    </button>
                  </div>

                  <div className="rec-content">
                    {activeTab === 'organic' && (
                      <ul>
                        {result.organicTreatment.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'chemical' && (
                      <ul>
                        {result.chemicalTreatment.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'prevention' && (
                      <ul>
                        {result.preventiveMeasures.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="results-actions">
                  <button
                    className={`btn-primary save-btn ${saveSuccess ? 'saved' : ''}`}
                    onClick={handleSave}
                  >
                    <BookmarkCheck size={18} />
                    {saveSuccess ? 'Saved to History!' : 'Save Scan to History'}
                  </button>

                  {onNavigateToWeather && (
                    <button
                      className="btn-secondary weather-link-btn"
                      onClick={onNavigateToWeather}
                    >
                      Check Weather Risk <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiseaseDetection
