import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartFunc } from "./slices/cartSlice";
import { useEffect } from "react";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  // clear cart items

  useEffect(()=>{
      dispatch(clearCartFunc())

  },[])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="bg-green-100 p-4 rounded-full"
          >
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </motion.div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully. A confirmation email has been sent to you.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300"
        >
          Go to Home
        </motion.button>

        <div className="mt-6 text-sm text-gray-400">
          <p>Need help? <a href="/contact" className="text-green-600 hover:underline">Contact Support</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
