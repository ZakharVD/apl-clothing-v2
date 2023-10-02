import { InputHTMLAttributes } from "react";

type FormInputProps = {
    label: string;
  } & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, ...props }: FormInputProps) {

  return (
    <div className="flex flex-col my-[10px]">
      <label className="font-medium text-black">{label}</label>
      <input
        className="rounded-xl px-[15px] py-[20px] text-black text-sm bg-none border-[2px]"
        {...props}
      />
    </div>
  );
}
