import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  PieChart, 
  TrendingUp, 
  Lightbulb,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { optimizeBudget } from '../services/api';
import './BudgetOptimizer.css';

const BudgetOptimizer = ({ 
  budget, 
  industry, 
  platform, 
  goal,
  campaignDuration,
  hasInfluencer = true 
}) => {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    if (budget && budget !== '' && parseInt(budget.replace(/\D/g, '')) > 0) {
      fetchBudgetOptimization();
    }
  }, [budget, industry, platform, goal]);

  const fetchBudgetOptimization = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await optimizeBudget(
        budget,
        industry,
        platform,
        goal,
        campaignDuration,
        hasInfluencer
      );
      setBudgetData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!budget || budget === '' || parseInt(budget.replace(/\D/g, '')) <= 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="budget-optimizer-container">
        <div className="budget-loading">
          <div className="loading-spinner"></div>
          <p>Optimizing your budget...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="budget-optimizer-container">
        <div className="budget-error">
          <AlertCircle size={24} />
          <p>Unable to optimize budget. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!budgetData) {
    return null;
  }

  // Color palette for allocation bars
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="budget-optimizer-container">
      {/* Header */}
      <div className="budget-header">
        <div className="budget-header-icon">
          <Wallet size={24} />
        </div>
        <div className="budget-header-content">
          <h3 className="budget-title">Budget Optimizer</h3>
          <p className="budget-subtitle">Intelligent allocation for maximum ROI</p>
        </div>
        <div className="budget-total-badge">
          <span>{budgetData.formatted_total}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="budget-grid">
        {/* Left: Budget Allocation */}
        <div className="budget-allocation-section">
          <h4 className="section-label">
            <PieChart size={16} />
            Budget Allocation
          </h4>
          
          <div className="allocation-list">
            {budgetData.allocations.map((item, index) => (
              <div key={item.key} className="allocation-item">
                <div className="allocation-header">
                  <div className="allocation-label">
                    <span 
                      className="allocation-dot" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></span>
                    <span className="allocation-name">{item.label}</span>
                  </div>
                  <div className="allocation-values">
                    <span className="allocation-amount">{item.formatted_amount}</span>
                    <span className="allocation-percentage">{item.percentage}%</span>
                  </div>
                </div>
                <div className="allocation-bar-container">
                  <div 
                    className="allocation-bar"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: colors[index % colors.length]
                    }}
                  ></div>
                </div>
                <p className="allocation-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: ROI Projection */}
        <div className="roi-section">
          <h4 className="section-label">
            <TrendingUp size={16} />
            ROI Projection
          </h4>

          <div className="roi-main-card">
            <div className="roi-value">
              <span className="roi-number">{budgetData.roi_projection.expected_roi}</span>
              <span className="roi-label">Expected Return</span>
            </div>
            <div className="roi-projected">
              <span>{budgetData.roi_projection.projected_return}</span>
              <span className="projected-label">projected value</span>
            </div>
          </div>

          <div className="roi-benchmarks">
            <div className="benchmark-item">
              <span className="benchmark-label">Industry Low</span>
              <span className="benchmark-value low">{budgetData.roi_projection.industry_low}</span>
            </div>
            <div className="benchmark-item">
              <span className="benchmark-label">Industry Avg</span>
              <span className="benchmark-value avg">{budgetData.roi_projection.industry_average}</span>
            </div>
            <div className="benchmark-item">
              <span className="benchmark-label">Industry High</span>
              <span className="benchmark-value high">{budgetData.roi_projection.industry_high}</span>
            </div>
          </div>

          <div className="roi-confidence">
            <div className="confidence-bar-container">
              <div 
                className="confidence-bar"
                style={{ width: `${budgetData.roi_projection.confidence_percentage}%` }}
              ></div>
            </div>
            <div className="confidence-info">
              <span className={`confidence-badge ${budgetData.roi_projection.confidence.toLowerCase()}`}>
                {budgetData.roi_projection.confidence} Confidence
              </span>
              <span className="confidence-percentage">{budgetData.roi_projection.confidence_percentage}%</span>
            </div>
          </div>

          <p className="roi-explanation">{budgetData.roi_projection.explanation}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <button 
          className="recommendations-toggle"
          onClick={() => setShowRecommendations(!showRecommendations)}
        >
          <Lightbulb size={18} />
          <span>Smart Recommendations</span>
          {showRecommendations ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showRecommendations && (
          <div className="recommendations-list">
            {budgetData.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <CheckCircle size={16} />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOptimizer;
