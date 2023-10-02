import { AuthError, AuthErrorCodes, updateEmail } from "firebase/auth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAlert } from "../hooks/useAlert";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";

export default function UpdateEmail() {
  const { currentUser } = useCurrentUser();
  const { activateAlert } = useAlert();
  const [email, setEmail] = useState("");
  const {setLoading} = useLoading();
  const redirect = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      redirect("/");
    }
  }, [currentUser, redirect]);

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
    if (currentUser !== null) {
      try {
        setLoading(true);
        await updateEmail(currentUser, email);
        redirect("/dashboard");
        setLoading(false);
        activateAlert("Email has been successfully updated", "green");
      } catch (error) {
        setLoading(false);
        switch((error as AuthError).code) {
            case AuthErrorCodes.EMAIL_EXISTS:
                activateAlert("A user with this email already exists", "red");
                break;
            case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
                activateAlert("Please log in to your account again", "yellow");
                break;
            default:
                activateAlert("An unexpected error has occured", "red");
        }
      }
    } else {
      return;
    }
  }

  return (
    <section>
      <div className="centeredDiv border-[1px] shadow-xl  h-[370px] w-[95%] max-w-[500px] m-auto mt-[20px] rounded-3xl p-[10px] sm:py-[20px] sm:px-[30px] centered_div">
        <p className="text-2xl font-bold p-[10px] md:px-[25px] pt-[25px] text-left">
          Update email
        </p>
        <form
          onSubmit={onFormSubmitHandler}
          className="flex flex-col mx-[10px] md:mx-[25px]"
        >
          <div className="flex flex-col my-[10px]">
            <Input
              type="email"
              placeholder="Enter new email"
              onChange={onChangeHandler}
              label="Email"
            />
          </div>
          <Button text="Confirm" />
          <Link
            to="/dashboard"
            className="underline flex justify-center my-[15px] secondary_text font-light"
          >
            Cancel
          </Link>
        </form>
      </div>
    </section>
  );
}