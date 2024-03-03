/**
 * Attaches an event listener to the document that delegates handling of the specified event
 * to elements that match the provided selector within the document.
 *
 * @param eventName
 * @param elementSelector
 * @param handler
 */
export function delegate(eventName, elementSelector, handler) {
  document.addEventListener(eventName, (event) => {
    if (event.target.closest(elementSelector)) {
      if (typeof handler === 'function') {
        handler.call(event.target, event);
      }
    }
  });
}
