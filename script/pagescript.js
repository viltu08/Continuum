// ChatGPT has been used to help understand iframe behavior and custom cursor
// Function to check iframe content after a dynamic timeout
function checkIframeWithTimeout(iframe, fallback, maxTimeout = 15000) {
    let iframeLoaded = false;

    // Event listener for successful iframe load
    iframe.addEventListener('load', () => {
        iframeLoaded = true;
        console.log("Iframe loaded successfully.");
    });

    // Fallback logic after timeout
    setTimeout(() => {
        if (!iframeLoaded) {
            console.error("Fallback triggered: Iframe did not load in time.");
            iframe.style.display = 'none';
            fallback.style.display = 'block';
        }
    }, maxTimeout);
}

// Usage
const iframe = document.getElementById('contentIframe');
const fallback = document.getElementById('fallbackMessage');
checkIframeWithTimeout(iframe, fallback, 10000); // 10-second timeout



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