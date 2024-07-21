import { motion, AnimatePresence } from 'framer-motion';
import { DeleteConfirmationModalProps } from '../../../types/type';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const DeleteConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: DeleteConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-md bg-white p-6 shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="mb-4 text-xl font-bold">削除</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <motion.button
                className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
              >
                キャンセル
              </motion.button>
              <motion.button
                className="rounded-md bg-red-500 px-4 py-2 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
              >
                削除
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
