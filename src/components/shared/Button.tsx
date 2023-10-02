type ButtonProps = {
  text: string;
  type?: "submit";
};

export default function Button({ text, type }: ButtonProps) {
  return (
    <button
      className="gradient3 text-white font-semibold rounded-xl py-[15px] text-lg mt-[15px]"
      type={type}
    >
      {text}
    </button>
  );
}
