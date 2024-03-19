import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={props.id}>{props.name}</label>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          className="outline-none rounded-lg border border-gray-300 p-2"
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          value={props.value}
        />
      </div>
    </>
  );
};

export default Input;
