import router from '@/router';

// API çağrılarında hata yakalama ve token kontrolü için interceptor
export const setupApiInterceptors = () => {
    // Fetch API'yi wrap ediyoruz
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        try {
            const response = await originalFetch(input, init);
            
            // 401 Unauthorized hatası gelirse token süresi dolmuş demektir
            if (response.status === 401) {
                handleUnauthorized();
            }
            
            return response;
        } catch (error) {
            throw error;
        }
    };
};

// 401 hatasında çalışacak fonksiyon
const handleUnauthorized = () => {
    // Sadece token varken 401 gelirse işlem yap
    const token = localStorage.getItem('token');
    if (!token) return;
    
    console.warn('Token süresi doldu, otomatik çıkış yapılıyor...');
    
    // Token'ı ve kullanıcı bilgilerini temizle
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Login sayfasına yönlendir (sadece login sayfasında değilsek)
    if (router.currentRoute.value.path !== '/auth/boxed-signin') {
        router.push('/auth/boxed-signin');
    }
};

// Token geçerliliğini manuel olarak kontrol etme fonksiyonu
export const checkTokenValidity = (): boolean => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    }
    
    try {
        // JWT token'ın payload kısmını çöz
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Token süresi dolmuşsa
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
            handleUnauthorized();
            return false;
        }
        
        return true;
    } catch (error) {
        // Token parse edilemiyorsa geçersiz kabul et
        handleUnauthorized();
        return false;
    }
};

// Periyodik token kontrolü (her 30 saniyede bir)
export const startTokenCheck = () => {
    setInterval(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenValidity();
        }
    }, 30000); // 30 saniye
};
