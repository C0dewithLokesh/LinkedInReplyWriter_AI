import { useEffect, useState } from "react";
import AiIcon from "../../assets/AI.svg";
import PromptModal from "./PromptModal";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".msg-form__contenteditable");
      if (textBox) {
        textBox.addEventListener("focus", handleFocus);
        textBox.addEventListener("blur", handleBlur);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFocus = () => {
    const textBox = document.querySelector(".msg-form__contenteditable");
    const container = document.createElement("div");
    container.className = "ai-icon";
    container.setAttribute(
      "style",
      "position:absolute; bottom:0px; right:6px;"
    );
    const imgElement = document.createElement("img");
    imgElement.src = AiIcon;
    imgElement.alt = "ai-icon";
    imgElement.setAttribute(
      "style",
      "width: 32px; height: 32px; cursor:pointer;"
    );
    imgElement.addEventListener("click", () => {
      setShowModal(true);
    });
    container.appendChild(imgElement);
    textBox?.appendChild(container);
  };

  const handleBlur = () => {
    const textBox = document.querySelector(".msg-form__contenteditable");
    const container = textBox?.querySelector(".ai-icon");
    container?.remove();
  };

  return (
    <PromptModal open={showModal} handleClose={() => setShowModal(false)} />
  );
};

export default Content;
