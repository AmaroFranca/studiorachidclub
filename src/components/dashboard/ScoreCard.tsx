
import React from "react";
import { CircleDollarSign, Gift, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const ScoreCard: React.FC = () => {
  return (
    <Card className="bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none w-full md:w-[450px] max-w-full">
      <CardContent className="p-6">
        <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-[#737373]">Sua Pontuação</h3>
              <CircleDollarSign className="ml-2 text-[#BFA76F] h-5 w-5" />
            </div>
            <span className="font-semibold text-xl text-[#737373]">270</span>
          </div>
          
          <Progress value={27} className="bg-[#737373] h-7 rounded">
            <div className="bg-[#B1C9C3] h-full rounded" />
          </Progress>
          
          <div className="flex justify-between text-xs mt-1 text-[#737373]">
            <span>0</span>
            <span>1000</span>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-[#737373]">Indicados</h3>
              <Users className="ml-2 text-[#BFA76F] h-5 w-5" />
            </div>
            <span className="font-semibold text-xl text-[#737373]">3</span>
          </div>
        </div>
        
        <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6 py-[10px]">
          <div className="flex gap-5 py-0 my-0">
            <img alt="Copo Térmico" className="w-40 h-40 object-cover rounded shadow-md" src="/lovable-uploads/18579148-cc6d-439b-b115-3d26c0b4a45a.png" />
            <div className="px-0 py-[50px]">
              <h3 className="font-semibold text-[#737373] text-left">Copo Térmico 1,2L</h3>
              <p className="font-semibold text-[#bfa76f]">Faltam: xxx pontos</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] font-semibold flex gap-2 items-center justify-center py-3 px-4 mx-0 my-[5px]">
          <Gift className="text-[#BFA76F]" />
          Veja Todos os Prêmios e Resgate
        </Button>
      </CardContent>
    </Card>
  );
};
