import * as React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { MenuItem } from "./menu-item";
import { useSelector } from "react-redux"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => {
  const history = useHistory()
  const role = useSelector(state => state.user.role)
  return (
    <div className="p-8">
      <button onClick={() => history.push("/auth/login")} className="rounded-lg px-2 py-2 bg-textLight text-white w-full">
                              Login | Register</button>
      <motion.ul className="mt-8" variants={variants}>
        {itemIds.map(i => (
          i.accessLevel === role &&
          <MenuItem menuName={i.name} link={i.link} key={i.name} />
        ))}
      </motion.ul>
    </div>
  )
};

const itemIds = [
  {name: "Vendor Registration", link: "/register/vendor", accessLevel: "guest"}, 
  {name: "Add Product", link: "/app/product/add", accessLevel: "vendor"}, 
  {name: "Check Alerts", link: "/app/alert", accessLevel: "customer"}];
