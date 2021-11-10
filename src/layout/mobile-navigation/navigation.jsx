import * as React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { MenuItem } from "./menu-item";
import { useSelector } from "react-redux"

import logo from "../../assets/svg/logo/logo-264A75.svg";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = (props) => {
  const history = useHistory()
  const role = useSelector(state => state.user.role)
  const token = useSelector(state => state.user.token)
  return (
    <div className="p-8 pt-0 lg:pt-8">
      {props.freeze ?
        <div className="h-full flex items-center p-2 bg-white rounded-xl">
          <img className="cursor-pointer ml-8 lg:ml-0" style={{ height: 80 }} onClick={() => history.push("/")} src={logo} alt="logo" />
        </div>
        :
        token ?
          <img className="cursor-pointer lg:ml-0" style={{ height: 80 }} onClick={() => history.push("/")} src={logo} alt="logo" /> :
          <div>
            <img className="cursor-pointer lg:ml-0" style={{ height: 80 }} onClick={() => history.push("/")} src={logo} alt="logo" /> :
            <button onClick={() => history.push("/auth/login")}
              className={`rounded-lg px-2 py-2 ${props.freeze ? "bg-white text-textLight" :
                "bg-textLight text-white"} w-full`}>
              Login | Register
          </button>
          </div>
      }
      <motion.ul className="mt-8" variants={variants}>
        {itemIds.map(i => (
          i.accessLevel === role &&
          <MenuItem id={i.id} freeze={props.freeze} menuName={i.name} link={i.link} key={i.name} />
        ))}
      </motion.ul>
    </div>
  )
};

const itemIds = [
  { name: "Vendor Registration", link: "/register/vendor", accessLevel: "guest" },

  { name: "Dashboard", link: "/", accessLevel: "vendor", id:"dashboard" },
  { name: "Load Daily Stock", link: "/app/products/stock/daily", accessLevel: "vendor", id:"load-daily-stock" },
  { name: "Product List", link: "/app/products", accessLevel: "vendor", id:"product-list" },
  { name: "Vehicles List", link: "/app/vehicles", accessLevel: "vendor", id:"vehicles-list" },
  { name: "Drivers List", link: "/app/drivers", accessLevel: "vendor", id:"drivers-list" },
  { name: "Reports", link: "/app/reports", accessLevel: "vendor", id:"reports" },

  { name: "Dashboard", link: "/", accessLevel: "driver" },
  // { name: "Select Route", link: "/app/select-route", accessLevel: "driver" },
  // { name: "Start New Bill", link: "/app/cart", accessLevel: "driver" },

  { name: "Check Alerts", link: "/app/alert", accessLevel: "customer" },
  { name: "Check Order History", link: "/app/order_history", accessLevel: "customer" },
  {name: "Buy", link: "/app/buying_cart", accessLevel: "customer"},
  {name: "Selling Cart", link: "/app/selling_cart", accessLevel: "driver"},
];
