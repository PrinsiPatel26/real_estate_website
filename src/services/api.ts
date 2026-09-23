export const API_BASE_URL = (() => {
  const configuredBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const isLocalhost = currentHost === 'localhost' || currentHost === '127.0.0.1';

  return isLocalhost ? 'http://localhost:5000/api' : `${window.location.origin}/api`;
})();

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  admin: AdminUser;
}

interface MeResponse {
  success: boolean;
  admin: AdminUser;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password');
    }

    if (response.status === 404) {
      throw new Error('Authentication service not found');
    }

    if (response.status >= 500) {
      throw new Error('Authentication service temporarily unavailable');
    }

    throw new Error(body?.message || 'Request failed');
  }

  return body as T;
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  return parseResponse<AuthResponse>(response);
}

export async function getCurrentAdmin(token: string) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return parseResponse<MeResponse>(response);
}

export async function getPublicCollection<T>(resource: string) {
  const response = await fetch(`${API_BASE_URL}/${resource}`);
  return parseResponse<{ success: boolean; data: T[] }>(response);
}

export async function createEnquiry(payload: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return parseResponse<{ success: boolean; data: { id: string } }>(response);
}

export async function getAdminCollection<T>(resource: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/${resource}/admin/all`, { headers: { Authorization: `Bearer ${token}` } });
  return parseResponse<{ success: boolean; data: T[] }>(response);
}

export async function createAdminRecord<T>(resource: string, payload: Record<string, unknown>, token: string) {
  const response = await fetch(`${API_BASE_URL}/${resource}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
  return parseResponse<{ success: boolean; data: T }>(response);
}

export function uploadProjectImage(file: File, token: string, onProgress?: (progress: number) => void) {
  return new Promise<{ success: boolean; data: { url: string; alt: string; isFeatured: boolean; order: number } }>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', `${API_BASE_URL}/uploads/project-image`);
    request.timeout = 60_000;
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    });
    request.addEventListener('load', () => {
      let body: { success?: boolean; message?: string; data?: { url: string; alt: string; isFeatured: boolean; order: number } };
      try {
        body = JSON.parse(request.responseText || '{}') as typeof body;
      } catch {
        reject(new Error('Upload failed. Please try again.'));
        return;
      }
      if (request.status >= 200 && request.status < 300 && body.success && body.data?.url) {
        resolve(body);
      } else {
        reject(new Error(body.message || 'Unable to upload image.'));
      }
    });
    request.addEventListener('error', () => reject(new Error('Unable to upload image.')));
    request.addEventListener('timeout', () => reject(new Error('Upload timed out. Please try again.')));
    request.addEventListener('abort', () => reject(new Error('Image upload was cancelled.')));

    const formData = new FormData();
    formData.append('image', file);
    request.send(formData);
  });
}

export async function updateAdminRecord<T>(resource: string, id: string, payload: Record<string, unknown>, token: string) {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
  return parseResponse<{ success: boolean; data: T }>(response);
}

export async function deleteAdminRecord(resource: string, id: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  return parseResponse<{ success: boolean }>(response);
}

export async function getDashboardStats(token: string) {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } });
  return parseResponse<{ success: boolean; data: { properties: number; projects: number; blogs: number; newEnquiries: number } }>(response);
}
