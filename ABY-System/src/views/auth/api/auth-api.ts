// Auth modülü için kendi API sistemi
// NOT: Axios yerine fetch kullanıyoruz (eski sistemde çalışan versiyona uygun)

// Environment'dan API base URL'i al
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Token yönetimi için yardımcı fonksiyonlar
export const authHelpers = {
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
  },

  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Token geçerliliği kontrolü
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenPayload.exp && tokenPayload.exp > currentTime;
    } catch {
      return false;
    }
  }
};

// Login API fonksiyonu (eski sistemdeki gibi fetch kullanarak)
export async function loginUser(email: string, password: string) {
  try {
    console.log('Login isteği gönderiliyor:', {
      url: `${API_BASE_URL}/api/v1/auth/login`,
      email: email.trim(),
    });

    // Eski sistemdeki gibi fetch kullan
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password
      })
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    // 404 hatası kontrolü
    if (response.status === 404) {
      throw new Error('Login endpoint bulunamadı. Backend konfigürasyonunu kontrol edin.');
    }

    // Response boş mu kontrol et
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!responseText) {
      throw new Error('Server\'dan boş yanıt alındı.');
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('JSON parse hatası:', jsonError);
      throw new Error('Server\'dan geçersiz JSON yanıtı alındı.');
    }
    
    console.log('Login yanıtı:', data);

    if (!response.ok || !data.token) {
      throw new Error(data.message || 'Giriş işlemi başarısız');
    }

    // Roller assignments'tan türetilerek user objesine eklenir
    if (data.user && Array.isArray(data.user.assignments)) {
      data.user.roles = data.user.assignments.map(a => a.role);
    } else {
      data.user.roles = [];
    }

    return data;
  } catch (error: any) {
    console.error('Login hatası:', error);
    throw error; // Hata mesajını olduğu gibi üst katmana gönder
  }
}

// Logout fonksiyonu
export async function logoutUser() {
  try {
    const token = authHelpers.getToken();
    if (token) {
      await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    // Logout hatası önemli değil, local cleanup yeterli
    console.warn('Logout API hatası:', error);
  } finally {
    // Her durumda local storage'ı temizle
    authHelpers.removeToken();
  }
}

// Kullanıcı bilgilerini güncellemek için API çağrısı
async function refreshUserInfo(): Promise<any> {
  const token = authHelpers.getToken();
  if (!token) {
    throw new Error('Token bulunamadı');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      console.warn('Token geçersiz, kullanıcı çıkış yapılıyor...');
      authHelpers.removeToken();
      window.location.href = '/login';
      throw new Error('Oturum süresi doldu');
    }

    if (!response.ok) {
      throw new Error('Kullanıcı bilgileri alınamadı');
    }

    const userData = await response.json();
    
    // Kullanıcı bilgilerini localStorage'a güncelle
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    console.error('Kullanıcı bilgileri yenileme hatası:', error);
    throw error;
  }
}

// Rol kontrolü yapan helper
function hasRole(requiredRole: string): boolean {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    const userRoles = user.roles || [];
    
    // Admin her şeyi görebilir
    if (userRoles.includes('ADMIN')) return true;
    
    // Gerekli rol kontrolü
    return userRoles.includes(requiredRole);
  } catch (error) {
    console.error('Rol kontrol hatası:', error);
    return false;
  }
}

// API çağrılarında kullanılacak güvenli çağrı fonksiyonu
async function secureApiCall(url: string, options: RequestInit = {}): Promise<Response> {
  const token = authHelpers.getToken();
  if (!token) {
    window.location.href = '/login';
    throw new Error('Token bulunamadı');
  }

  // Default headers ekle
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // 401 durumunda otomatik logout
  if (response.status === 401) {
    console.warn('Token geçersiz, kullanıcı çıkış yapılıyor...');
    authHelpers.removeToken();
    window.location.href = '/login';
    throw new Error('Oturum süresi doldu');
  }

  return response;
}

// Auth API exports
export const authApi = {
  login: loginUser,
  logout: logoutUser,
  refreshUserInfo,
  hasRole,
  secureApiCall
};
