
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
    topRight: "right-[5%] top-0 text-right",
    bottomLeft: "left-[5%] bottom-[10%]",
  };

  return (
    <div
      className={`font-poppins font-bold text-[180px] text-[rgba(255,255,255,0.08)] absolute whitespace-nowrap tracking-[-6px] ${positionClasses[position]}`}
      style={{ letterSpacing: "-6px" }}
    >
      {text}
    </div>
  );
};
