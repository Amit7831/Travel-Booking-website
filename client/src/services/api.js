// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────
export const destinationAPI = {
  getAll:    (params = {}) => fetch(`${BASE_URL}/destinations?${new URLSearchParams(params)}`).then(handleResponse),
  getOne:    (id)          => fetch(`${BASE_URL}/destinations/${id}`).then(handleResponse),
  create:    (data)        => fetch(`${BASE_URL}/destinations`, { method:"POST", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  update:    (id, data)    => fetch(`${BASE_URL}/destinations/${id}`, { method:"PUT", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  delete:    (id)          => fetch(`${BASE_URL}/destinations/${id}`, { method:"DELETE", headers:getHeaders() }).then(handleResponse),
};

// ─── CARS ──────────────────────────────────────────────────────────────────────
export const carAPI = {
  getAll:    (params = {}) => fetch(`${BASE_URL}/cars?${new URLSearchParams(params)}`).then(handleResponse),
  getOne:    (id)          => fetch(`${BASE_URL}/cars/${id}`).then(handleResponse),
  create:    (data)        => fetch(`${BASE_URL}/cars`, { method:"POST", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  update:    (id, data)    => fetch(`${BASE_URL}/cars/${id}`, { method:"PUT", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  delete:    (id)          => fetch(`${BASE_URL}/cars/${id}`, { method:"DELETE", headers:getHeaders() }).then(handleResponse),
};

// ─── HOTELS ───────────────────────────────────────────────────────────────────
export const hotelAPI = {
  getAll:    (params = {}) => fetch(`${BASE_URL}/hotels?${new URLSearchParams(params)}`).then(handleResponse),
  getOne:    (id)          => fetch(`${BASE_URL}/hotels/${id}`).then(handleResponse),
  create:    (data)        => fetch(`${BASE_URL}/hotels`, { method:"POST", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  update:    (id, data)    => fetch(`${BASE_URL}/hotels/${id}`, { method:"PUT", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  delete:    (id)          => fetch(`${BASE_URL}/hotels/${id}`, { method:"DELETE", headers:getHeaders() }).then(handleResponse),
};

// ─── FLIGHTS ──────────────────────────────────────────────────────────────────
export const flightAPI = {
  getAll:    (params = {}) => fetch(`${BASE_URL}/flights?${new URLSearchParams(params)}`).then(handleResponse),
  getOne:    (id)          => fetch(`${BASE_URL}/flights/${id}`).then(handleResponse),
  create:    (data)        => fetch(`${BASE_URL}/flights`, { method:"POST", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  update:    (id, data)    => fetch(`${BASE_URL}/flights/${id}`, { method:"PUT", headers:getHeaders(), body:JSON.stringify(data) }).then(handleResponse),
  delete:    (id)          => fetch(`${BASE_URL}/flights/${id}`, { method:"DELETE", headers:getHeaders() }).then(handleResponse),
};
