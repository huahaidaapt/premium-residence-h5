// Global variables
let currentLanguage = 'zh';
let apartments = [];
let translations = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
    loadApartments();
    initializeLanguageSwitcher();
    initModalListeners();
    
    // Check if page was loaded due to refresh after modal open
    if (sessionStorage.getItem('introModalOpen')) {
        openIntroModal();
        sessionStorage.removeItem('introModalOpen');
    }
});

// Load translations
function loadTranslations() {
    fetch('data/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            updateLanguage();
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
}

// Load apartments data
function loadApartments() {
    fetch('data/apartments.json')
        .then(response => response.json())
        .then(data => {
            apartments = data;
            renderApartments(apartments);
        })
        .catch(error => {
            console.error('Error loading apartments:', error);
        });
}

// Render apartments grid
function renderApartments(apartments) {
    const grid = document.getElementById('apartmentsGrid');
    grid.innerHTML = '';

    apartments.forEach((apartment, index) => {
        const card = document.createElement('div');
        card.className = 'apartment-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.onclick = () => openApartmentModal(apartment);

        card.innerHTML = `
            <div class="card-image">
                <img src="${apartment.imageUrl}" alt="${apartment.type} ${apartment.number}">
                <div class="card-badge">${apartment.number}</div>
            </div>
            <div class="card-content">
                <div class="card-type" data-i18n="apartment.type${apartment.type === 'studio' ? 1 : 2}">${apartment.type === 'studio' ? '开间' : '一居室'}</div>
                <div class="card-number">${apartment.number}</div>
                <div class="card-info">
                    <span><i class="fas fa-ruler-combined"></i> ${apartment.area}㎡</span>
                    <span><i class="fas fa-home"></i> ${apartment.floor}F ${apartment.direction}</span>
                </div>
                <div class="card-price">
                    <div class="card-price-label" data-i18n="apartment.price">价格</div>
                    <div class="card-price-value">${apartment.price} ${getCurrencySymbol()}</div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Update all text elements with translations
    updateLanguage();
}

// Initialize language switcher
function initializeLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.lang-btn.active').classList.remove('active');
            this.classList.add('active');
            currentLanguage = this.dataset.lang;
            updateLanguage();
        });
    });
}

// Update page language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Update all apartment cards
    renderApartments(apartments);
}

// Get currency symbol based on language
function getCurrencySymbol() {
    return currentLanguage === 'zh' ? '元/月' : currentLanguage === 'en' ? '¥/month' : 'บาท/เดือน';
}

// Open apartment detail modal
function openApartmentModal(apartment) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="detail-image">
            <img src="${apartment.imageUrl}" alt="${apartment.type} ${apartment.number}">
        </div>
        <div class="detail-info">
            <div class="detail-item">
                <div class="detail-label" data-i18n="modal.type">类型</div>
                <div class="detail-value">${apartment.type === 'studio' ? translations[currentLanguage]['apartment.type1'] : translations[currentLanguage]['apartment.type2']}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label" data-i18n="modal.number">房号</div>
                <div class="detail-value">${apartment.number}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label" data-i18n="modal.area">面积</div>
                <div class="detail-value">${apartment.area}㎡</div>
            </div>
            <div class="detail-item">
                <div class="detail-label" data-i18n="modal.floor">楼层</div>
                <div class="detail-value">${apartment.floor}F ${apartment.direction}</div>
            </div>
            <div class="detail-price">
                <div class="detail-label" data-i18n="modal.price">价格</div>
                <div class="detail-price-value">${apartment.price} ${getCurrencySymbol()}</div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open apartment introduction modal
function openIntroModal() {
    const modal = document.getElementById('introModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Store modal open state in case of refresh
    sessionStorage.setItem('introModalOpen', 'true');
}

// Close apartment introduction modal
function closeIntroModal() {
    const modal = document.getElementById('introModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove modal open state
    sessionStorage.removeItem('introModalOpen');
}

// Initialize modal listeners
function initModalListeners() {
    // Close detail modal when clicking close button
    document.getElementById('closeModal').addEventListener('click', function() {
        const modal = document.getElementById('detailModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close intro modal when clicking close button
    document.getElementById('closeIntroModal').addEventListener('click', closeIntroModal);

    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            document.body.style.overflow = 'auto';
            sessionStorage.removeItem('introModalOpen');
        }
    });

    // Prevent modal from closing when clicking content
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(event) {
            event.终止Propagation();
        });
    });
}

// Copy WeChat ID to clipboard
function copyWeChatId() {
    const wechatId = 'huahaida888';
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(wechatId)
            .then(() => {
                toast.textContent = `${translations[currentLanguage]['contact.copySuccess']} ${wechatId}`;
                toast.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    z-index: 3000;
                    animation: fadeInOut 2s ease-in-out;
                `;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            })
            .catch(err => {
                console.error('Copy failed:', err);
                alert(`${translations[currentLanguage]['contact.copyFailed']} ${wechatId}`);
            });
    } else {
        // Fallback for older 浏览器s
        alert(`${translations[currentLanguage]['contact.copyFailed']} ${wechatId}`);
    }
}

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh data when page becomes visible again
        loadTranslations();
        loadApartments();
    }
});

// Handle back button press to close modal
window.addEventListener('popstate', function(event) {
    const introModal = document.getElementById('introModal');
    const detailModal = document.getElementById('detailModal');
    
    if (introModal.classList.contains('active')) {
        closeIntroModal();
        event.preventDefault();
    } else if (detailModal.classList.contains('active')) {
        detailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        event.preventDefault();
    }
});

// Escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const introModal = document.getElementById('introModal');
        const detailModal = document.getElementById('detailModal');
        
        if (introModal.classList.contains('active')) {
            closeIntroModal();
        } else if (detailModal.classList.contains('active')) {
            detailModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS animations for toasts
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(toastStyle);
