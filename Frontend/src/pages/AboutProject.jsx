import React from 'react'
import {
  Award,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Sprout
} from 'lucide-react'
import './AboutProject.css'

function AboutProject({ onNavigateToDetection }) {
  return (
    <div className="about-page section">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <span className="badge-pill">
            <Award size={16} /> Ministry & ICAR Initiative
          </span>
          <h1 className="section-title">About the Project</h1>
          <p className="section-subtitle">
            AI-Driven Crop Disease Prediction and Management System is designed to empower
            farmers with accessible, intelligent, and timely agronomic decision-support.
          </p>
        </div>

        {/* Institutional Card */}
        <div className="institution-card">
          <div className="institution-inner">
            <div className="institution-badge">
              <Sprout size={32} color="#ffffff" />
            </div>
            <div>
              <span className="inst-meta">Domain: Agriculture, FoodTech & Rural Development</span>
              <h2 className="inst-title">Proposed Under Indian Council of Agricultural Research (ICAR)</h2>
              <p className="inst-sub">
                Department of Agricultural Research and Education, Ministry of Agriculture & Farmers Welfare, Government of India.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <Cpu size={26} color="#2d8a56" />
            </div>
            <h3>Computer Vision & AI</h3>
            <p>
              Trained Convolutional Neural Networks (CNNs) analyze fine-grained plant pathology
              markers—such as necrotic lesions, chlorotic rings, and pustules—to identify plant diseases.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Database size={26} color="#2d8a56" />
            </div>
            <h3>Environmental Integration</h3>
            <p>
              Combines weather indicators (temperature, humidity, precipitation, and canopy wetness)
              with image data to evaluate outbreak risk scores before pathogens spread.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <ShieldCheck size={26} color="#2d8a56" />
            </div>
            <h3>Actionable Agronomy</h3>
            <p>
              Translates raw model predictions into dual-track recommendations: certified organic
              bio-treatments and compliant chemical fungicide / bactericide dosages.
            </p>
          </div>
        </div>

        {/* Workflow Diagram Box */}
        <div className="workflow-card">
          <h3 className="workflow-title">System Workflow Architecture</h3>
          <p className="workflow-desc">How data moves from the farmer's camera to actionable field guidance:</p>

          <div className="workflow-steps-row">
            <div className="wf-step">
              <span className="wf-num">1</span>
              <h4>Leaf Capture</h4>
              <p>Image pre-processing, resizing, and color normalization</p>
            </div>
            <div className="wf-arrow">→</div>
            <div className="wf-step">
              <span className="wf-num">2</span>
              <h4>AI Inference</h4>
              <p>Deep learning classification model scores pathological features</p>
            </div>
            <div className="wf-arrow">→</div>
            <div className="wf-step">
              <span className="wf-num">3</span>
              <h4>Weather Risk</h4>
              <p>Correlation with local microclimate & humidity thresholds</p>
            </div>
            <div className="wf-arrow">→</div>
            <div className="wf-step">
              <span className="wf-num">4</span>
              <h4>Field Advisory</h4>
              <p>Farmer-friendly treatment dosages & IPM prevention guide</p>
            </div>
          </div>
        </div>

        {/* Objectives & Key Outcomes */}
        <div className="objectives-section">
          <h3>Core Project Objectives</h3>
          <div className="objectives-grid">
            <div className="objective-item">
              <CheckCircle2 size={20} color="#2d8a56" />
              <span>Provide fast, reliable crop disease identification without waiting for physical lab tests.</span>
            </div>
            <div className="objective-item">
              <CheckCircle2 size={20} color="#2d8a56" />
              <span>Reduce pesticide overuse by recommending precise, targeted treatments and organic alternatives.</span>
            </div>
            <div className="objective-item">
              <CheckCircle2 size={20} color="#2d8a56" />
              <span>Deliver early warnings based on micro-climatic patterns before major outbreaks occur.</span>
            </div>
            <div className="objective-item">
              <CheckCircle2 size={20} color="#2d8a56" />
              <span>Bridge the digital divide for smallholder farmers with an accessible, mobile-first interface.</span>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="about-cta">
          <h2>Ready to test CropCare AI?</h2>
          <p>Experience early detection and smart agronomy support right in your browser.</p>
          <button className="btn-white" onClick={onNavigateToDetection}>
            Start Crop Diagnosis
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutProject
