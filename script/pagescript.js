 // ChatGPT has been used to help understand iframe behavior and custom cursor
        // Check if the iframe fails to load
        const iframe = document.getElementById('contentIframe');
        const fallback = document.getElementById('fallbackMessage');

        // Set a timeout to check iframe loading status
        setTimeout(() => {
            try {
                // Attempt to access iframe content to see if it loaded
                const iframeContent = iframe.contentDocument || iframe.contentWindow.document;

                // If the content is inaccessible or empty, show the fallback
                if (!iframeContent || !iframeContent.body.childNodes.length) {
                    throw new Error("Iframe content not accessible");
                }
            } catch (error) {
                console.error("Fallback triggered:", error);
                iframe.style.display = 'none';
                fallback.style.display = 'block';
            }
        }, 1000);

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