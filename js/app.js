import '../css/style.css'

window.addEventListener('load', function () {
    function setObjectEmbedHeight() {
        const objectElements = document.querySelectorAll(".object-embed");

        objectElements.forEach((objectElement) => {
            const embeddedDoc = objectElement.contentDocument;

            if (embeddedDoc) {
                const height = embeddedDoc.documentElement.scrollHeight;

                objectElement.style.height = `${height}px`;
            }
        })
    }

    setObjectEmbedHeight()
})
