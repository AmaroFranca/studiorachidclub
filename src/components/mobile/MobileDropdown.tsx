
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";
import { AnimatePresence, motion } from "framer-motion";

interface MobileDropdownProps {
  activeSection?: "dashboard" | "rewards" | "prizes" | "experiences" | "referrals" | "redeem" | "rules";
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
              onClick={() => setIsOpen(false)}
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
              <div className="p-4">
                <AppSidebar activeSection={activeSection} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileDropdown;
