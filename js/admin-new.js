// Modern Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentLanguage = localStorage.getItem('adminLanguage') || 'tr';
        this.currentSection = 'dashboard';
        this.editingAgent = null;
        this.editingProperty = null;
        
        this.translations = {
            tr: {
                adminPanel: 'Admin Panel',
                dashboard: 'Dashboard',
                propertyManagement: 'İlan Yönetimi',
                addListing: 'İlan Ekle',
                agentManagement: 'Danışman Yönetimi',
                inquiries: 'Talepler',
                contentManagement: 'İçerik Yönetimi',
                dashboardDesc: 'Genel istatistikler ve özet bilgiler',
                propertyManagementDesc: 'Mevcut ilanları görüntüle, düzenle ve sil',
                addListingDesc: 'Yeni emlak ilanı ekle',
                agentManagementDesc: 'Danışmanları yönet',
                inquiriesDesc: 'Müşteri talepleri ve mesajları',
                contentManagementDesc: 'Sayfa içeriklerini düzenle',
                totalListings: 'Toplam İlan',
                forSaleListings: 'Satılık İlan',
                forRentListings: 'Kiralık İlan',
                totalInquiries: 'Toplam Talep',
                thisMonth: 'Bu ay',
                active: 'Aktif',
                pending: 'Beklemede',
                salesChart: 'Satış Grafiği',
                title: 'Başlık',
                type: 'Tür',
                price: 'Fiyat',
                bedrooms: 'Oda',
                bathrooms: 'Banyo',
                size: 'Metrekare',
                date: 'Tarih',
                actions: 'İşlemler',
                name: 'İsim',
                email: 'E-posta',
                role: 'Rol',
                status: 'Durum',
                property: 'İlan',
                description: 'Açıklama',
                image: 'Resim URL',
                location: 'Google Maps URL',
                save: 'Kaydet',
                edit: 'Düzenle',
                delete: 'Sil',
                view: 'Görüntüle',
                forSale: 'Satılık',
                forRent: 'Kiralık',
                project: 'Proje',
                addAgent: 'Danışman Ekle',
                agentDetails: 'Danışman Detayları',
                inquiryDetails: 'Talep Detayları',
                agent: 'Danışman',
                manager: 'Müdür',
                admin: 'Admin',
                inactive: 'Pasif',
                cancel: 'İptal',
                selectPage: 'Sayfa Seç',
                aboutUs: 'Hakkımızda',
                privacyPolicy: 'Gizlilik Politikası',
                content: 'İçerik',
                saveContent: 'İçeriği Kaydet',
                contentSaved: 'İçerik başarıyla kaydedildi!',
                confirmDelete: 'Bu kaydı silmek istediğinizden emin misiniz?',
                propertyAdded: 'İlan başarıyla eklendi!',
                propertyUpdated: 'İlan başarıyla güncellendi!',
                propertyDeleted: 'İlan başarıyla silindi!',
                agentAdded: 'Danışman başarıyla eklendi!',
                agentUpdated: 'Danışman başarıyla güncellendi!',
                update: 'Güncelle',
                new: 'Yeni',
                contacted: 'İletişim Kuruldu',
                completed: 'Tamamlandı',
                backToHome: 'Ana Sayfaya Dön',
                photo: 'Fotoğraf',
                photoHint: 'Agent fotoğrafı yükleyin (opsiyonel)',
                phone: 'Telefon',
                specialty: 'Uzmanlık Alanı',
                specialtyPlaceholder: 'Örn: Lüks Konutlar, Ticari Gayrimenkul'
            },
            en: {
                adminPanel: 'Admin Panel',
                dashboard: 'Dashboard',
                propertyManagement: 'Property Management',
                addListing: 'Add Listing',
                agentManagement: 'Agent Management',
                inquiries: 'Inquiries',
                contentManagement: 'Content Management',
                dashboardDesc: 'General statistics and summary information',
                propertyManagementDesc: 'View, edit and delete existing listings',
                addListingDesc: 'Add new real estate listing',
                agentManagementDesc: 'Manage agents',
                inquiriesDesc: 'Customer inquiries and messages',
                contentManagementDesc: 'Edit page contents',
                totalListings: 'Total Listings',
                forSaleListings: 'For Sale Listings',
                forRentListings: 'For Rent Listings',
                totalInquiries: 'Total Inquiries',
                thisMonth: 'This month',
                active: 'Active',
                pending: 'Pending',
                salesChart: 'Sales Chart',
                title: 'Title',
                type: 'Type',
                price: 'Price',
                bedrooms: 'Bedrooms',
                bathrooms: 'Bathrooms',
                size: 'Square Meters',
                date: 'Date',
                actions: 'Actions',
                name: 'Name',
                email: 'Email',
                role: 'Role',
                status: 'Status',
                property: 'Property',
                description: 'Description',
                image: 'Image URL',
                location: 'Google Maps URL',
                save: 'Save',
                edit: 'Edit',
                delete: 'Delete',
                view: 'View',
                forSale: 'For Sale',
                forRent: 'For Rent',
                project: 'Project',
                addAgent: 'Add Agent',
                agentDetails: 'Agent Details',
                inquiryDetails: 'Inquiry Details',
                agent: 'Agent',
                manager: 'Manager',
                admin: 'Admin',
                inactive: 'Inactive',
                cancel: 'Cancel',
                selectPage: 'Select Page',
                aboutUs: 'About Us',
                privacyPolicy: 'Privacy Policy',
                content: 'Content',
                saveContent: 'Save Content',
                contentSaved: 'Content saved successfully!',
                confirmDelete: 'Are you sure you want to delete this record?',
                propertyAdded: 'Property added successfully!',
                propertyUpdated: 'Property updated successfully!',
                propertyDeleted: 'Property deleted successfully!',
                agentAdded: 'Agent added successfully!',
                agentUpdated: 'Agent updated successfully!',
                update: 'Update',
                new: 'New',
                contacted: 'Contacted',
                completed: 'Completed',
                backToHome: 'Back to Home',
                photo: 'Photo',
                photoHint: 'Upload agent photo (optional)',
                phone: 'Phone',
                specialty: 'Specialty',
                specialtyPlaceholder: 'e.g: Luxury Homes, Commercial Real Estate'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardStats();
        this.loadPropertiesTable();
        this.loadAgentsTable();
        this.loadInquiriesTable();
        this.loadContentEditor();
        this.setLanguage(this.currentLanguage);
        this.createSampleData();
    }

    setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });

        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.showSection(section);
            });
        });

        // Property form
        document.getElementById('property-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProperty();
        });

        // Agent modal
        document.getElementById('add-agent-btn').addEventListener('click', () => {
            this.showAgentModal();
        });

        document.getElementById('agent-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAgent();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Content management
        document.getElementById('save-content-btn').addEventListener('click', () => {
            this.saveContent();
        });

        document.getElementById('page-selector').addEventListener('change', () => {
            this.loadContentEditor();
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Global event delegation for dynamic buttons
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;

            e.preventDefault();
            e.stopPropagation();
            
            const action = button.getAttribute('data-action');
            const id = parseInt(button.getAttribute('data-id'));
            
            // Validate ID
            if (!id || isNaN(id)) {
                console.error('Invalid ID for action:', action, id);
                return;
            }

            // Property actions
            if (button.closest('#properties-table')) {
                if (action === 'edit') {
                    this.editProperty(id);
                } else if (action === 'delete') {
                    this.deleteProperty(id);
                }
            }
            // Agent actions
            else if (button.closest('#agents-table')) {
                if (action === 'edit') {
                    this.editAgent(id);
                } else if (action === 'delete') {
                    this.deleteAgent(id);
                }
            }
            // Inquiry actions
            else if (button.closest('#inquiries-table')) {
                if (action === 'view') {
                    this.viewInquiry(id);
                } else if (action === 'delete') {
                    this.deleteInquiry(id);
                }
            }
        });
    }

    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('adminLanguage', lang);

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.t(key);
        });
        
        // Update placeholder texts
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.t(key);
        });

        // Refresh tables and content
        this.loadPropertiesTable();
        this.loadAgentsTable();
        this.loadInquiriesTable();
        this.loadDashboardStats();
    }

    showSection(sectionId) {
        // Update menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        this.currentSection = sectionId;

        // Load section-specific data
        if (sectionId === 'dashboard') {
            this.loadDashboardStats();
            // Delay chart rendering to ensure canvas is visible
            setTimeout(() => {
                this.renderChart();
            }, 100);
        }
    }

    // Data management functions
    getProperties() {
        return JSON.parse(localStorage.getItem('properties') || '[]');
    }

    saveProperties(properties) {
        localStorage.setItem('properties', JSON.stringify(properties));
    }

    getAgents() {
        const stored = localStorage.getItem('agents');
        let agents = stored ? JSON.parse(stored) : [];
        
        // Ensure all agents have IDs
        agents = agents.map((agent, index) => {
            if (!agent.id) {
                agent.id = Date.now() + index;
            }
            return agent;
        });
        
        // Save back if we added IDs
        if (agents.length > 0 && stored) {
            this.saveAgents(agents);
        }
        
        return agents;
    }

    saveAgents(agents) {
        localStorage.setItem('agents', JSON.stringify(agents));
    }

    getInquiries() {
        const stored = localStorage.getItem('inquiries');
        let inquiries = stored ? JSON.parse(stored) : [];
        
        // Ensure all inquiries have IDs
        inquiries = inquiries.map((inquiry, index) => {
            if (!inquiry.id) {
                inquiry.id = Date.now() + index;
            }
            return inquiry;
        });
        
        // Save back if we added IDs
        if (inquiries.length > 0 && stored) {
            this.saveInquiries(inquiries);
        }
        
        return inquiries;
    }

    saveInquiries(inquiries) {
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    }

    // Property functions
    addProperty() {
        const form = document.getElementById('property-form');
        const formData = new FormData(form);
        
        // Handle image upload or URL
        let imageUrl = formData.get('imageUrl') || '';
        const imageFiles = document.querySelector('input[name="imageFiles"]').files;
        
        if (imageFiles && imageFiles.length > 0) {
            // Handle multiple images
            const imagePromises = [];
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const promise = new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });
                imagePromises.push(promise);
            }
            
            Promise.all(imagePromises).then((images) => {
                this.savePropertyWithImage(formData, images);
            });
        } else {
            this.savePropertyWithImage(formData, imageUrl ? [imageUrl] : []);
        }
    }

    savePropertyWithImage(formData, images) {
        const properties = this.getProperties();
        
        if (this.editingPropertyId) {
            // Update existing property
            const index = properties.findIndex(p => p.id === this.editingPropertyId);
            if (index !== -1) {
                properties[index] = {
                    ...properties[index],
                    title: formData.get('title'),
                    price: parseFloat(formData.get('price')),
                    currency: formData.get('currency'),
                    type: formData.get('type'),
                    bedrooms: parseInt(formData.get('bedrooms')) || 0,
                    bathrooms: parseInt(formData.get('bathrooms')) || 0,
                    size: parseInt(formData.get('size')) || 0,
                    description: formData.get('description'),
                    images: images,
                    image: images[0] || '',
                    location: formData.get('location')
                };
                this.showAlert('success', this.t('propertyUpdated') || 'İlan güncellendi!');
            }
            this.editingPropertyId = null;
        } else {
            // Add new property
            const property = {
                id: Date.now(),
                title: formData.get('title'),
                price: parseFloat(formData.get('price')),
                currency: formData.get('currency'),
                type: formData.get('type'),
                bedrooms: parseInt(formData.get('bedrooms')) || 0,
                bathrooms: parseInt(formData.get('bathrooms')) || 0,
                size: parseInt(formData.get('size')) || 0,
                description: formData.get('description'),
                images: images,
                image: images[0] || '',
                location: formData.get('location'),
                date: new Date().toISOString()
            };
            properties.push(property);
            this.showAlert('success', this.t('propertyAdded'));
        }

        this.saveProperties(properties);
        document.getElementById('property-form').reset();
        
        // Reset submit button text
        const submitBtn = document.querySelector('#property-form button[type="submit"]');
        submitBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save">${this.t('save')}</span>`;
        
        this.loadPropertiesTable();
        this.loadDashboardStats();
        this.syncWithMainPage();
    }

    deleteProperty(id) {
        if (confirm(this.t('confirmDelete'))) {
            // Convert both IDs to numbers for safe comparison
            const numericId = parseInt(id);
            const properties = this.getProperties().filter(p => parseInt(p.id) !== numericId);
            this.saveProperties(properties);
            this.loadPropertiesTable();
            this.loadDashboardStats();
            this.showAlert('success', this.t('propertyDeleted') || 'İlan silindi!');
            
            // Trigger update on main page if it's open
            this.syncWithMainPage();
        }
    }

    loadPropertiesTable() {
        const tbody = document.getElementById('properties-table');
        const properties = this.getProperties();

        if (!tbody) return;

        tbody.innerHTML = properties.map(property => {
            const currencySymbol = property.currency === 'ZMW' ? 'ZK' : '$';
            return `
            <tr>
                <td>${property.title}</td>
                <td>${this.t(property.type)}</td>
                <td>${currencySymbol}${property.price.toLocaleString()}</td>
                <td>${property.bedrooms}</td>
                <td>${new Date(property.date).toLocaleDateString()}</td>
                <td class="action-buttons">
                    <button class="btn btn-warning btn-sm" data-action="edit" data-id="${property.id}">
                        ${this.t('edit')}
                    </button>
                    <button class="btn btn-danger btn-sm" data-action="delete" data-id="${property.id}">
                        ${this.t('delete')}
                    </button>
                </td>
            </tr>
        `}).join('');
    }


    editProperty(id) {
        const property = this.getProperties().find(p => parseInt(p.id) === parseInt(id));
        if (property) {
            // Switch to add property section and populate form
            this.showSection('add-property');
            
            // Populate form with existing data
            const form = document.getElementById('property-form');
            form.title.value = property.title;
            form.price.value = property.price;
            form.currency.value = property.currency || 'USD';
            form.type.value = property.type;
            form.bedrooms.value = property.bedrooms;
            form.bathrooms.value = property.bathrooms;
            form.size.value = property.size;
            form.description.value = property.description;
            form.imageUrl.value = property.image || '';
            form.location.value = property.location;
            
            // Store editing property ID
            this.editingPropertyId = parseInt(id);
            
            // Change form submit button text
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update">${this.t('update') || 'Güncelle'}</span>`;
        }
    }

    editAgent(id) {
        const agent = this.getAgents().find(a => a.id === id);
        if (agent) {
            this.showAgentModal(agent);
        }
    }

    // Agent functions
    showAgentModal(agent = null) {
        this.editingAgent = agent;
        const modal = document.getElementById('agent-modal');
        const form = document.getElementById('agent-form');

        if (agent) {
            form.name.value = agent.name;
            form.email.value = agent.email;
            form.phone.value = agent.phone || '';
            form.specialty.value = agent.specialty || '';
            form.role.value = agent.role;
            form.status.value = agent.status;
        } else {
            form.reset();
        }

        modal.classList.add('active');
    }

    saveAgent() {
        const form = document.getElementById('agent-form');
        const formData = new FormData(form);
        
        // Handle photo upload
        const photoFile = form.photo.files[0];
        
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.saveAgentWithPhoto(formData, e.target.result);
            };
            reader.readAsDataURL(photoFile);
        } else {
            this.saveAgentWithPhoto(formData, null);
        }
    }
    
    saveAgentWithPhoto(formData, photoData) {
        const agent = {
            id: this.editingAgent ? this.editingAgent.id : Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            specialty: formData.get('specialty') || '',
            role: formData.get('role'),
            status: formData.get('status'),
            photo: photoData || (this.editingAgent ? this.editingAgent.photo : ''),
            date: this.editingAgent ? this.editingAgent.date : new Date().toISOString()
        };

        const agents = this.getAgents();
        
        if (this.editingAgent) {
            const index = agents.findIndex(a => a.id === this.editingAgent.id);
            agents[index] = agent;
            this.showAlert('success', this.t('agentUpdated'));
        } else {
            agents.push(agent);
            this.showAlert('success', this.t('agentAdded'));
        }

        this.saveAgents(agents);
        this.closeModals();
        this.loadAgentsTable();
        this.syncAgentsWithMainPage();
    }
    
    syncAgentsWithMainPage() {
        // Dispatch event to notify main page of agent changes
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('agentsUpdated', {
                detail: { agents: this.getAgents() }
            });
            window.dispatchEvent(event);
            
            // Also trigger storage event for cross-tab communication
            window.localStorage.setItem('agentsLastUpdated', Date.now().toString());
        }
    }

    deleteAgent(id) {
        if (confirm(this.t('confirmDelete'))) {
            const agents = this.getAgents().filter(a => a.id !== id);
            this.saveAgents(agents);
            this.loadAgentsTable();
        }
    }

    loadAgentsTable() {
        const tbody = document.getElementById('agents-table');
        const agents = this.getAgents();

        if (!tbody) return;

        tbody.innerHTML = agents.map(agent => `
            <tr>
                <td>${agent.name}</td>
                <td>${agent.email}</td>
                <td>${this.t(agent.role)}</td>
                <td><span class="badge ${agent.status}">${this.t(agent.status)}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-warning btn-sm" data-action="edit" data-id="${agent.id}">
                        ${this.t('edit')}
                    </button>
                    <button class="btn btn-danger btn-sm" data-action="delete" data-id="${agent.id}">
                        ${this.t('delete')}
                    </button>
                </td>
            </tr>
        `).join('');
    }


    // Inquiry functions
    loadInquiriesTable() {
        const tbody = document.getElementById('inquiries-table');
        const inquiries = this.getInquiries();

        if (!tbody) return;

        tbody.innerHTML = inquiries.map(inquiry => `
            <tr>
                <td>${inquiry.name}</td>
                <td>${inquiry.email}</td>
                <td>${inquiry.property}</td>
                <td><span class="badge ${inquiry.status}">${this.t(inquiry.status)}</span></td>
                <td>${new Date(inquiry.date).toLocaleDateString()}</td>
                <td class="action-buttons">
                    <button class="btn btn-primary btn-sm" data-action="view" data-id="${inquiry.id}">
                        ${this.t('view')}
                    </button>
                    <button class="btn btn-danger btn-sm" data-action="delete" data-id="${inquiry.id}">
                        ${this.t('delete')}
                    </button>
                </td>
            </tr>
        `).join('');
    }


    viewInquiry(id) {
        const inquiry = this.getInquiries().find(i => i.id === id);
        if (inquiry) {
            const modal = document.getElementById('inquiry-modal');
            const details = document.getElementById('inquiry-details');
            
            details.innerHTML = `
                <div class="form-group">
                    <p><strong>${this.t('name')}:</strong> ${inquiry.name}</p>
                    <p><strong>${this.t('email')}:</strong> ${inquiry.email}</p>
                    <p><strong>${this.t('property')}:</strong> ${inquiry.property || 'N/A'}</p>
                    <p><strong>${this.t('status')}:</strong> <span class="badge ${inquiry.status}">${this.t(inquiry.status)}</span></p>
                    <p><strong>${this.t('date')}:</strong> ${new Date(inquiry.date).toLocaleDateString()}</p>
                </div>
                <div class="form-group" style="margin-top: 20px;">
                    <strong>${this.t('message') || 'Mesaj'}:</strong>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 8px; border: 1px solid #dee2e6; min-height: 60px; line-height: 1.5;">
                        ${inquiry.message || 'Mesaj bulunamadı'}
                    </div>
                </div>
                <div class="form-group" style="margin-top: 20px;">
                    <label><strong>${this.t('status')} ${this.t('update') || 'Güncelle'}:</strong></label>
                    <select id="inquiry-status-select" class="form-control" style="margin-bottom: 15px;">
                        <option value="new" ${inquiry.status === 'new' ? 'selected' : ''}>${this.t('new')}</option>
                        <option value="contacted" ${inquiry.status === 'contacted' ? 'selected' : ''}>${this.t('contacted')}</option>
                        <option value="completed" ${inquiry.status === 'completed' ? 'selected' : ''}>${this.t('completed')}</option>
                    </select>
                    <button class="btn btn-primary" onclick="window.adminPanel.updateInquiryStatus(${id})">
                        ${this.t('update') || 'Güncelle'}
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
        }
    }

    updateInquiryStatus(id) {
        const newStatus = document.getElementById('inquiry-status-select').value;
        const inquiries = this.getInquiries();
        const index = inquiries.findIndex(i => i.id === id);
        
        if (index !== -1) {
            inquiries[index].status = newStatus;
            this.saveInquiries(inquiries);
            this.loadInquiriesTable();
            this.closeModals();
            this.showAlert('success', 'Talep durumu güncellendi!');
        }
    }

    // Sync changes with main page
    syncWithMainPage() {
        // Dispatch a custom event to notify main page of property changes
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('propertiesUpdated', {
                detail: { properties: this.getProperties() }
            });
            window.dispatchEvent(event);
            
            // Also trigger storage event for cross-tab communication
            window.localStorage.setItem('propertiesLastUpdated', Date.now().toString());
        }
    }

    deleteInquiry(id) {
        if (confirm(this.t('confirmDelete'))) {
            const inquiries = this.getInquiries().filter(i => i.id !== id);
            this.saveInquiries(inquiries);
            this.loadInquiriesTable();
            this.loadDashboardStats();
        }
    }

    // Content management
    loadContentEditor() {
        const selector = document.getElementById('page-selector');
        const editor = document.getElementById('content-editor');
        const page = selector.value;
        
        const content = localStorage.getItem(`content_${page}_${this.currentLanguage}`) || '';
        editor.value = content;
    }

    saveContent() {
        const selector = document.getElementById('page-selector');
        const editor = document.getElementById('content-editor');
        const page = selector.value;
        const content = editor.value;

        localStorage.setItem(`content_${page}_${this.currentLanguage}`, content);
        
        // Update the actual website content
        this.updateWebsiteContent(page, content);
        
        this.showAlert('success', this.t('contentSaved'));
    }

    updateWebsiteContent(page, content) {
        // Update content in other pages (contact.html, index.html)
        const contentKey = page === 'about' ? 'about-us-content' : 'privacy-policy-content';
        
        // Store for use in other pages
        localStorage.setItem(`website_${contentKey}_${this.currentLanguage}`, content);
        
        // Try to update the content immediately if we're on the same domain
        try {
            // Update contact page content sections if they exist
            const aboutSection = document.getElementById('about-us-content');
            const privacySection = document.getElementById('privacy-policy-content');
            
            if (page === 'about' && aboutSection) {
                aboutSection.innerHTML = `<p>${content}</p>`;
            } else if (page === 'privacy' && privacySection) {
                privacySection.innerHTML = `<p>${content}</p>`;
            }
            
            // Also store the content for contact.html to pick up
            if (page === 'about') {
                localStorage.setItem('about_content_tr', this.currentLanguage === 'tr' ? content : localStorage.getItem('about_content_tr') || '');
                localStorage.setItem('about_content_en', this.currentLanguage === 'en' ? content : localStorage.getItem('about_content_en') || '');
            } else {
                localStorage.setItem('privacy_content_tr', this.currentLanguage === 'tr' ? content : localStorage.getItem('privacy_content_tr') || '');
                localStorage.setItem('privacy_content_en', this.currentLanguage === 'en' ? content : localStorage.getItem('privacy_content_en') || '');
            }
        } catch (error) {
            console.log('Content will be updated on next page load');
        }
    }

    // Dashboard functions
    loadDashboardStats() {
        const properties = this.getProperties();
        const inquiries = this.getInquiries();

        document.getElementById('total-properties').textContent = properties.length;
        document.getElementById('sale-properties').textContent = properties.filter(p => p.type === 'sale').length;
        document.getElementById('rent-properties').textContent = properties.filter(p => p.type === 'rent').length;
        document.getElementById('total-inquiries').textContent = inquiries.length;
    }

    renderChart() {
        const ctx = document.getElementById('salesChart');
        if (ctx && window.Chart) {
            // Destroy existing chart if it exists
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            const properties = this.getProperties();
            const saleCount = properties.filter(p => p.type === 'sale').length;
            const rentCount = properties.filter(p => p.type === 'rent').length;
            const projectCount = properties.filter(p => p.type === 'project').length;

            // Only create chart if there's data
            if (saleCount + rentCount + projectCount > 0) {
                this.chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [this.t('forSale'), this.t('forRent'), this.t('project')],
                        datasets: [{
                            data: [saleCount, rentCount, projectCount],
                            backgroundColor: ['#7fb069', '#a3d9a5', '#5a8a4a'],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 20,
                                    usePointStyle: true
                                }
                            }
                        }
                    }
                });
            } else {
                // Show message when no data
                ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
                const context = ctx.getContext('2d');
                context.font = '16px Arial';
                context.fillStyle = '#666';
                context.textAlign = 'center';
                context.fillText('Henüz veri bulunmuyor', ctx.width / 2, ctx.height / 2);
            }
        } else if (ctx) {
            // Fallback if Chart.js is not loaded
            const context = ctx.getContext('2d');
            context.font = '16px Arial';
            context.fillStyle = '#666';
            context.textAlign = 'center';
            context.fillText('Grafik yükleniyor...', ctx.width / 2, ctx.height / 2);
        }
    }

    // Utility functions
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.editingAgent = null;
    }

    showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.querySelector('.main-content').insertBefore(alertDiv, document.querySelector('.content-section.active'));
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    createSampleData() {
        // Don't clear existing properties - preserve user data
        // Properties will be added through the admin panel

        // Create sample agents if none exist
        if (this.getAgents().length === 0) {
            const sampleAgents = [
                {
                    id: 1,
                    name: 'John Mwanza',
                    email: 'john@zambiaestate.com',
                    role: 'admin',
                    status: 'active',
                    date: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Sarah Banda',
                    email: 'sarah@zambiaestate.com',
                    role: 'agent',
                    status: 'active',
                    date: new Date().toISOString()
                }
            ];
            this.saveAgents(sampleAgents);
        }

        // Create sample inquiries if none exist
        if (this.getInquiries().length === 0) {
            const sampleInquiries = [
                {
                    id: 1,
                    name: 'Michael Smith',
                    email: 'michael@example.com',
                    property: 'Luxury Villa in Lusaka',
                    message: 'I am interested in this property. Can we schedule a viewing?',
                    status: 'new',
                    date: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Emma Johnson',
                    email: 'emma@example.com',
                    property: 'Modern Apartment',
                    message: 'What are the rental terms for this apartment?',
                    status: 'contacted',
                    date: new Date().toISOString()
                }
            ];
            this.saveInquiries(sampleInquiries);
        }
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});
