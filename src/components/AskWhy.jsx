import React, { useState } from 'react';
import { 
  Lightbulb, 
  X, 
  Sparkles, 
  CheckCircle,
  Loader2,
  Star
} from 'lucide-react';
import { explainDecision } from '../services/api';
import './AskWhy.css';

const AskWhy = ({ 
  elementType, 
  elementValue, 
  product, 
  audience, 
  platform,
  label = "Ask Why"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAskWhy = async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);

    try {
      const data = await explainDecision(
        elementType,
        elementValue,
        product,
        audience,
        platform
      );
      setExplanation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setExplanation(null);
    setError(null);
  };

  return (
    <>
      {/* Ask Why Button */}
      <button 
        className="ask-why-button"
        onClick={handleAskWhy}
        title={`Why ${label}?`}
      >
        <Lightbulb size={14} />
        <span>Ask Why</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="aw-overlay" onClick={handleClose}>
          <div className="aw-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="aw-header">
              <div className="aw-header-content">
                <div className="aw-header-icon">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="aw-modal-title">AI Campaign Coach</h3>
                  <p className="aw-modal-subtitle">Understanding your campaign decisions</p>
                </div>
              </div>
              <button className="aw-close-button" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="aw-modal-body">
              {loading && (
                <div className="aw-loading-state">
                  <Loader2 size={32} className="aw-spinner" />
                  <p>Analyzing decision...</p>
                </div>
              )}

              {error && (
                <div className="aw-error-state">
                  <p>Unable to get explanation. Please try again.</p>
                </div>
              )}

              {explanation && !loading && (
                <>
                  {/* What We Decided */}
                  <div className="aw-decision-card">
                    <div className="aw-decision-label">
                      {formatElementType(elementType)}
                    </div>
                    <div className="aw-decision-value">
                      "{elementValue}"
                    </div>
                  </div>

                  {/* Main Explanation */}
                  <div className="aw-explanation-section">
                    <h4 className="aw-section-title">
                      <Lightbulb size={18} />
                      Why This Decision?
                    </h4>
                    <p className="aw-explanation-text">{explanation.explanation}</p>
                  </div>

                  {/* Key Insights */}
                  {explanation.insights && explanation.insights.length > 0 && (
                    <div className="aw-insights-section">
                      <h4 className="aw-section-title">
                        <Star size={18} />
                        Key Insights
                      </h4>
                      <ul className="aw-insights-list">
                        {explanation.insights.map((insight, i) => (
                          <li key={i} className="aw-insight-item">
                            <CheckCircle size={16} />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pro Tip */}
                  {explanation.pro_tip && (
                    <div className="aw-pro-tip">
                      {explanation.pro_tip}
                    </div>
                  )}

                  {/* Confidence Badge */}
                  <div className="aw-confidence-badge">
                    <span className={`aw-confidence-level aw-confidence-${explanation.confidence?.toLowerCase()}`}>
                      {explanation.confidence} Confidence
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper to format element type for display
function formatElementType(type) {
  const formats = {
    campaign_theme: 'Campaign Theme',
    target_emotion: 'Target Emotion',
    color_palette: 'Color Palette',
    platform: 'Platform Choice',
    content_type: 'Content Format',
    engagement_rate: 'Engagement Rate',
    posting_time: 'Posting Time',
    hashtags: 'Hashtag Strategy',
    cta: 'Call to Action',
    caption_style: 'Caption Style'
  };
  return formats[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default AskWhy;
