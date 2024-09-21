export const UserChat = ({ content }: { content?: string }) => {
  return (
    <>
      {content && (
        <div className="w-full flex items-center justify-end">
          <p className="p-4 bg-[#DFE1E7] rounded-xl max-w-[80%] w-full text-[#666D80] break-words">
            {content}
          </p>
        </div>
      )}
    </>
  );
};

export const AiReply = ({ content }: { content?: string }) => {
  return (
    <>
      {content && (
        <div className="w-full flex items-center justify-start">
          <p className="p-4 bg-[#DBEAFE] rounded-xl max-w-[80%] w-full text-[#666D80] break-words">
            {content}
          </p>
        </div>
      )}
    </>
  );
};
