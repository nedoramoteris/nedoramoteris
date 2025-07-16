document.addEventListener('DOMContentLoaded', function() {
    // Photo gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const fullscreenView = document.getElementById('fullscreenView');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const backButton = document.querySelector('.back-button');
    const photoDate = document.querySelector('.photo-date');

    // Open image in fullscreen
    function openFullscreen(event) {
        const galleryItem = event.currentTarget;
        const img = galleryItem.querySelector('img');
        
        fullscreenImage.src = img.src;
        fullscreenImage.alt = img.alt;
        photoDate.textContent = galleryItem.getAttribute('data-date') || 'Today';
        fullscreenView.classList.add('active');
    }

    // Close fullscreen view
    function closeFullscreen() {
        fullscreenView.classList.remove('active');
    }

    // Add click event to all gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', openFullscreen);
    });

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Bottom nav switching
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Close when clicking outside the image
    fullscreenView.addEventListener('click', (e) => {
        if (e.target === fullscreenView) {
            closeFullscreen();
        }
    });

    backButton.addEventListener('click', closeFullscreen);
});

// Add this to your existing JavaScript
const lockedAlbum = document.querySelector('.locked-album');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const cancelPassword = document.getElementById('cancelPassword');
const wrongPassword = document.getElementById('wrongPassword');

// Set your secret password (in a real app, this would be stored securely)
const SECRET_PASSWORD = "1234";

lockedAlbum.addEventListener('click', (e) => {
    e.preventDefault();
    passwordModal.style.display = 'flex';
    passwordInput.focus();
});

cancelPassword.addEventListener('click', () => {
    passwordModal.style.display = 'none';
    passwordInput.value = '';
    wrongPassword.style.display = 'none';
});

submitPassword.addEventListener('click', () => {
    if (passwordInput.value === SECRET_PASSWORD) {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        wrongPassword.style.display = 'none';
        // In a real app, you would show the locked album content here
        alert("Access granted to locked album!");
    } else {
        wrongPassword.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Allow pressing Enter to submit
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitPassword.click();
    }
});


