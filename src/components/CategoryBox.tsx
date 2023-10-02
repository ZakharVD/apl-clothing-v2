import { useNavigate } from "react-router-dom"

type Props = {
    title: string,
    route: string,
}

export default function CategoryBox({ title, route }: Props) {
    const redirect = useNavigate();
    function onClickHandler() {
        redirect(route);
    }
    return (
        <div onClick={onClickHandler} className="gradientHover px-8 sm:py-20 m-3 sm:m-8 border-[1px] shadow-md rounded-xl flex justify-center items-center cursor-pointer">
            <div className="text-md sm:text-lg md:text-xl lg:text-3xl border-2 border-black rounded-lg p-3 sm:p-5">{title}</div>
        </div>
    )
}