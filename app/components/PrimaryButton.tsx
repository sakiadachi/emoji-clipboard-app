import { MouseEventHandler } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

type PropsType = {
  text: String;
  type?: ButtonType;
  additionalClassName?: String;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function PrimaryButton(props: PropsType) {
  const type = props.type ?? "button";
  const baseClassName =
    "pointer-events-auto rounded-md bg-teal-600 font-semibold text-white hover:bg-teal-500 focus:bg-teal-500";
  const className = props.additionalClassName
    ? props.additionalClassName + " " + baseClassName
    : baseClassName;
  return (
    <button type={type} className={className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
