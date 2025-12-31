import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {

  // 🔒 Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL WRAPPER */}
          <motion.div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              px-4 py-6
              overflow-y-auto
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL CONTENT */}
            <motion.div
              className="
                relative bg-white rounded-2xl shadow-2xl
                w-full max-w-[90vw] sm:max-w-md
                max-h-[90vh] overflow-y-auto
                overflow-x-hidden
              "
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    text-gray-500 hover:text-gray-800
                    hover:bg-gray-100
                    transition
                  "
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div className="p-5">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
