
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BackgroundTextProps {
  text: string;
  position: "topRight" | "bottomLeft";
}

export const BackgroundText: React.FC<BackgroundTextProps> = ({
  text,
  position,
}) => {
  const isMobile = useIsMobile();
  
  const positionClasses = {
    topRight: "right-[5%] top-0 text-right",
    bottomLeft: "left-[5%] bottom-[10%]",
  };

  // Em dispositivos móveis, reduzimos o tamanho da fonte ou ocultamos em telas muito pequenas
  const fontSize = isMobile ? "text-[80px]" : "text-[180px]";
  const opacity = isMobile ? "opacity-[0.05]" : "opacity-[0.08]";

  if (isMobile && window.innerWidth < 360) {
    return null; // Oculta em telas muito pequenas
  }

  return (
    <div
      className={`font-poppins font-bold ${fontSize} text-[rgba(255,255,255)] ${opacity} absolute whitespace-nowrap ${positionClasses[position]}`}
      style={{ letterSpacing: "-0.05em" }}
    >
      {text}
    </div>
  );
};
