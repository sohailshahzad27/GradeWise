// auth.js

/**
 * @fileoverview This file contains the client-side logic for user authentication.
 * It handles user registration, login, logout, and profile retrieval.
 */

// Base URL for API requests (modify if your API is hosted elsewhere)
const API_BASE_URL = ''; // Example: 'https://api.example.com'

/**
 * Registers a new user by sending a POST request to the server.
 *
 * @param {string} username - The user's username.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - A promise that resolves with the server's response data.
 * @throws {Error} - Throws an error if the registration fails.
 */
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw a more specific error message from the server if available.
      throw new Error(data.message || `Registration failed: ${response.statusText}`);
    }

    // Store token and user data
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Logs in an existing user by sending a POST request to the server.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} - A promise that resolves with the server's response data.
 * @throws {Error} - Throws an error if the login fails.
 */
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Throw a more specific error message from the server if available.
      throw new Error(data.message || `Login failed: ${response.statusText}`);
    }

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    return data;
  } catch (error) {
    // Handle JSON parse errors (e.g., HTML response)
    if (error instanceof SyntaxError) {
      throw new Error('Server returned invalid response');
    }
    throw error;
  }
}

/**
 * Retrieves the current user's profile from the server.
 *
 * @returns {Promise<object>} - A promise that resolves with the user's profile data.
 * @throws {Error} - Throws an error if the profile retrieval fails.
 */
async function getUserProfile() {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
        // Throw a more specific error message from the server if available.
      throw new Error(data.message || `Failed to fetch profile: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
}

/**
 * Checks if a user is currently logged in.
 *
 * @returns {boolean} - True if the user is logged in, false otherwise.
 */
function isLoggedIn() {
  return localStorage.getItem('authToken') !== null;
}

/**
 * Logs out the current user by clearing the authentication token and user data.
 */
function logoutUser() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
}

/**
 * Protects a page by redirecting to the login page if the user is not logged in.
 */
function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

/**
 * Redirects to the profile page if the user is already logged in.
 */
function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = 'profile.html';
  }
}

/**
 * Displays an error message to the user.
 *
 * @param {string} message - The error message to display.
 * @param {string} [elementId='error-message'] - The ID of the HTML element to display the error in.
 *                                               If not provided, an alert will be used.
 */
function showError(message, elementId = 'error-message') {
    // Check if message is null, undefined, or an empty string
    if (!message) {
      console.warn("showError called with an empty or null message");
      return; // Exit the function
    }
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  } else {
    alert(message);
  }
}