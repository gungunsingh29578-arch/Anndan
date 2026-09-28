(() => {
  const origin = window.location.origin || "";
  const fromFile = origin.startsWith("file:");
  const API_BASE = window.ANNADAN_API_BASE || (fromFile ? "http://localhost:5000/api" : `${origin}/api`);
  const SOCKET_URL = window.ANNADAN_SOCKET_URL || (fromFile ? "http://localhost:5000" : origin);

  const tokenKey = "annadanToken";
  const profileKey = "annadanProfile";

  const getToken = () => localStorage.getItem(tokenKey) || "";
  const getProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(profileKey) || "null");
    } catch (error) {
      return null;
    }
  };

  const setSession = (token, profile) => {
    if (token) localStorage.setItem(tokenKey, token);
    if (profile) {
      const safe = { ...profile };
      delete safe.password;
      localStorage.setItem(profileKey, JSON.stringify(safe));
    }
  };

  const clearSession = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(profileKey);
  };

  const request = async (path, options = {}) => {
    const headers = { ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const isForm = typeof FormData !== "undefined" && options.body instanceof FormData;
    if (!isForm && options.body && typeof options.body === "object" && !(options.body instanceof Blob)) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(options.body);
    }
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }
    if (!response.ok) {
      const error = new Error(data.message || "Request failed.");
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  };

  window.AnnadanAPI = { API_BASE, SOCKET_URL, getToken, getProfile, setSession, clearSession, request };
})();
