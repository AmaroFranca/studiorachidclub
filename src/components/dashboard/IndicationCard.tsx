
import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IndicationCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-[#B1C9C3] to-black shadow-[10px_10px_15px_#737373] rounded-lg border-none">
      <CardContent className="p-6 text-white">
        <div className="border border-white/60 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <Heart className="text-[#BFA76F] mr-2 " />
            <h3 className="font-semibold text-xl text-center">Indique e Ganhe</h3>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-left">Indique alguém especial e ganhem juntos.</h2>
          
          <p className="mb-4 text-left">
            Pontos pra você. Presente pra quem você indica.
          </p>
          <p className="mb-4 text-left">
            Você pode ganhar de 20 a 250 pontos por cada indicação e a pessoa indicada 
            ganha um presente especial da clínica - um Checkup Digital e desconto na 
            primeira profilaxia.
          </p>
          
          <div className="flex items-center text-xs">
            <ArrowRight className="h-3 w-3 text-[#BFA76F] mr-1" />
            <span>Veja as regras do programa</span>
          </div>
        </div>
        
        <Button className="w-full bg-[#BFA76F] hover:bg-[#a99058] text-white font-bold">
          QUERO INDICAR AGORA!
        </Button>
      </CardContent>
    </Card>
  );
};

export default IndicationCard;
