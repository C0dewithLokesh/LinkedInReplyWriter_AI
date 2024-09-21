import * as React from "react";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
}

const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ containerClassName = "", ...props }, ref) => {
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textRef.current) {
      if (
        props.value &&
        typeof props.value === "string" &&
        props.value.length > 0
      ) {
        textRef.current.style.height = "auto";
        if (textRef.current.value.length <= 52) {
          textRef.current.style.height = "45px";
        } else
          textRef.current.style.height = textRef.current.scrollHeight + "px";
      } else {
        textRef.current.style.height = "45px";
      }
    }
  }, [props.value]);

  return (
    <textarea
      className={`flex w-full h-[43px] max-h-[250px] overflow-y-auto bg-white border border-[#C1C7D0] rounded-lg px-4 py-2 text-black outline-none text-[20px] font-normal leading-normal disabled:cursor-not-allowed disabled:opacity-50 resize-none ${containerClassName}`}
      ref={textRef}
      {...props}
    />
  );
});

export default CustomTextarea;
