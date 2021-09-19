import * as React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const MenuItem = ({ menuName, link }) => {
  const history = useHistory()
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="py-3 cursor-pointer"
      onClick={() => history.push(link)}
    >
      <div className="icon-placeholder" />
      <div className="text-placeholder" >{menuName}</div>
    </motion.li>
  );
};
