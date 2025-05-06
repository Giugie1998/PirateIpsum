document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.horizontal-dropdown');
    const parrotsLink = document.getElementById('parrotsDropdown');
    const parrotsDropdown = parrotsLink.closest('.nav-item.dropdown');

    // Initially hide the dropdown menu
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    // Show dropdown and rotate arrow when clicking Parrots
    parrotsLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (dropdown) {
            if (dropdown.style.display === 'none') {
                dropdown.style.display = 'flex';
                parrotsDropdown.classList.add('show'); // Add show class to rotate arrow
            } else {
                dropdown.style.display = 'none';
                parrotsDropdown.classList.remove('show'); // Remove show class to reset arrow
            }
        }
    });

    // Hide dropdown and reset arrow when clicking outside
    document.addEventListener('click', function(e) {
        if (!parrotsLink.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
            parrotsDropdown.classList.remove('show'); // Reset arrow when clicking outside
        }
    });
});
