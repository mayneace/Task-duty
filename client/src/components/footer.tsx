import React from "react";

const footer: React.FC = () => {
  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm font-medium text-[#6C4CE0] hover:underline"
      >
        Back To Top
      </button>
    </div>
  );
};

export default footer;
