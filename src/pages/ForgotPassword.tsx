import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { triggerResetEmail } from "../utils/firebase/userData";
import { AuthError } from "firebase/auth";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { activateAlert } = useAlert();
  const {setLoading} = useLoading();
  const redirect = useNavigate();

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
  }

  async function onFormSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === "") {
      activateAlert("Please enter a valid email address", "red");
      return;
    }
    try {
      setLoading(true);
      await triggerResetEmail(email);
      redirect("/login");
      setLoading(false);
      activateAlert("A recovery email has been sent. Please check your inbox.", "green");
    } catch (error) {
      setLoading(false);
      switch ((error as AuthError).code) {
        case "auth/user-not-found":
          activateAlert("User with such email does not exist", "red");
          break;
        case "auth/missing-email":
          activateAlert("Please enter a valid email address", "red");
          break;
        default:
          activateAlert("An unexpected error has occured", "red");
      }
    }
  }

  return (
    <div className="h-[100vh]">
      <div className="centeredDiv border-[1px] shadow-xl  h-[370px] w-[95%] max-w-[500px] m-auto mt-[20px] rounded-3xl p-[10px] sm:py-[20px] sm:px-[30px] centered_div">
        <p className="text-2xl font-bold p-[10px] md:px-[25px] pt-[25px] text-left">
          Reset Your Password
        </p>
        <form
          onSubmit={onFormSubmitHandler}
          className="flex flex-col mx-[10px] md:mx-[25px]"
        >
          <div className="flex flex-col my-[10px]">
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={onChangeHandler}
              label="Email"
            />
          </div>
          <Button text="Send recovery email" />
          <Link
            to="/login"
            className="underline flex justify-center my-[15px] secondary_text font-light"
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
}
