import React from "react";
import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import "./button.css";

type Props = {
  onClick: () => void;
  title: string;
  type: BUTTON_TYPES;
  classNames?: string[];
};

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <button
      className={[props.type, ...(props.classNames || [])].join(" ")}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

Button.defaultProps = {
  type: BUTTON_TYPES.PRIMARY_SUBMIT,
  onClick: () => {},
  classNames: [],
};
