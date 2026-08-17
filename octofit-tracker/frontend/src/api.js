export function getApiBaseUrl(resource = '') {
  const rawValue = import.meta.env.VITE_CODESPACE_NAME;
  const codespaceName = typeof rawValue === 'string' ? rawValue.trim() : '';
  const normalizedResource = String(resource || '').replace(/^\/+|\/+$/g, '');
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return normalizedResource ? `${baseUrl}/api/${normalizedResource}/` : `${baseUrl}/api/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
