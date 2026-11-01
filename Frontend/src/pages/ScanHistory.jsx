import React, { useState } from 'react'
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Trash2,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react'
import './ScanHistory.css'

function ScanHistory({ scans, onClearHistory, onNavigateToDetection }) {
  const [filter, setFilter] = useState('ALL')

  const filteredScans = scans.filter((scan) => {
    if (filter === 'HEALTHY') return scan.status === 'Healthy'
    if (filter === 'INFECTED') return scan.status === 'Infected'
    return true
  })

  return (
    <div className="history-page section">
      <div className="container">
        {/* Header */}
        <div className="history-header">
          <span className="badge-pill">
            <ClipboardList size={16} /> Diagnostic Records
          </span>
          <h1 className="section-title">Crop Scan History</h1>
          <p className="section-subtitle">
            Review past agricultural inspections, track infection patterns across your fields,
            and monitor crop health recovery over time.
          </p>
        </div>

        {/* Filter & Actions Bar */}
        <div className="history-toolbar">
          <div className="filter-buttons">
            <span className="filter-label">
              <Filter size={16} /> Filter by:
            </span>
            <button
              className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              All Records ({scans.length})
            </button>
            <button
              className={`filter-btn ${filter === 'INFECTED' ? 'active' : ''}`}
              onClick={() => setFilter('INFECTED')}
            >
              Infected ({scans.filter((s) => s.status === 'Infected').length})
            </button>
            <button
              className={`filter-btn ${filter === 'HEALTHY' ? 'active' : ''}`}
              onClick={() => setFilter('HEALTHY')}
            >
              Healthy ({scans.filter((s) => s.status === 'Healthy').length})
            </button>
          </div>

          <div className="toolbar-actions">
            {scans.length > 0 && (
              <button className="clear-history-btn" onClick={onClearHistory}>
                <Trash2 size={16} /> Clear Records
              </button>
            )}
            <button className="btn-primary new-scan-btn" onClick={onNavigateToDetection}>
              <Sparkles size={16} /> New Scan
            </button>
          </div>
        </div>

        {/* Scan List */}
        {filteredScans.length === 0 ? (
          <div className="empty-history-card">
            <div className="empty-history-icon">
              <ClipboardList size={48} color="#2d8a56" />
            </div>
            <h3>No Records Found</h3>
            <p>
              {filter === 'ALL'
                ? "You haven't saved any crop leaf scans yet. Run your first diagnosis to build your field log."
                : `No scans matching filter "${filter.toLowerCase()}".`}
            </p>
            <button
              className="btn-primary"
              onClick={onNavigateToDetection}
              style={{ marginTop: '14px' }}
            >
              Scan a Crop Now <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="scans-grid">
            {filteredScans.map((scan) => (
              <div key={scan.id} className="scan-card">
                <div className="scan-card-img-wrapper">
                  <img src={scan.imageUrl} alt={scan.diseaseName} className="scan-img" />
                  <span className={`scan-status-pill ${scan.status.toLowerCase()}`}>
                    {scan.status === 'Healthy' ? (
                      <><CheckCircle2 size={14} /> Healthy</>
                    ) : (
                      <><AlertTriangle size={14} /> {scan.severity} Severity</>
                    )}
                  </span>
                </div>

                <div className="scan-card-content">
                  <div className="scan-crop-tag">{scan.crop}</div>
                  <h3 className="scan-disease-name">{scan.diseaseName}</h3>

                  <div className="scan-meta-row">
                    <span className="scan-date">
                      <Calendar size={14} /> {scan.timestamp}
                    </span>
                    <span className="scan-confidence">
                      Confidence: <strong>{scan.confidence}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ScanHistory
