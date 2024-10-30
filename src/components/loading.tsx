import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-2 h-8 bg-blue-500 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
      <div className="w-2 h-8 bg-green-500 rounded-full animate-[loading_1s_ease-in-out_0.2s_infinite]"></div>
      <div className="w-2 h-8 bg-red-500 rounded-full animate-[loading_1s_ease-in-out_0.4s_infinite]"></div>
    </div>
  );
};

export default Loading;
