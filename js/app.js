import '../css/style.css';

window.addEventListener('load', function () {
    function setObjectEmbedHeight() {
        const objectElements = document.querySelectorAll(".object-embed");
        const embeddedElementStack = new Set();

        objectElements.forEach((objectEmbedElement) => {
            const embeddedDoc = objectEmbedElement.contentDocument;
            const dataAttribute = objectEmbedElement.getAttribute('data');

            // If the same data attribute is detected, hide the embedded element
            if (embeddedElementStack.has(dataAttribute)) {
                objectEmbedElement.style.display = 'none';
            } else {
                if (embeddedDoc) {
                    const height = embeddedDoc.documentElement.scrollHeight;
                    objectEmbedElement.style.height = `${height}px`;
                }
            }

            embeddedElementStack.add(dataAttribute);
        });
    }

    setObjectEmbedHeight();
});
