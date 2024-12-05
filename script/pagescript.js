// ChatGPT has been used to help understand iframe behavior and custom cursor
// Function to check iframe content after a dynamic timeout
function checkIframeWithTimeout(iframe, fallback, maxTimeout = 15000) {
    const interval = 500; // Check every 500ms
    let elapsed = 0;

    const intervalCheck = setInterval(() => {
        try {
            const iframeContent = iframe.contentDocument || iframe.contentWindow.document;

            // If content is accessible and not empty, stop checking
            if (iframeContent && iframeContent.body.childNodes.length) {
                clearInterval(intervalCheck);
                console.log("Iframe loaded successfully.");
                return;
            }
        } catch (error) {
            // Ignore errors during checks; only act after timeout
        }

        elapsed += interval;
        if (elapsed >= maxTimeout) {
            // Timeout reached: Show fallback
            clearInterval(intervalCheck);
            console.error("Fallback triggered: Iframe did not load in time.");
            iframe.style.display = 'none';
            fallback.style.display = 'block';
        }
    }, interval);
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