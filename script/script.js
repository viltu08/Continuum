// CHatGPT has been used to understand item clicks toggling, custom cursor and grid generation

// 1
// Ensure grid size stays consistent
const ensureGridSize = () => {
    const gridItemsContainer = document.querySelector('.grid-items');
    if (gridItemsContainer) {
        // Get the container's width and calculate the width of each column for 20 columns
        const containerWidth = gridItemsContainer.offsetWidth;
        const columnWidth = containerWidth / 40; // Divide by 40 to ensure 40 columns

        // Set the grid layout to have exactly 40 columns
        gridItemsContainer.style.gridTemplateColumns = `repeat(40, ${columnWidth}px)`;

        // Optionally, set the row height if needed (keeping it in proportion to column width)
        const rowHeight = columnWidth; // Keep row height the same as column width, or adjust as needed
        gridItemsContainer.style.gridAutoRows = `${rowHeight}px`;
    }
};


// Debounce resize event for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(ensureGridSize, 150);
});
ensureGridSize();

// 2
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

// 3
// Handle submenu item clicks
document.querySelectorAll('.sub-menu-item').forEach(subMenuItem => {
    subMenuItem.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior to avoid URL hash change

        // Get the target grid-item ID
        const targetId = subMenuItem.getAttribute('href').replace('#', ''); // Extract the target ID

        // Select all related grid-items
        const matchingItems = document.querySelectorAll(`[id^="${targetId}-item"]`);

        // Check if any of the captions are currently visible
        let anyVisible = false;
        matchingItems.forEach(item => {
            const caption = item.querySelector('.caption');
            if (caption && caption.classList.contains('visible')) {
                anyVisible = true;
            }
        });
        // 4
        // Toggle captions visibility
        if (anyVisible) {
            // Hide captions if they are already visible
            matchingItems.forEach(item => {
                const caption = item.querySelector('.caption');
                if (caption) {
                    caption.classList.remove('visible');
                }
            });
        } else {
            // Hide all captions first to reset state
            document.querySelectorAll('.grid-items .caption').forEach(caption => {
                caption.classList.remove('visible');
            });

            // Show captions for the matching items
            matchingItems.forEach(item => {
                const caption = item.querySelector('.caption');
                if (caption) {
                    caption.classList.add('visible');
                }
            });
        }

        // Ensure URL stays on the homepage by resetting hash
        history.pushState(null, '', 'https://viltu08.github.io/Continuum/');
    });
});

// 5
// What happens when we click on submenu items
document.querySelectorAll('.sub-menu-item').forEach(subMenuItem => {
    subMenuItem.addEventListener('click', event => {
        event.preventDefault(); // Prevent default anchor behavior

        // Get the target ID from the submenu item
        const targetId = subMenuItem.getAttribute('href').replace('#', '');

        // Find matching grid items
        const matchingItems = document.querySelectorAll(`[id^="${targetId}-item"]`);

        // Remove the circle-effect class from all grid items
        document.querySelectorAll('.grid-item-action, .grid-item-quality, .grid-item-concept')
            .forEach(item => item.classList.remove('circle-effect'));

        // Add the circle-effect class to matching grid items
        matchingItems.forEach(item => {
            item.classList.add('circle-effect');
        });

        // Reset circle back to default
        document.getElementById('reset-button').addEventListener('click', () => {
            document.querySelectorAll('.circle-effect').forEach(item => {
                item.classList.remove('circle-effect');
            });
        });


        // Reset URL to homepage
        history.pushState(null, '', 'https://viltu08.github.io/Continuum/');
    });
});

// 6
// Custom cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
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
}
