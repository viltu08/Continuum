// CHatGPT has been used to understand item clicks toggling, custom cursor and grid generation

// Ensure grid size stays consistent
const ensureGridSize = () => {
    const gridItemsContainer = document.querySelector('.grid-items');
    const columns = getComputedStyle(gridItemsContainer).getPropertyValue('grid-template-columns').split(' ').length;
    const rowHeight = gridItemsContainer.offsetWidth / columns;

    // Set consistent row height
    gridItemsContainer.style.gridAutoRows = `${rowHeight}px`;
};

window.addEventListener('resize', ensureGridSize);
ensureGridSize();

// Handle main menu item clicks
document.querySelectorAll('.menu-item').forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        const targetId = menuItem.dataset.target; // Get submenu ID
        const targetMenu = document.getElementById(targetId);

        // Check if this menu item is already active
        const isActive = menuItem.classList.contains('active');

        if (isActive) {
            // Remove active state from this menu item
            menuItem.classList.remove('active');

            // Hide its submenu
            if (targetMenu) {
                targetMenu.classList.remove('active');

                // Reset all submenu items to default state
                targetMenu.querySelectorAll('.sub-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        } else {
            // Remove active state from all menu items
            document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

            // Hide all submenus and reset submenu items
            document.querySelectorAll('.sub-menu-container').forEach(menu => {
                menu.classList.remove('active');
                menu.querySelectorAll('.sub-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            });

            // Add active state to clicked menu item
            menuItem.classList.add('active');

            // Show the corresponding submenu
            if (targetMenu) targetMenu.classList.add('active');
        }

        // Reset URL to homepage
        history.pushState(null, '', 'https://viltu08.github.io/Continuum/');
    });
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');

// Update cursor position based on mouse movement
document.addEventListener('mousemove', e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

// Add hover effect for links and interactive items
document.querySelectorAll('a, .menu-item').forEach(link => {
    link.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });

    link.addEventListener('mouseout', () => {
        cursor.classList.remove('hover');
    });
});
