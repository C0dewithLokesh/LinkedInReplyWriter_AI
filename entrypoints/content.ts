export default defineContentScript({
  matches: ["https://*.linkedin.com/*"],
  main() {
    const rootDivId = 'ai-reply-root';
    if (!document.getElementById(rootDivId)) {
      const rootDiv = document.createElement('div');
      rootDiv.id = rootDivId;
      document.body.appendChild(rootDiv);
    }

    const rootElement = document.getElementById(rootDivId);
    if (rootElement) {
      const shadowRoot = rootElement.attachShadow({ mode: 'open' });
      const appDiv = document.createElement('div');
      shadowRoot.appendChild(appDiv);

      import('./Content.tsx').then((Content) => {
        Content.renderApp(appDiv);
      });
    }
  },
});
