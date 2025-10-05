const shareButton = document.getElementById('share-button');
const sharePanel = document.getElementById('share-panel');
const shareCloseButton = document.getElementById('share-close');

function toggleSharePanel() {
    const isHidden = sharePanel.classList.toggle('hidden');
    shareButton.setAttribute('aria-expanded', !isHidden);
}

function closeSharePanel() {
    sharePanel.classList.add('hidden');
    shareButton.setAttribute('aria-expanded', 'false');
}

// Add event listeners
shareButton.addEventListener('click', toggleSharePanel);
shareCloseButton.addEventListener('click', closeSharePanel);

// Close panel when clicking outside
document.addEventListener('click', function(event) {
    if (!sharePanel.contains(event.target) && !shareButton.contains(event.target)) {
        closeSharePanel();
    }
});
