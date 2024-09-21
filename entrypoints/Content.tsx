import Content from "./main/Content";
import "./popup/style.css";
import ReactDOM from "react-dom/client";

export default defineContentScript({
  matches: ["https://*.linkedin.com/*"],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "ai-reply-root",
      position: "inline",
      onMount: (container) => {
        const app: HTMLElement = document.createElement("div");
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(<Content />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
