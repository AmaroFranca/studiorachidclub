
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
    topRight: "right-[5%] top-[10%] text-right",
    bottomLeft: "left-[5%] bottom-[10%]",
  };

  return (
    <div
      className={`font-bold text-[180px] text-[rgba(255,255,255,0.08)] absolute whitespace-nowrap ${positionClasses[position]}`}
    >
      {text}
    </div>
  );
};
