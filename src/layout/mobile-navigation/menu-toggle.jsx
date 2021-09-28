import * as React from "react";
import { motion } from "framer-motion";

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={props.freeze ? "white" : "hsl(0, 0%, 18%)"}
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle, freeze }) => (
  <button className="ml-7 mt-4" style={{width: 50, height: 50}} onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
          freeze={freeze}
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
          freeze={freeze}
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
          freeze={freeze}
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
