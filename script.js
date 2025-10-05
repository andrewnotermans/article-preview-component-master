class ShareComponent {
    constructor() {
        this.shareButton = document.getElementById('share-button');
        this.sharePanel = document.getElementById('share-panel');
        this.closeButton = document.getElementById('share-close');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.shareButton || !this.sharePanel || !this.closeButton) {
            console.error('Share component elements not found');
            return;
        }
        
        // Bind event listeners
        this.shareButton.addEventListener('click', this.togglePanel.bind(this));
        this.closeButton.addEventListener('click', this.closePanel.bind(this));
        
        // Close panel when clicking outside
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        
        // Handle keyboard events
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Set up share links with actual functionality
        this.setupShareLinks();
    }
    
    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }
    
    openPanel() {
        this.sharePanel.hidden = false;
        this.shareButton.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        
        // Focus the close button for keyboard navigation
        setTimeout(() => {
            this.closeButton.focus();
        }, 100);
    }
    
    closePanel() {
        this.sharePanel.hidden = true;
        this.shareButton.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
        
        // Return focus to share button
        this.shareButton.focus();
    }
    
    handleOutsideClick(event) {
        if (!this.isOpen) return;
        
        const shareComponent = event.target.closest('.share-component');
        if (!shareComponent) {
            this.closePanel();
        }
    }
    
    handleKeydown(event) {
        if (!this.isOpen) return;
        
        // Close panel on Escape key
        if (event.key === 'Escape') {
            this.closePanel();
            event.preventDefault();
        }
    }
    
    setupShareLinks() {
        const shareLinks = this.sharePanel.querySelectorAll('.share-link');
        const articleTitle = document.querySelector('.article-preview__title').textContent.trim();
        const articleUrl = window.location.href;
        
        shareLinks.forEach(link => {
            const platform = this.getPlatformFromLink(link);
            const shareUrl = this.getShareUrl(platform, articleTitle, articleUrl);
            
            link.href = shareUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // Add click handler to close panel after sharing
            link.addEventListener('click', () => {
                setTimeout(() => this.closePanel(), 100);
            });
        });
    }
    
    getPlatformFromLink(link) {
        const img = link.querySelector('img');
        const src = img.src;
        
        if (src.includes('facebook')) return 'facebook';
        if (src.includes('twitter')) return 'twitter';
        if (src.includes('pinterest')) return 'pinterest';
        
        return 'generic';
    }
    
    getShareUrl(platform, title, url) {
        const encodedTitle = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(url);
        
        switch (platform) {
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
            case 'pinterest':
                return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
            default:
                return '#';
        }
    }
}

// Initialize the share component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShareComponent();
});