import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://costech.kingdomsolutions.co.tz/api';

// Base URL for the new projects API
const PROJECTS_API_BASE_URL = 'http://102.208.184.49/api/v1/nfast';

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
    console.log('🔐 Attempting to login...');
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    console.log('🔐 Login response received:', response.data);

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
      console.log('✅ Login successful, token stored');
      return authToken;
    }

    // Log the full response structure for debugging
    console.error('❌ Token not found in response. Full response structure:', JSON.stringify(response.data, null, 2));
    throw new Error('No access token received');
  } catch (error) {
    console.error('❌ Login error:', error);
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
    console.log('🔵 Starting to fetch news from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/news/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const newsItems = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${newsItems.length} news items from API`);
      return newsItems;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching news:', error);
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
    console.log(`🔵 Starting to fetch news item ${id} from API...`);
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

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

    console.log('📥 News Detail API Response received:', response.data);

    if (response.data && response.data.status === 'OK') {
      const newsItem = response.data.returnData || response.data.data || response.data;
      console.log('✅ Successfully fetched news item from API');
      return newsItem;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return null;
  } catch (error) {
    console.error('❌ Error fetching news item:', error);
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
    console.log('🔵 Starting to fetch financial reports from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/financialReport/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Financial Reports API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const reports = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${reports.length} financial reports from API`);
      return reports;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching financial reports:', error);
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
    console.log('🔵 Starting to fetch magazines from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/magazine/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Magazines API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const magazines = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${magazines.length} magazines from API`);
      return magazines;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching magazines:', error);
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
    console.log('🔵 Starting to fetch books from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/books/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Books API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const books = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${books.length} books from API`);
      return books;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching books:', error);
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
    console.log('🔵 Starting to fetch newsletters from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/newsLetter/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Newsletters API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const newsletters = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${newsletters.length} newsletters from API`);
      return newsletters;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching newsletters:', error);
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
    console.log('🔵 Starting to fetch statements from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/statement/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Statements API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const statements = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${statements.length} statements from API`);
      return statements;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching statements:', error);
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
    console.log('🔵 Starting to fetch press releases from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/pressRelease/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Press Releases API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const pressReleases = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${pressReleases.length} press releases from API`);
      return pressReleases;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching press releases:', error);
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
    console.log('🔵 Starting to fetch COSTECH videos from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/costechVideo/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 COSTECH Videos API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const videos = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${videos.length} COSTECH videos from API`);
      return videos;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching COSTECH videos:', error);
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
    console.log('🔵 Starting to fetch reports from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/reports/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Reports API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const reports = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${reports.length} reports from API`);
      return reports;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching reports:', error);
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
    console.log('🔵 Starting to fetch acts and legal documents from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/actsandlegal/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Acts and Legal API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const actsAndLegal = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${actsAndLegal.length} acts and legal documents from API`);
      return actsAndLegal;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching acts and legal documents:', error);
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
    console.log('🔵 Starting to fetch policies from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/policies/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Policies API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const policies = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${policies.length} policies from API`);
      return policies;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching policies:', error);
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
    console.log('🔵 Starting to fetch strategic plans from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/strategicPlan/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Strategic Plans API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const strategicPlans = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${strategicPlans.length} strategic plans from API`);
      return strategicPlans;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching strategic plans:', error);
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
    console.log('🔵 Starting to fetch guideline documents from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/guidelineDocuments/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Guideline Documents API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const guidelineDocuments = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${guidelineDocuments.length} guideline documents from API`);
      return guidelineDocuments;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching guideline documents:', error);
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
    console.log('🔵 Starting to fetch conferences from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/conference/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Conferences API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const conferences = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${conferences.length} conferences from API`);
      return conferences;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching conferences:', error);
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
    console.log('🔵 Starting to fetch exhibitions from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/exhibition/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Exhibitions API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const exhibitions = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${exhibitions.length} exhibitions from API`);
      return exhibitions;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching exhibitions:', error);
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
    console.log('🔵 Starting to fetch ongoing projects from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/ongoingProject/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Ongoing Projects API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const projects = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${projects.length} ongoing projects from API`);
      return projects;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching ongoing projects:', error);
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
    console.log('🔵 Starting to fetch partnership areas from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/areaOfPartnership/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Partnership Areas API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const areas = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${areas.length} partnership areas from API`);
      return areas;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching partnership areas:', error);
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
    console.log('🔵 Starting to fetch fellowship grants from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/fellowshipGrants/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Fellowship Grants API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const grants = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${grants.length} fellowship grants from API`);
      return grants;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching fellowship grants:', error);
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
    console.log('🔵 Starting to fetch online services from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/onlineService/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Online Services API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const services = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${services.length} online services from API`);
      return services;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching online services:', error);
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
    console.log('🔵 Starting to fetch hero items from API...');
    
    // Get authentication token
    const token = await getAuthToken();
    console.log('✅ Authentication successful, token received');

    // Make authenticated request
    const response = await apiClient.get('/hero/ilist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📥 Hero API Response received:', response.data);

    if (response.data && response.data.status === 'OK' && response.data.returnData) {
      const heroItems = response.data.returnData.list_of_item || [];
      console.log(`✅ Successfully fetched ${heroItems.length} hero items from API`);
      return heroItems;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching hero items:', error);
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
    console.log('🔵 Starting to fetch COSTECH funded projects from API...', filters);
    
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

    console.log('📥 COSTECH Funded Projects API Response received:', response.data);

    // Handle paginated response structure
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const projects = response.data.data;
      const meta = response.data.meta || {};
      console.log(`✅ Successfully fetched ${projects.length} projects from API`);
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
      console.log(`✅ Successfully fetched ${response.data.length} projects from API`);
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

    console.warn('⚠️ API returned empty or invalid response');
    return { projects: [], pagination: { current_page: 1, total: 0, page_size: 10, total_pages: 0 } };
  } catch (error) {
    console.error('❌ Error fetching COSTECH funded projects:', error);
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
    console.log('🔵 Starting to fetch funders from API...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/funder/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Funders API Response received:', response.data);

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const funders = response.data.data;
      console.log(`✅ Successfully fetched ${funders.length} funders from API`);
      return funders;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching funders:', error);
    throw error;
  }
};

/**
 * Fetch programs list from API
 * @returns {Promise<Array>} - Array of program items
 */
export const getPrograms = async () => {
  try {
    console.log('🔵 Starting to fetch programs from API...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/program/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Programs API Response received:', response.data);

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const programs = response.data.data;
      console.log(`✅ Successfully fetched ${programs.length} programs from API`);
      return programs;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching programs:', error);
    throw error;
  }
};

/**
 * Fetch project statuses list from API
 * @returns {Promise<Array>} - Array of status items
 */
export const getProjectStatuses = async () => {
  try {
    console.log('🔵 Starting to fetch project statuses from API...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/project-status/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Project Statuses API Response received:', response.data);

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const statuses = response.data.data;
      console.log(`✅ Successfully fetched ${statuses.length} statuses from API`);
      return statuses;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching project statuses:', error);
    throw error;
  }
};

/**
 * Fetch genders list from API
 * @returns {Promise<Array>} - Array of gender items
 */
export const getGenders = async () => {
  try {
    console.log('🔵 Starting to fetch genders from API...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/gender/list`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Genders API Response received:', response.data);

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      const genders = response.data.data;
      console.log(`✅ Successfully fetched ${genders.length} genders from API`);
      return genders;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching genders:', error);
    throw error;
  }
};

/**
 * Fetch innovation statistics per gender
 * @returns {Promise<Object>} - Object with gender statistics
 */
export const getInnovationPerGender = async () => {
  try {
    console.log('🔵 Starting to fetch innovation per gender statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-per-gender`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Innovation Per Gender API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched innovation per gender statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching innovation per gender:', error);
    throw error;
  }
};

/**
 * Fetch innovation total funds per funder
 * @returns {Promise<Object>} - Object with funder statistics
 */
export const getInnovationTotalFundsPerFunder = async () => {
  try {
    console.log('🔵 Starting to fetch innovation total funds per funder statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-total-funds-per-funder`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Innovation Total Funds Per Funder API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched innovation total funds per funder statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching innovation total funds per funder:', error);
    throw error;
  }
};

/**
 * Fetch innovation total funds per program
 * @returns {Promise<Object>} - Object with program statistics
 */
export const getInnovationTotalFundsPerProgram = async () => {
  try {
    console.log('🔵 Starting to fetch innovation total funds per program statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-total-funds-per-program`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Innovation Total Funds Per Program API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched innovation total funds per program statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching innovation total funds per program:', error);
    throw error;
  }
};

/**
 * Fetch innovation per status
 * @returns {Promise<Object>} - Object with status statistics
 */
export const getInnovationPerStatus = async () => {
  try {
    console.log('🔵 Starting to fetch innovation per status statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/innovation-per-status`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Innovation Per Status API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched innovation per status statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching innovation per status:', error);
    throw error;
  }
};

/**
 * Fetch research statistics per gender
 * @returns {Promise<Object>} - Object with gender statistics
 */
export const getResearchPerGender = async () => {
  try {
    console.log('🔵 Starting to fetch research per gender statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-per-gender`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Research Per Gender API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched research per gender statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching research per gender:', error);
    throw error;
  }
};

/**
 * Fetch research total funds per funder
 * @returns {Promise<Object>} - Object with funder statistics
 */
export const getResearchTotalFundsPerFunder = async () => {
  try {
    console.log('🔵 Starting to fetch research total funds per funder statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-total-funds-per-funder`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Research Total Funds Per Funder API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched research total funds per funder statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching research total funds per funder:', error);
    throw error;
  }
};

/**
 * Fetch research total funds per program
 * @returns {Promise<Object>} - Object with program statistics
 */
export const getResearchTotalFundsPerProgram = async () => {
  try {
    console.log('🔵 Starting to fetch research total funds per program statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-total-funds-per-program`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Research Total Funds Per Program API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched research total funds per program statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching research total funds per program:', error);
    throw error;
  }
};

/**
 * Fetch research per status
 * @returns {Promise<Object>} - Object with status statistics
 */
export const getResearchPerStatus = async () => {
  try {
    console.log('🔵 Starting to fetch research per status statistics...');
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/statistics/research-per-status`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Research Per Status API Response received:', response.data);

    if (response.data && response.data.data) {
      console.log('✅ Successfully fetched research per status statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return {};
  } catch (error) {
    console.error('❌ Error fetching research per status:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per gender
 * @returns {Promise<Array>} - Array of gender statistics
 */
export const getPermitPerGender = async () => {
  try {
    console.log('🔵 Starting to fetch permit per gender statistics...');
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-gender`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Permit Per Gender API Response received:', response.data);

    if (response.data && response.data.code === 200 && response.data.data) {
      console.log('✅ Successfully fetched permit per gender statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching permit per gender:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per country
 * @returns {Promise<Array>} - Array of country statistics
 */
export const getPermitPerCountry = async () => {
  try {
    console.log('🔵 Starting to fetch permit per country statistics...');
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-country`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Permit Per Country API Response received:', response.data);

    if (response.data && response.data.code === 200 && response.data.data) {
      console.log('✅ Successfully fetched permit per country statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching permit per country:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per sector
 * @returns {Promise<Array>} - Array of sector statistics
 */
export const getPermitPerSector = async () => {
  try {
    console.log('🔵 Starting to fetch permit per sector statistics...');
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-per-sector`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Permit Per Sector API Response received:', response.data);

    if (response.data && response.data.code === 200 && response.data.data) {
      console.log('✅ Successfully fetched permit per sector statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching permit per sector:', error);
    throw error;
  }
};

/**
 * Fetch permit statistics per research location (region)
 * @returns {Promise<Array>} - Array of region statistics
 */
export const getPermitPerRegion = async () => {
  try {
    console.log('🔵 Starting to fetch permit per region statistics...');
    
    const response = await axios.get(`${RIMS_API_BASE_URL}/permit-research-location`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 Permit Per Region API Response received:', response.data);

    if (response.data && response.data.code === 200 && response.data.data) {
      console.log('✅ Successfully fetched permit per region statistics');
      return response.data.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return [];
  } catch (error) {
    console.error('❌ Error fetching permit per region:', error);
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
    console.log(`🔵 Starting to fetch COSTECH funded project ${id} from API...`);
    
    const response = await axios.post(`${PROJECTS_API_BASE_URL}/project/show/${id}`, {}, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 COSTECH Funded Project Detail API Response received:', response.data);

    if (response.data && response.data.id) {
      console.log('✅ Successfully fetched project detail from API');
      return response.data;
    }

    console.warn('⚠️ API returned empty or invalid response');
    return null;
  } catch (error) {
    console.error('❌ Error fetching COSTECH funded project detail:', error);
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

