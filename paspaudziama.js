
  document.querySelectorAll('.big-to-small').forEach(image => {
    // Create unique blur background for each image
    const blurBackground = document.createElement('div');
    blurBackground.className = 'blur-background';
    image.parentNode.insertBefore(blurBackground, image.nextSibling);
    
    image.addEventListener('click', function() {
        if (this.classList.contains('expanded')) {
            // Collapse
            this.classList.remove('expanded');
            blurBackground.style.display = 'none';
            // Remove blurred clone
            const existingClone = this.dataset.cloneId && document.getElementById(this.dataset.cloneId);
            if (existingClone) existingClone.remove();
        } else {
            // Expand
            // Create blurred clone
            const clone = this.cloneNode();
            clone.id = 'clone-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            this.dataset.cloneId = clone.id;
            clone.classList.add('image-blurred-clone');
            
            // Position clone exactly where original was
            const rect = this.getBoundingClientRect();
            clone.style.position = 'fixed';
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';
            
            document.body.appendChild(clone);
            this.classList.add('expanded');
            blurBackground.style.display = 'block';
        }
    });

    // Click on blur background to close
    blurBackground.addEventListener('click', function(e) {
        if (e.target === this) { // Only if clicking directly on background
            image.classList.remove('expanded');
            this.style.display = 'none';
            // Remove blurred clone
            const existingClone = image.dataset.cloneId && document.getElementById(image.dataset.cloneId);
            if (existingClone) existingClone.remove();
        }
    });
});