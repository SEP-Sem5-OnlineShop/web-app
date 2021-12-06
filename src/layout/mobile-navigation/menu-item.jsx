import * as React from "react";
import { motion } from "framer-motion";
import { useHistory, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";

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

export const MenuItem = ({ menuName, link, freeze, id }) => {
  const role = useSelector(state => state.user.userData.role)
  const history = useHistory()
  const location = useLocation()
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="py-3 cursor-pointer"
      onClick={() => history.push(link)}
      data-testid={id}
    >
      <div className="icon-placeholder" />
      <div className={location.pathname === link ? `${freeze ? "text-text" : "text-textLight"} 
      transform scale-105 font-medium` : !freeze ? `text-secondary ${role === "customer" ? 'dark:text-white' : ""}` :
          `text-white ${role === "customer" ? "dark:text-secondary" : ""}`} >{menuName}</div>
    </motion.li>
  );
};
