import React from "react";
import GenerateIcon from "../../assets/GenerateIcon.svg";
import InsertIcon from "../../assets/InsertIcon.svg";
import RegenerateIcon from "../../assets/RegenerateIcon.svg";
import { AiReply, UserChat } from "../components/Chat";
import CustomTextarea from "../components/CustomTextarea";
import PrimaryButton from "../components/PrimaryButton";

interface IPrompts {
  role: string;
  message: string;
}

const PromptModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [prompts, setPrompts] = useState<IPrompts[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const showRegenerateBtn = prompts.length > 0;

  const handleGenerate = () => {
    if (userPrompt && userPrompt?.length > 0) {
      const data = [
        {
          role: "user",
          message: userPrompt || "",
        },
        {
          role: "ai",
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
        },
      ];
      setPrompts((prev) => [...prev, ...data]);
    }
    setUserPrompt("");
  };

  const handleInsert = () => {
    const placeHolder = document.querySelector(".msg-form__placeholder");
    placeHolder?.remove();

    const textBox = document.querySelector(".msg-form__contenteditable p");
    if (textBox) {
      textBox.textContent = prompts[prompts.length - 1]?.message || "";
      const event = new Event("input", { bubbles: true });
      textBox.dispatchEvent(event);
      const range = document.createRange();
      range.selectNodeContents(textBox);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    setUserPrompt("");
    setPrompts([]);
    handleClose();
  };

  return (
    <dialog
      className={`bg-[#0D0D1233] inset-0 w-full h-screen overflow-hidden items-center justify-center px-6 z-[100] ${
        open ? "flex" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-[#F9FAFB] shadow-sm p-[26px] rounded-[15px] flex flex-col items-center gap-[26px] z-[999] w-[606px]"
        onClick={(e) => e.stopPropagation()}
      >
        {prompts.map((item, index) => (
          <React.Fragment key={index}>
            {item.role === "user" && <UserChat content={item.message} />}
            {item.role === "ai" && <AiReply content={item.message} />}
          </React.Fragment>
        ))}

        <div className="w-full flex flex-col items-center gap-5">
          <CustomTextarea
            placeholder="Your prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />

          <div className="w-full flex items-center justify-end gap-[26px] h-[50px]">
            {showRegenerateBtn && (
              <PrimaryButton
                icon={<img src={InsertIcon} />}
                label="Insert"
                containerClasses="!bg-transparent border-2 border-[#666D80] h-full"
                textClasses="!text-[#666D80]"
                onClick={handleInsert}
              />
            )}

            <PrimaryButton
              icon={
                <img src={showRegenerateBtn ? RegenerateIcon : GenerateIcon} />
              }
              label={showRegenerateBtn ? "Regenerate" : "Generate"}
              containerClasses="h-full"
              onClick={showRegenerateBtn ? () => null : handleGenerate}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default PromptModal;
