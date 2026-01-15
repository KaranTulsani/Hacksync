/**
 * StratOS API Service
 * Handles all communication with the backend APIs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generate a complete campaign with strategy and performance prediction
 * @param {Object} campaignData - The user's campaign brief
 * @returns {Promise<Object>} - Complete campaign output with AI strategy and ML predictions
 */
export async function generateCampaign(campaignData) {
  const response = await fetch(`${API_BASE_URL}/api/generate-campaign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Backend 1: Gemini Strategy inputs
      product: campaignData.productName || campaignData.product,
      audience: campaignData.targetAudience || campaignData.audience,
      goal: campaignData.goals || campaignData.goal,
      tone: campaignData.tone || 'Professional yet approachable',
      budget: campaignData.budget || '$5,000 - $10,000',
      campaign_duration: campaignData.timeline || campaignData.campaign_duration || '3 Months',

      // Backend 2: ML Prediction inputs
      platform: campaignData.platform || 'Instagram',
      content_type: campaignData.contentType || campaignData.content_type || 'Image',
      industry: campaignData.industry || 'General',
      posting_hour: parseInt(campaignData.postingHour) || 18,
      caption_length: parseInt(campaignData.captionLength) || 120,
      cta: campaignData.hasCta ? 1 : 1,
      influencer: campaignData.hasInfluencer ? 1 : 0
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate campaign');
  }

  return response.json();
}

/**
 * Get performance prediction only (without full campaign generation)
 * @param {Object} predictionData - ML model inputs
 * @returns {Promise<Object>} - Performance prediction results
 */
export async function predictPerformance(predictionData) {
  const response = await fetch(`${API_BASE_URL}/api/predict-performance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform: predictionData.platform || 'Instagram',
      content_type: predictionData.contentType || 'Image',
      industry: predictionData.industry || 'General',
      posting_hour: parseInt(predictionData.postingHour) || 18,
      caption_length: parseInt(predictionData.captionLength) || 120,
      cta: predictionData.hasCta ? 1 : 1,
      influencer: predictionData.hasInfluencer ? 1 : 0
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to predict performance');
  }

  return response.json();
}

/**
 * Check API health status
 * @returns {Promise<Object>} - API status
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.json();
  } catch (error) {
    return { status: 'offline', error: error.message };
  }
}

/**
 * Get competitor profiles for a specific industry
 * @param {string} industry - Industry name
 * @returns {Promise<Object>} - List of competitors
 */
export async function getCompetitors(industry) {
  const response = await fetch(`${API_BASE_URL}/api/get-competitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ industry }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get competitors');
  }

  return response.json();
}

/**
 * Analyze a specific competitor and get differentiation strategy
 * @param {string} competitorName - Name of the competitor
 * @param {Object} userCampaign - User's campaign data
 * @param {string} industry - Industry name
 * @returns {Promise<Object>} - Competitor analysis and differentiation insights
 */
export async function analyzeCompetitor(competitorName, userCampaign, industry = 'General') {
  const response = await fetch(`${API_BASE_URL}/api/analyze-competitor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      industry: industry,
      competitor_name: competitorName,
      user_campaign: userCampaign,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to analyze competitor');
  }

  return response.json();
}

/**
 * Get competitive landscape overview for an industry
 * @param {string} industry - Industry name
 * @returns {Promise<Object>} - Industry competitive overview
 */
export async function getIndustryOverview(industry) {
  const response = await fetch(`${API_BASE_URL}/api/industry-overview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ industry }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get industry overview');
  }

  return response.json();
}

/**
 * AI Campaign Coach - Explain why a decision was made
 * @param {string} elementType - Type of element (campaign_theme, color_palette, etc.)
 * @param {string} elementValue - The actual value/decision
 * @param {string} product - Product name
 * @param {string} audience - Target audience
 * @param {string} platform - Platform name
 * @returns {Promise<Object>} - Explanation with insights and pro tips
 */
export async function explainDecision(elementType, elementValue, product, audience, platform) {
  const response = await fetch(`${API_BASE_URL}/api/explain-decision`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      element_type: elementType,
      element_value: elementValue,
      product: product || 'your product',
      audience: audience || 'your audience',
      platform: platform || 'Instagram',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get explanation');
  }

  return response.json();
}

/**
 * Budget Optimizer - Get intelligent budget allocation and ROI projection
 * @param {string} budget - Budget amount (e.g., "50000", "5L", "₹1 Lakh")
 * @param {string} industry - Industry category
 * @param {string} platform - Platform name
 * @param {string} goal - Campaign goal
 * @param {string} campaignDuration - Duration of campaign
 * @param {boolean} hasInfluencer - Whether to include influencer budget
 * @returns {Promise<Object>} - Budget breakdown and ROI projections
 */
export async function optimizeBudget(budget, industry, platform, goal, campaignDuration, hasInfluencer = true) {
  const response = await fetch(`${API_BASE_URL}/api/optimize-budget`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      budget: budget || '50000',
      industry: industry || 'General',
      platform: platform || 'Instagram',
      goal: goal || 'awareness',
      campaign_duration: campaignDuration || '3 months',
      has_influencer: hasInfluencer
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to optimize budget');
  }

  return response.json();
}

export default {
  generateCampaign,
  predictPerformance,
  checkHealth,
  getCompetitors,
  analyzeCompetitor,
  getIndustryOverview,
  explainDecision,
  optimizeBudget
};

