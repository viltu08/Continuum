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
        history.pushState(null, '', '#');
    });
});

// Handle submenu item clicks
document.querySelectorAll('.sub-menu-item').forEach(subMenuItem => {
    subMenuItem.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior to avoid URL hash change

        // Get the target grid-item ID
        const targetId = subMenuItem.getAttribute('href').replace('#', ''); // Extract the target ID

        // Select all related grid-items
        const matchingItems = document.querySelectorAll(`#${targetId}-item1, #${targetId}-item2`);

        // Check if any of the captions are currently visible
        let anyVisible = false;
        matchingItems.forEach(item => {
            const caption = item.querySelector('.caption');
            if (caption && caption.style.opacity === '1') {
                anyVisible = true;
            }
        });

        // Toggle captions visibility
        if (anyVisible) {
            // Hide captions if they are already visible
            matchingItems.forEach(item => {
                const caption = item.querySelector('.caption');
                if (caption) {
                    caption.style.opacity = '0';
                    caption.style.visibility = 'hidden';
                }
            });
        } else {
            // Hide all captions first to reset state
            document.querySelectorAll('.grid-items .caption').forEach(caption => {
                caption.style.opacity = '0';
                caption.style.visibility = 'hidden';
            });

            // Show captions for the matching items
            matchingItems.forEach(item => {
                const caption = item.querySelector('.caption');
                if (caption) {
                    caption.style.opacity = '1';
                    caption.style.visibility = 'visible';
                }
            });
        }

        // Ensure URL stays on the homepage by resetting the hash
        history.pushState(null, '', '#');
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
document.querySelectorAll('a, .menu-item, .sub-menu-item').forEach(link => {
    link.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });

    link.addEventListener('mouseout', () => {
        cursor.classList.remove('hover');
    });
});
