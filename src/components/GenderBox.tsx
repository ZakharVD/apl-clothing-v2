import { useNavigate } from "react-router-dom";

type Props = {
  route: string
  title: string
  gradient: string
};

export default function GenderBox({ route, title, gradient }: Props) {
  const navigate = useNavigate();
  function onClickHandler() {
    navigate(route);
  }

  return (
      <div
        className={`${gradient} h-1/2 lg:h-auto lg:w-1/2 m-5 sm:m-10 flex justify-center items-center rounded-2xl  border-black cursor-pointer`}
        onClick={onClickHandler}
      >
        <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase border-2 border-black rounded-lg p-3 lg:p-5 text-black">
          {title}
        </h2>
      </div>
  );
}
