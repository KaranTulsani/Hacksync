/**
 * BrandPulse API Service
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

export default {
  generateCampaign,
  predictPerformance,
  checkHealth
};
