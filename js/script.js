// Main page JavaScript for property display and filtering
class PropertyManager {
    constructor() {
        this.properties = [];
        this.currentFilter = 'all';
        this.currentLanguage = localStorage.getItem('language') || 'en';
        
        this.init();
    }

    init() {
        this.loadProperties();
        this.setupEventListeners();
        this.renderProperties();
        
        // Listen for property updates from admin panel
        window.addEventListener('propertiesUpdated', (e) => {
            this.properties = e.detail.properties;
            this.renderProperties();
        });

        // Listen for storage changes (cross-tab communication)
        window.addEventListener('storage', (e) => {
            if (e.key === 'properties' || e.key === 'propertiesLastUpdated') {
                this.loadProperties();
                this.renderProperties();
            }
        });
    }

    loadProperties() {
        this.properties = JSON.parse(localStorage.getItem('properties') || '[]');
    }

    setupEventListeners() {
        // Filter buttons
        const forSaleBtn = document.getElementById('for-sale-btn');
        const forRentBtn = document.getElementById('for-rent-btn');
        const projectsBtn = document.getElementById('projects-btn');

        if (forSaleBtn) {
            forSaleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterProperties('sale');
            });
        }

        if (forRentBtn) {
            forRentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterProperties('rent');
            });
        }

        if (projectsBtn) {
            projectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterProperties('project');
            });
        }

        // Search form
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = e.target.querySelector('input').value;
                this.searchProperties(searchTerm);
            });
        }
    }

    filterProperties(type) {
        this.currentFilter = type;
        this.renderProperties();
    }

    searchProperties(searchTerm) {
        const filtered = this.properties.filter(property => 
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderFilteredProperties(filtered);
    }

    renderProperties() {
        let filtered = this.properties;
        
        if (this.currentFilter !== 'all') {
            filtered = this.properties.filter(property => property.type === this.currentFilter);
        }
        
        this.renderFilteredProperties(filtered);
    }

    renderFilteredProperties(properties) {
        const grid = document.getElementById('listing-grid');
        if (!grid) return;

        if (properties.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-home" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                    <p>No properties found matching your criteria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = properties.map(property => this.createPropertyCard(property)).join('');
    }

    createPropertyCard(property) {
        const currencySymbol = property.currency === 'ZMW' ? 'ZK' : '$';
        const price = property.price ? `${currencySymbol}${property.price.toLocaleString()}` : 'Price on request';
        
        // Handle multiple images or single image
        const images = property.images || (property.image ? [property.image] : []);
        const mainImage = images.length > 0 ? images[0] : 'static/cadland-logo.png';
        
        // Create image gallery for multiple images
        const imageGallery = images.length > 1 ? `
            <div class="image-gallery">
                <div class="image-indicators">
                    ${images.map((_, index) => `<span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('')}
                </div>
            </div>
        ` : '';
        
        return `
            <div class="property-card" style="max-width: 280px; margin: 10px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div class="property-image" style="height: 180px; overflow: hidden; position: relative; cursor: ${images.length > 1 ? 'pointer' : 'default'};" 
                     ${images.length > 1 ? `onclick="window.openImageModal(${JSON.stringify(images).replace(/"/g, '&quot;')}, '${property.title.replace(/'/g, '\\\'')}')"` : ''}>
                    <img src="${mainImage}" alt="${property.title}" loading="lazy" 
                         onerror="this.src='static/cadland-logo.png'" 
                         style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease;">
                    ${images.length > 1 ? `
                        <div class="image-count" style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">
                            <i class="fas fa-images"></i> ${images.length}
                        </div>
                        <div class="image-nav" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 4px;">
                            ${images.map((_, index) => `<div class="nav-dot ${index === 0 ? 'active' : ''}" style="width: 6px; height: 6px; border-radius: 50%; background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; transition: background 0.3s;"></div>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="property-info" style="padding: 12px;">
                    <h3 class="property-title" style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; line-height: 1.3;">${property.title}</h3>
                    <p class="property-price" style="margin: 0 0 8px 0; font-weight: bold; color: #2c5530; font-size: 16px;">${price}</p>
                    <div class="property-details" style="display: flex; justify-content: space-between; margin-bottom: 12px; padding: 8px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
                        <div class="detail-item" style="text-align: center; flex: 1;">
                            <div style="color: #2c5530; font-size: 16px; font-weight: bold; margin-bottom: 2px;">${property.bedrooms}</div>
                            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Bedrooms</div>
                        </div>
                        <div class="detail-divider" style="width: 1px; background: #eee; margin: 0 8px;"></div>
                        <div class="detail-item" style="text-align: center; flex: 1;">
                            <div style="color: #2c5530; font-size: 16px; font-weight: bold; margin-bottom: 2px;">${property.bathrooms}</div>
                            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Bathrooms</div>
                        </div>
                        <div class="detail-divider" style="width: 1px; background: #eee; margin: 0 8px;"></div>
                        <div class="detail-item" style="text-align: center; flex: 1;">
                            <div style="color: #2c5530; font-size: 16px; font-weight: bold; margin-bottom: 2px;">${property.size}</div>
                            <div style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Sq.m</div>
                        </div>
                    </div>
                    <p class="property-description" style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;">${property.description ? property.description.substring(0, 70) + '...' : ''}</p>
                    ${property.location ? `<a href="${property.location}" target="_blank" class="view-map-btn" style="display: inline-block; color: #2c5530; text-decoration: none; font-size: 12px; margin-top: 4px;">
                        <i class="fas fa-map-marker-alt"></i> View on Map
                    </a>` : ''}
                </div>
            </div>
        `;
    }
}

// Global function for opening image modal
window.openImageModal = function(images, title) {
    // Create modal HTML
    const modalHTML = `
        <div id="imageModal" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.9); z-index: 10000; display: flex; 
            align-items: center; justify-content: center; opacity: 0; 
            transition: opacity 0.3s ease;
        ">
            <div class="modal-content" style="
                position: relative; max-width: 90vw; max-height: 90vh; 
                display: flex; align-items: center; justify-content: center;
            ">
                <button id="closeModal" style="
                    position: absolute; top: -40px; right: 0; background: none; 
                    border: none; color: white; font-size: 30px; cursor: pointer; 
                    z-index: 10001; padding: 5px 10px;
                ">&times;</button>
                
                <button id="prevImage" style="
                    position: absolute; left: -50px; top: 50%; transform: translateY(-50%); 
                    background: rgba(255,255,255,0.2); border: none; color: white; 
                    font-size: 24px; cursor: pointer; padding: 10px 15px; 
                    border-radius: 50%; transition: background 0.3s;
                " onmouseover="this.style.background='rgba(255,255,255,0.4)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">‹</button>
                
                <img id="modalImage" src="${images[0]}" alt="${title}" style="
                    max-width: 100%; max-height: 100%; object-fit: contain; 
                    border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                    transition: transform 0.3s ease;
                ">
                
                <button id="nextImage" style="
                    position: absolute; right: -50px; top: 50%; transform: translateY(-50%); 
                    background: rgba(255,255,255,0.2); border: none; color: white; 
                    font-size: 24px; cursor: pointer; padding: 10px 15px; 
                    border-radius: 50%; transition: background 0.3s;
                " onmouseover="this.style.background='rgba(255,255,255,0.4)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">›</button>
                
                <div class="image-counter" style="
                    position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); 
                    color: white; font-size: 14px; background: rgba(0,0,0,0.5); 
                    padding: 5px 15px; border-radius: 15px;
                ">
                    <span id="currentImageIndex">1</span> / ${images.length}
                </div>
                
                <div class="modal-dots" style="
                    position: absolute; bottom: -70px; left: 50%; transform: translateX(-50%); 
                    display: flex; gap: 8px;
                ">
                    ${images.map((_, index) => `
                        <div class="modal-dot ${index === 0 ? 'active' : ''}" data-index="${index}" style="
                            width: 10px; height: 10px; border-radius: 50%; cursor: pointer;
                            background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.4)'}; 
                            transition: background 0.3s;
                        "></div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('imageModal');
    
    // Show modal with animation
    setTimeout(() => modal.style.opacity = '1', 10);
    
    let currentIndex = 0;
    
    function updateImage(index) {
        const modalImage = document.getElementById('modalImage');
        const counter = document.getElementById('currentImageIndex');
        const dots = document.querySelectorAll('.modal-dot');
        
        modalImage.src = images[index];
        counter.textContent = index + 1;
        
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? 'white' : 'rgba(255,255,255,0.4)';
        });
        
        currentIndex = index;
    }
    
    // Event listeners
    document.getElementById('closeModal').onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    document.getElementById('prevImage').onclick = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(newIndex);
    };
    
    document.getElementById('nextImage').onclick = () => {
        const newIndex = (currentIndex + 1) % images.length;
        updateImage(newIndex);
    };
    
    // Dot navigation
    document.querySelectorAll('.modal-dot').forEach((dot, index) => {
        dot.onclick = () => updateImage(index);
    });
    
    // Keyboard navigation
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        } else if (e.key === 'ArrowLeft') {
            document.getElementById('prevImage').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('nextImage').click();
        }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // Click outside to close
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', handleKeyPress);
            }, 300);
        }
    };
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.propertyManager = new PropertyManager();
});
