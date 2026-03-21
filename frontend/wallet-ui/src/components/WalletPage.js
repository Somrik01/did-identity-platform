import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaIdCard, FaShareAlt } from "react-icons/fa";

import CreateDID from "./CreateDID";
import ViewCredential from "./ViewCredential";
import ShareCredential from "./ShareCredential";

function WalletPage() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <h2><FaWallet /> User Wallet</h2>

      <motion.div className="card" whileHover={{ scale: 1.03 }}>
        <h4><FaIdCard /> </h4>
        <CreateDID />
      </motion.div>

      <motion.div className="card" whileHover={{ scale: 1.03 }}>
        <h4><FaIdCard /> </h4>
        <ViewCredential />
      </motion.div>

      <motion.div className="card" whileHover={{ scale: 1.03 }}>
        <h4><FaShareAlt />  </h4>
        <ShareCredential />
      </motion.div>

    </motion.div>
  );
}

export default WalletPage;