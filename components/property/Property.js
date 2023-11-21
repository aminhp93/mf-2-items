import React from "react";
import css from "./Property.module.scss";

export default function Property(props) {
  return (
    <li className={css.layout}>
      {props.label && <span>{props.label}</span>}
      {props.children}
    </li>
  );
}
