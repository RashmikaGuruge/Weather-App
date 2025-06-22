import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md mx-auto"
  >
    <div className="flex items-center">
      <div className="text-red-500 mr-3">⚠️</div>
      <div>
        <h3 className="text-red-800 font-semibold">Oops! Something went wrong</h3>
        <p className="text-red-700 mt-1">{message}</p>
      </div>
    </div>
  </motion.div>
);

export default ErrorMessage;
