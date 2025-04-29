import React from "react";

interface BackgroundTextProps {
  text: string;
  position: "topRight" | "bottomLeft";
}

export const BackgroundText: React.FC<BackgroundTextProps> = ({
  text,
  position,
}) => {
  const positionClasses = {
    topRight: "right-[5%] top-[15%]",
    bottomLeft: "left-[5%] top-[80%]",
  };

  return (
    <div
      className={`font-bold text-[120px] text-[rgba(255,255,255,0.1)] absolute whitespace-nowrap ${positionClasses[position]}`}
    >
      {text}
    </div>
  );
};
