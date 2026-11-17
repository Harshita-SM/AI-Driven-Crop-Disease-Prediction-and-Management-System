


import React, { useState } from 'react'
import {
  Upload,
  Brain,
  CheckCircle2,
  AlertTriangle,
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

const DISEASE_MAP = {
  Apple_Scab: 'apple-scab',
  apple_black_rot: 'apple-black-rot',
  Corn_sercospora: 'corn-cercospora',
  Grape_balck_rot: 'grape-black-rot',
  Peach_bacterial_spot: 'peach-bacterial-spot',
  potato_early_blight: 'potato-early-blight',
  potato_late_blight: 'potato-late-blight',
  Strawberry_leaf_scorch: 'strawberry-leaf-scorch',
  tomato_bacterial_spot: 'tomato-bacterial-spot',
  Tomato_mosaic_virus: 'tomato-mosaic-virus'
}

function DiseaseDetection({ onSaveScan, onNavigateToWeather }) {
  const [selectedCrop, setSelectedCrop] = useState('Tomato')
  const [imagePreview, setImagePreview] = useState(
    CROP_DISEASES.find((disease) => disease.sampleImage)?.sampleImage || ''
  )
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('organic')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleImageUpload(event) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must not exceed 5 MB.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
    }

    reader.onerror = () => {
      setError('Could not read the selected image.')
    }

    setSelectedFile(file)
    setResult(null)
    setError('')
    setSaveSuccess(false)

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function handleSelectSample(sample) {
    setImagePreview(sample.sampleImage)
    setSelectedCrop(sample.crop)
    setSelectedFile(null)
    setResult(null)
    setError('')
    setSaveSuccess(false)
  }

  async function runAnalysis() {
    if (!selectedFile) {
      setError(
        'Please upload a leaf image before analyzing. Sample images cannot be sent to the prediction API yet.'
      )
      return
    }

    setIsAnalyzing(true)
    setResult(null)
    setError('')
    setSaveSuccess(false)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch(
        'http://localhost:5002/api/predict',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Prediction failed.')
      }

      const diseaseId = DISEASE_MAP[data.disease]

      if (!diseaseId) {
        throw new Error(
          `The model returned an unrecognized class: "${data.disease}".`
        )
      }

      const matchingDisease = CROP_DISEASES.find(
        (disease) => disease.id === diseaseId
      )

      if (!matchingDisease) {
        throw new Error(
          `Disease information is missing for "${data.disease}". Check cropDiseases.js.`
        )
      }

      setSelectedCrop(matchingDisease.crop)

      setResult({
        ...matchingDisease,
        confidence: data.confidence
      })
    } catch (err) {
      setError(
        err.message ||
          'Unable to connect to the backend. Check that the server is running on port 5002.'
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  function handleSave() {
    if (!result || !onSaveScan) return

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

    onSaveScan(scanItem)
    setSaveSuccess(true)

    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  return (
    <div className="detection-page section">
      <div className="container">
        <div className="detection-header">
          <span className="badge-pill">
            <Brain size={16} /> AI Diagnostic Engine
          </span>

          <h1 className="section-title">
            AI Crop Disease Detection
          </h1>

          <p className="section-subtitle">
            Upload an image of your crop leaf to identify potential
            plant diseases and view management recommendations.
          </p>
        </div>

        <div className="detection-grid">
          <div className="input-card">
            <h3>1. Select Crop & Upload Leaf Image</h3>

            <div className="form-group">
              <label htmlFor="crop-select">
                Select Crop Variety
              </label>

              <select
                id="crop-select"
                value={selectedCrop}
                onChange={(event) => {
                  setSelectedCrop(event.target.value)
                  setResult(null)
                  setError('')
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

            <div className="upload-dropzone">
              {imagePreview ? (
                <div className="image-preview-wrapper">
                  <img
                    src={imagePreview}
                    alt="Selected crop leaf"
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

                  <span className="upload-title">
                    Click to upload a leaf image
                  </span>

                  <span className="upload-hint">
                    Supports images up to 5 MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              )}
            </div>

            <div className="sample-strip">
              <span className="sample-label">
                Or quick-test with samples:
              </span>

              <div className="sample-buttons">
                {CROP_DISEASES.filter(
                  (sample) => sample.sampleImage
                ).map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`sample-pill ${
                      imagePreview === sample.sampleImage
                        ? 'active'
                        : ''
                    }`}
                  >
                    {sample.crop}:{' '}
                    {sample.status === 'Healthy'
                      ? 'Healthy'
                      : sample.diseaseName
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="btn-primary analyze-btn"
              onClick={runAnalysis}
              disabled={isAnalyzing || !imagePreview}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw
                    size={18}
                    className="spinner-icon"
                  />
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

          <div className="results-container">
            {isAnalyzing && (
              <div className="analyzing-state">
                <div className="ai-loader">
                  <div className="scanner-line"></div>
                </div>

                <h3>Processing Image Features...</h3>

                <p>
                  The trained AI model is analyzing your image.
                </p>
              </div>
            )}

            {!isAnalyzing && !result && (
              <div className="empty-state">
                <div className="empty-icon-box">
                  <Layers size={44} color="#2d8a56" />
                </div>

                <h3>Ready for Diagnosis</h3>

                <p>
                  Upload a crop leaf image and click{' '}
                  <strong>Analyze Crop Leaf Now</strong> to receive
                  a prediction from the trained AI model.
                </p>

                <div className="tips-box">
                  <h4>
                    💡 Photography Tips for Best Accuracy:
                  </h4>

                  <ul>
                    <li>
                      Capture a clear, well-lit photo of the leaf.
                    </li>
                    <li>
                      Avoid blurry or heavily shadowed images.
                    </li>
                    <li>
                      Keep visible spots or lesions clearly in focus.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!isAnalyzing && result && (
              <div className="diagnosis-result-card">
                <div
                  className={`status-banner ${result.status.toLowerCase()}`}
                >
                  <div className="status-header-text">
                    <div className="status-tag-row">
                      <span
                        className={`status-tag ${result.status.toLowerCase()}`}
                      >
                        {result.status === 'Healthy' ? (
                          <>
                            <CheckCircle2 size={16} />
                            Healthy Crop
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={16} />
                            Disease Detected
                          </>
                        )}
                      </span>

                      <span
                        className={`severity-tag severity-${result.severity.toLowerCase()}`}
                      >
                        {result.severity} Severity
                      </span>
                    </div>

                    <h2 className="disease-title">
                      {result.diseaseName}
                    </h2>

                    <p className="scientific-name">
                      <em>
                        Pathogen: {result.scientificName}
                      </em>
                    </p>
                  </div>

                  <div className="confidence-badge">
                    <span className="conf-value">
                      {result.confidence}%
                    </span>

                    <span className="conf-label">
                      Model Confidence
                    </span>
                  </div>
                </div>

                <p className="result-description">
                  {result.description}
                </p>

                <div className="env-triggers">
                  <div className="env-item">
                    <Thermometer size={18} color="#2d8a56" />

                    <div>
                      <strong>Favorable Temp:</strong>{' '}
                      {result.favorableConditions.temperature}
                    </div>
                  </div>

                  <div className="env-item">
                    <Droplets size={18} color="#2d8a56" />

                    <div>
                      <strong>Favorable Humidity:</strong>{' '}
                      {result.favorableConditions.humidity}
                    </div>
                  </div>
                </div>

                <div className="symptoms-section">
                  <h4>
                    Symptoms & Visual Markers
                  </h4>

                  <ul className="symptoms-list">
                    {result.symptoms.map((symptom, index) => (
                      <li key={index}>
                        <span className="bullet-dot"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="recommendations-box">
                  <div className="rec-tabs">
                    <button
                      type="button"
                      className={`rec-tab ${
                        activeTab === 'organic' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('organic')}
                    >
                      🌿 Organic Management
                    </button>

                    <button
                      type="button"
                      className={`rec-tab ${
                        activeTab === 'chemical' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('chemical')}
                    >
                      🧪 Chemical Control
                    </button>

                    <button
                      type="button"
                      className={`rec-tab ${
                        activeTab === 'prevention' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('prevention')}
                    >
                      🛡️ Preventive Practices
                    </button>
                  </div>

                  <div className="rec-content">
                    {activeTab === 'organic' && (
                      <ul>
                        {result.organicTreatment.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    )}

                    {activeTab === 'chemical' && (
                      <ul>
                        {result.chemicalTreatment.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    )}

                    {activeTab === 'prevention' && (
                      <ul>
                        {result.preventiveMeasures.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                <p className="result-disclaimer">
                  AI predictions are estimates, not confirmed diagnoses.
                  Verify uncertain results with a qualified agricultural
                  expert before making treatment decisions.
                </p>

                <div className="results-actions">
                  <button
                    type="button"
                    className={`btn-primary save-btn ${
                      saveSuccess ? 'saved' : ''
                    }`}
                    onClick={handleSave}
                    disabled={!onSaveScan}
                  >
                    <BookmarkCheck size={18} />

                    {saveSuccess
                      ? 'Saved to History!'
                      : 'Save Scan to History'}
                  </button>

                  {onNavigateToWeather && (
                    <button
                      type="button"
                      className="btn-secondary weather-link-btn"
                      onClick={onNavigateToWeather}
                    >
                      Check Weather Risk{' '}
                      <ArrowRight size={16} />
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
