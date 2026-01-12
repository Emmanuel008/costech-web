import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://costech.kingdomsolutions.co.tz/api';

// Base URL for the new projects API
const PROJECTS_API_BASE_URL = 'https://rclearance.costech.or.tz/api/v1/nfast';

// Base URL for RIMS statistics API
const RIMS_API_BASE_URL = 'https://rclearance.costech.or.tz/api/v1/rims/statistics';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage
let authToken = null;

/**
 * Login and get access token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<string>} - Access token
 */
export const login = async (email = 'admin@admin.com', password = 'admin') => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });


    // Check multiple possible locations for the access token
    let token = null;
    
    if (response.data) {
      // Check direct access_token
      if (response.data.access_token) {
        token = response.data.access_token;
      }
      // Check in returnData
      else if (response.data.returnData && response.data.returnData.access_token) {
        token = response.data.returnData.access_token;
      }
      // Check if returnData itself is the token (string)
      else if (response.data.returnData && typeof response.data.returnData === 'string') {
        token = response.data.returnData;
      }
      // Check if returnData is an object with token property
      else if (response.data.returnData && response.data.returnData.token) {
        token = response.data.returnData.token;
      }
    }

    if (token) {
      authToken = token;
      return authToken;
    }

    // Log the full response structure for debugging
    console.error('Token not found in response. Full response structure:', JSON.stringify(response.data, null, 2));
    throw new Error('No access token received');
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Login response status:', error.response.status);
      console.error('Login response data:', error.response.data);
    } else if (error.request) {
      console.error('No login response received:', error.request);
    } else {
      console.error('Login error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Get access token (login if not already authenticated)
 * @returns {Promise<string>} - Access token
 */
const getAuthToken = async () => {
  if (authToken) {
    return authToken;
  }

  return await login();
};

/**
 * Fetch news list from API
 * @returns {Promise<Array>} - Array of news items
 */
export const getNewsList = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/news/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const newsItems = response.data.returnData.list_of_item || [];
      return newsItems;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch single news item by ID from API
 * @param {number|string} id - News item ID
 * @returns {Promise<Object>} - News item with full details
 */
export const getNewsById = async (id) => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request - try different possible endpoints
    let response;
    try {
      // Try endpoint with ID
      response = await apiClient.get(`/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      // If that fails, try alternative endpoint
      try {
        response = await apiClient.get(`/news/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err2) {
        // If both fail, try with query parameter
        response = await apiClient.get(`/news/ilist?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }


    if (response.data && response.data.status === 'OK') {
      const newsItem = response.data.returnData || response.data.data || response.data;
      return newsItem;
    }

    console.warn('API returned empty or invalid response');
    return null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Generate slug from title
 * @param {string} title - News title
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

/**
 * Format date from API response or use current date
 * @param {string|null} dateString - Date string from API
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) {
    // Use current date if no date provided
    const date = new Date();
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (error) {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
};

/**
 * Fetch financial reports list from API
 * @returns {Promise<Array>} - Array of financial report items
 */
export const getFinancialReports = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/financialReport/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const reports = response.data.returnData.list_of_item || [];
      return reports;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching financial reports:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch magazines list from API
 * @returns {Promise<Array>} - Array of magazine items
 */
export const getMagazines = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/magazine/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const magazines = response.data.returnData.list_of_item || [];
      return magazines;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching magazines:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch books list from API
 * @returns {Promise<Array>} - Array of book items
 */
export const getBooks = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/books/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const books = response.data.returnData.list_of_item || [];
      return books;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching books:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch newsletters list from API
 * @returns {Promise<Array>} - Array of newsletter items
 */
export const getNewsletters = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/newsLetter/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const newsletters = response.data.returnData.list_of_item || [];
      return newsletters;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch statements list from API
 * @returns {Promise<Array>} - Array of statement items
 */
export const getStatements = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/statement/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const statements = response.data.returnData.list_of_item || [];
      return statements;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching statements:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch press releases list from API
 * @returns {Promise<Array>} - Array of press release items
 */
export const getPressReleases = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/pressRelease/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const pressReleases = response.data.returnData.list_of_item || [];
      return pressReleases;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching press releases:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch COSTECH videos list from API
 * @returns {Promise<Array>} - Array of video items
 */
export const getCostechVideos = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/costechVideo/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const videos = response.data.returnData.list_of_item || [];
      return videos;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching COSTECH videos:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch reports list from API
 * @returns {Promise<Array>} - Array of report items
 */
export const getReports = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/reports/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const reports = response.data.returnData.list_of_item || [];
      return reports;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching reports:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch acts and legal documents list from API
 * @returns {Promise<Array>} - Array of acts and legal items
 */
export const getActsAndLegal = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/actsandlegal/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const actsAndLegal = response.data.returnData.list_of_item || [];
      return actsAndLegal;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching acts and legal documents:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch policies list from API
 * @returns {Promise<Array>} - Array of policy items
 */
export const getPolicies = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/policies/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const policies = response.data.returnData.list_of_item || [];
      return policies;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching policies:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch strategic plans list from API
 * @returns {Promise<Array>} - Array of strategic plan items
 */
export const getStrategicPlans = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/strategicPlan/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const strategicPlans = response.data.returnData.list_of_item || [];
      return strategicPlans;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching strategic plans:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch guideline documents list from API
 * @returns {Promise<Array>} - Array of guideline document items
 */
export const getGuidelineDocuments = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/guidelineDocuments/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const guidelineDocuments = response.data.returnData.list_of_item || [];
      return guidelineDocuments;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching guideline documents:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch conferences list from API
 * @returns {Promise<Array>} - Array of conference items
 */
export const getConferences = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/conference/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const conferences = response.data.returnData.list_of_item || [];
      return conferences;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching conferences:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch exhibitions list from API
 * @returns {Promise<Array>} - Array of exhibition items
 */
export const getExhibitions = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/exhibition/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const exhibitions = response.data.returnData.list_of_item || [];
      return exhibitions;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch ongoing projects list from API
 * @returns {Promise<Array>} - Array of ongoing project items
 */
export const getOngoingProjects = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/ongoingProject/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const projects = response.data.returnData.list_of_item || [];
      return projects;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching ongoing projects:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch partnership areas list from API
 * @returns {Promise<Array>} - Array of partnership area items
 */
export const getPartnershipAreas = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/areaOfPartnership/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const areas = response.data.returnData.list_of_item || [];
      return areas;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching partnership areas:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch fellowship grants list from API
 * @returns {Promise<Array>} - Array of fellowship grant items
 */
export const getFellowshipGrants = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/fellowshipGrants/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const grants = response.data.returnData.list_of_item || [];
      return grants;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching fellowship grants:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch online services list from API
 * @returns {Promise<Array>} - Array of online service items
 */
export const getOnlineServices = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/onlineService/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const services = response.data.returnData.list_of_item || [];
      return services;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching online services:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch hero items list from API
 * @returns {Promise<Array>} - Array of hero items
 */
export const getHero = async () => {
  try {
    
    // Get authentication token
    const token = await getAuthToken();

    // Make authenticated request
    const response = await apiClient.get('/hero/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const heroItems = response.data.returnData.list_of_item || [];
      return heroItems;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching hero items:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch COSTECH funded projects list from API with filters
 * @param {Object} filters - Filter parameters (page_no, page_size, program_id, gender_id, status_id, funder_id)
 * @returns {Promise<Object>} - Object with projects array and pagination info
 */
export const getCostechFundedProjects = async (filters = {}) => {
  try {
    
    const payload = {
      page_no: filters.page_no || 1,
      page_size: filters.page_size || 10,
      ...(filters.program_id && { program_id: filters.program_id }),
      ...(filters.gender_id && { gender_id: filters.gender_id }),
      ...(filters.status_id && { status_id: filters.status_id }),
      ...(filters.funder_id && { funder_id: filters.funder_id }),
    };

    const response = await axios.post(`${PROJECTS_API_BASE_URL}/project/list`, payload, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    // Handle paginated response structure
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const projects = response.data.data;
      const meta = response.data.meta || {};
      return {
        projects,
        pagination: {
          current_page: meta.page || filters.page_no || 1,
          total: meta.total || projects.length,
          page_size: meta.page_size || filters.page_size || 10,
          total_pages: meta.pages || Math.ceil((meta.total || projects.length) / (meta.page_size || filters.page_size || 10)),
        },
      };
    }
    
    // Fallback: handle direct array response
    if (response.data && Array.isArray(response.data)) {
      return {
        projects: response.data,
        pagination: {
          current_page: 1,
          total: response.data.length,
          page_size: filters.page_size || 10,
          total_pages: 1,
        },
      };
    }

    console.warn('API returned empty or invalid response');
    return { projects: [], pagination: { current_page: 1, total: 0, page_size: 10, total_pages: 0 } };
  } catch (error) {
    console.error('Error fetching COSTECH funded projects:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

/**
 * Fetch funders list from API
 * @returns {Promise<Array>} - Array of funder items
 */
export const getFunders = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/funder/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const funders = response.data.data;
      return funders;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching funders:', error);
    throw error;
  }
};

/**
 * Fetch programs list from API
 * @returns {Promise<Array>} - Array of program items
 */
export const getPrograms = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/program/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const programs = response.data.data;
      return programs;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

/**
 * Fetch project statuses list from API
 * @returns {Promise<Array>} - Array of status items
 */
export const getProjectStatuses = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/project-status/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const statuses = response.data.data;
      return statuses;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching project statuses:', error);
    throw error;
  }
};

/**
 * Fetch genders list from API
 * @returns {Promise<Array>} - Array of gender items
 */
export const getGenders = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/gender/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const genders = response.data.data;
      return genders;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching genders:', error);
    throw error;
  }
};

/**
 * Fetch innovation statistics per gender
 * @returns {Promise<Object>} - Object with gender statistics
 */
export const getInnovationPerGender = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-per-gender`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching innovation per gender:', error);
    throw error;
  }
};

/**
 * Fetch innovation total funds per funder
 * @returns {Promise<Object>} - Object with funder statistics
 */
export const getInnovationTotalFundsPerFunder = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-total-funds-per-funder`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching innovation total funds per funder:', error);
    throw error;
  }
};

/**
 * Fetch innovation total funds per program
 * @returns {Promise<Object>} - Object with program statistics
 */
export const getInnovationTotalFundsPerProgram = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-total-funds-per-program`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching innovation total funds per program:', error);
    throw error;
  }
};

/**
 * Fetch innovation per status
 * @returns {Promise<Object>} - Object with status statistics
 */
export const getInnovationPerStatus = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-per-status`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching innovation per status:', error);
    throw error;
  }
};

/**
 * Fetch research statistics per gender
 * @returns {Promise<Object>} - Object with gender statistics
 */
export const getResearchPerGender = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-per-gender`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching research per gender:', error);
    throw error;
  }
};

/**
 * Fetch research total funds per funder
 * @returns {Promise<Object>} - Object with funder statistics
 */
export const getResearchTotalFundsPerFunder = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-total-funds-per-funder`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching research total funds per funder:', error);
    throw error;
  }
};

/**
 * Fetch research total funds per program
 * @returns {Promise<Object>} - Object with program statistics
 */
export const getResearchTotalFundsPerProgram = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-total-funds-per-program`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching research total funds per program:', error);
    throw error;
  }
};

/**
 * Fetch research per status
 * @returns {Promise<Object>} - Object with status statistics
 */
export const getResearchPerStatus = async () => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-per-status`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('Error fetching research per status:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per gender
 * @returns {Promise<Array>} - Array of gender statistics
 */
export const getPermitPerGender = async () => {
  try {
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-gender`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.code === 200 && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching permit per gender:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per country
 * @returns {Promise<Array>} - Array of country statistics
 */
export const getPermitPerCountry = async () => {
  try {
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-country`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.code === 200 && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching permit per country:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per sector
 * @returns {Promise<Array>} - Array of sector statistics
 */
export const getPermitPerSector = async () => {
  try {
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-sector`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.code === 200 && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching permit per sector:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per research location (region)
 * @returns {Promise<Array>} - Array of region statistics
 */
export const getPermitPerRegion = async () => {
  try {
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-research-location`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.code === 200 && response.data.data) {
      return response.data.data;
    }

    console.warn('API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('Error fetching permit per region:', error);
    throw error;
  }
};

/**
 * Fetch single COSTECH funded project detail by ID from API
 * @param {number|string} id - Project ID
 * @returns {Promise<Object>} - Project detail object
 */
export const getCostechFundedProjectDetail = async (id) => {
  try {
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/project/show/${id}`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.data && response.data.id) {
      return response.data;
    }

    console.warn('API returned empty or invalid response');
    return null;
  } catch (error) {
    console.error('Error fetching COSTECH funded project detail:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export default apiClient;

