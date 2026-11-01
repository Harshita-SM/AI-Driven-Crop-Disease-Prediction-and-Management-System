import React from 'react'
import {
  Leaf,
  ScanSearch,
  CloudSun,
  ShieldAlert,
  Lightbulb,
  Upload,
  Brain,
  ClipboardList,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import './Home.css'

function HeroSection({ onNavigate }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">
            <Leaf size={16} />
            AI-Powered Agriculture
          </div>

          <h1 className="hero-heading">
            Protect Your Crops with{' '}
            <span className="highlight">AI-Powered</span>{' '}
            Intelligence
          </h1>

          <p className="hero-description">
            Detect potential crop diseases early, understand environmental risks,
            and discover smarter ways to protect your crops with AI-driven
            agricultural insights.
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate && onNavigate('detection')}
            >
              Detect Crop Disease
            </button>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>
        </div>

        <div
          className="hero-image-box"
          onClick={() => onNavigate && onNavigate('detection')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&q=80"
            alt="Farmer inspecting crop leaves in a green field"
          />

          <div className="hero-image-badge">
            <div className="badge-icon">
              <ScanSearch size={22} color="#2d8a56" />
            </div>
            <div className="badge-text">
              <strong>AI Disease Detection</strong>
              <span>Click to test scanner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection({ onNavigate }) {
  const features = [
    {
      icon: <ScanSearch size={26} color="#2d8a56" />,
      title: 'AI Disease Detection',
      tab: 'detection',
      description:
        'Analyze crop leaf images to identify potential diseases using an AI classification model.',
    },
    {
      icon: <CloudSun size={26} color="#2d8a56" />,
      title: 'Weather Insights',
      tab: 'weather',
      description:
        'Understand environmental conditions that may influence crop health.',
    },
    {
      icon: <ShieldAlert size={26} color="#2d8a56" />,
      title: 'Disease Risk Assessment',
      tab: 'weather',
      description:
        'Explore disease-specific risk indicators based on available environmental data.',
    },
    {
      icon: <Lightbulb size={26} color="#2d8a56" />,
      title: 'Intelligent Crop Guidance',
      tab: 'detection',
      description:
        'Access understandable crop-management recommendations based on relevant agricultural information.',
    },
  ]

  return (
    <section className="features section" id="features">
      <div className="container">
        <h2 className="section-title">Smart Solutions for Healthier Crops</h2>
        <p className="section-subtitle">
          Everything you need to monitor, detect, and protect your crops — all
          in one place.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card clickable"
              onClick={() => onNavigate && onNavigate(feature.tab)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-explore-link">
                Open Tool <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection({ onNavigate }) {
  const steps = [
    {
      number: '01',
      icon: <Upload size={28} />,
      title: 'Upload a Crop Image',
      description:
        'Take a photo of a crop leaf and upload it directly to the platform.',
    },
    {
      number: '02',
      icon: <Brain size={28} />,
      title: 'AI Model Analysis',
      description:
        'Our AI model analyzes the image and identifies potential signs of disease.',
    },
    {
      number: '03',
      icon: <ClipboardList size={28} />,
      title: 'Review the Results',
      description:
        'View the prediction alongside available environmental information for context.',
    },
    {
      number: '04',
      icon: <BookOpen size={28} />,
      title: 'Explore Guidance',
      description:
        'Discover suitable prevention and management guidance for your crops.',
    },
  ]

  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Four simple steps to get AI-powered insights about your crops.
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card"
              onClick={() => onNavigate && onNavigate('detection')}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ onNavigate }) {
  return (
    <section className="cta">
      <div className="cta-inner">
        <h2>Give Your Crops the Care They Deserve</h2>
        <p>
          Take the first step toward smarter crop management with AI-powered
          agricultural insights.
        </p>
        <button
          type="button"
          className="btn-white"
          onClick={() => onNavigate && onNavigate('detection')}
        >
          Get Started
        </button>
      </div>
    </section>
  )
}

function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection onNavigate={onNavigate} />
      <HowItWorksSection onNavigate={onNavigate} />
      <CTASection onNavigate={onNavigate} />
    </div>
  )
}

export default Home
