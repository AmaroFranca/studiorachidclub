
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Users, CircleDollarSign, List, Settings, MessageSquare, Gift, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileDropdownProps {
  activeSection?: "dashboard" | "rewards" | "prizes" | "experiences" | "referrals" | "redeem" | "rules";
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] h-8 w-8 flex items-center justify-center rounded-md z-50 relative"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Backdrop and Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeDropdown}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 bg-[#D9D9D9] shadow-lg z-50 rounded-b-lg"
              style={{ marginTop: "60px" }}
            >
              <div className="p-4 space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between bg-[#d9d9d9] py-4 px-2 border-b border-[#B1C9C3]">
                  <h1 className="text-lg font-semibold text-[#737373] text-left">Studio Rachid</h1>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  {/* Dashboard */}
                  <Link to="/dashboard" onClick={closeDropdown}>
                    <div className={`flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 ${activeSection === "dashboard" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                      <LayoutDashboard className="text-[#BFA76F] w-5 h-5" />
                      <span>Painel</span>
                    </div>
                  </Link>

                  {/* Recompensas */}
                  <Link to="/rewards" onClick={closeDropdown}>
                    <div className={`flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 ${activeSection === "rewards" || activeSection === "prizes" || activeSection === "experiences" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                      <Gift className="text-[#BFA76F] w-5 h-5" />
                      <span>Recompensas</span>
                    </div>
                  </Link>

                  {/* Sub-items for Recompensas */}
                  {(activeSection === "rewards" || activeSection === "prizes" || activeSection === "experiences") && (
                    <div className="ml-8 space-y-1">
                      <Link to="/prizes" onClick={closeDropdown}>
                        <div className={`text-sm font-medium py-1 px-2 rounded ${activeSection === "prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373]`}>
                          Prêmios
                        </div>
                      </Link>
                      <Link to="/experiences" onClick={closeDropdown}>
                        <div className={`text-sm font-medium py-1 px-2 rounded ${activeSection === "experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373]`}>
                          Experiências
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Indicados */}
                  <Link to="/referrals" onClick={closeDropdown}>
                    <div className={`flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 ${activeSection === "referrals" || currentPath === "/referrals" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                      <Users className="text-[#BFA76F] w-5 h-5" />
                      <span>Indicados</span>
                    </div>
                  </Link>

                  {/* Resgates */}
                  <Link to="/redeem-prizes" onClick={closeDropdown}>
                    <div className={`flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 ${activeSection === "redeem" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                      <CircleDollarSign className="text-[#BFA76F] w-5 h-5" />
                      <span>Resgates</span>
                    </div>
                  </Link>

                  {/* Sub-items for Resgates */}
                  {activeSection === "redeem" && (
                    <div className="ml-8 space-y-1">
                      <Link to="/redeem-prizes" onClick={closeDropdown}>
                        <div className={`text-sm font-medium py-1 px-2 rounded ${currentPath === "/redeem-prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373]`}>
                          Prêmios
                        </div>
                      </Link>
                      <Link to="/redeem-experiences" onClick={closeDropdown}>
                        <div className={`text-sm font-medium py-1 px-2 rounded ${currentPath === "/redeem-experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373]`}>
                          Experiências
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Regras */}
                  <Link to="/rules" onClick={closeDropdown}>
                    <div className={`flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 ${activeSection === "rules" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                      <List className="text-[#BFA76F] w-5 h-5" />
                      <span>Regras</span>
                    </div>
                  </Link>
                </div>

                {/* Footer */}
                <div className="border-t border-[#B1C9C3] pt-4 space-y-1">
                  <div className="flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 hover:bg-[#B1C9C3]">
                    <Settings className="text-[#BFA76F] w-5 h-5" />
                    <span>Configurações</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-md text-[#737373] px-3 py-2 hover:bg-[#B1C9C3]">
                    <MessageSquare className="text-[#BFA76F] w-5 h-5" />
                    <span>Suporte</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileDropdown;
