import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { signInUserWithEmailAndPassword } from "../utils/firebase/userData";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";


const defaultFormFields = {
  email: "",
  password: "",
};

export default function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const redirect = useNavigate()
  const { activateAlert } = useAlert();
  const {setLoading} = useLoading();
 
  // get value from input function
  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function onFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "" || password === "") {
      activateAlert("Please enter an email and / or password", "red");
      return;
    }
    try {
      setLoading(true);
      await signInUserWithEmailAndPassword(email, password);
      redirect("/")
      setLoading(false);
      activateAlert("User logged in successfully", "green");
    } catch (error) {
      setLoading(false);
      switch ((error as AuthError).code) {
        case "auth/user-not-found":
            activateAlert("User with such email does not exist", "red");
            break;
          case AuthErrorCodes.INVALID_PASSWORD:
            activateAlert("Incorrect Password", "red");
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            activateAlert("Too many attemps. Try again later", "red");
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            activateAlert("Please enter a valid email address", "red");
            break;
          default:
            activateAlert("An unexpected error has occured", "red")
            break;
      }
    }
  }

  return (
    <>
      <div className="h-[100vh]">
        <div className="centeredDiv border-[1px] shadow-xl  h-[480px] w-[95%] max-w-[500px] m-auto rounded-3xl p-[10px] sm:py-[20px] sm:px-[30px] centered_div">
          <p className="text-2xl font-bold p-[10px] md:px-[25px] pt-[25px] text-left">
            Login to Your Account
          </p>
          <form
            onSubmit={onFormSubmitHandler}
            className="flex flex-col mx-[10px] md:mx-[25px]"
          >
            <Input
              required
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={onInputChangeHandler}
              value={email}
              label="Email"
            />

            <Input
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={onInputChangeHandler}
              value={password}
              label="Password"
            />
            <Link
              to="/forgot-password"
              className="underline flex justify-center mx-[15px] secondary_text font-light"
            >
              Forgot password?
            </Link>
            <Button type="submit" text={"Login"} />
          </form>
          <div className="mx-[10px] md:mx-[25px]">
            <p className="mt-[15px] mx-[5px] text-center secondary_text font-light">
              Don&apos;t have an account?
              <Link to="/register" className="underline ml-[3px] font-semibold">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
