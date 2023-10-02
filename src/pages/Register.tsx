import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/shared/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/userData";
import { UserCredential } from "firebase/auth";
import { useAlert } from "../hooks/useAlert";
import { formatUserName } from "../helpers/formatUsenname";
import { useLoading } from "../hooks/useLoading";

// creating an object that stores default form fields
const defaultFormFields = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { userName, email, password, confirmPassword } = formFields;
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const redirect = useNavigate();
  const { activateAlert } = useAlert();
  const {setLoading} = useLoading();

  // handler function to update the state when input changes
  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function onFormSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      activateAlert("Please fill out all fields", "red");
      return;
    }
    if (checkboxChecked === false) {
      activateAlert("Please agree to the privacy policy", "red");
      return;
    }
    if (password.length < 5) {
      activateAlert("Password must be at least 6 characters", "red");
      return;
    }
    if (password !== confirmPassword) {
      activateAlert("Passwords do not match", "red");
      return;
    }
    if (userName.length > 10) {
      activateAlert("Name can not be longer that 10 characters", "red");
      return;
    }
    const username = formatUserName(userName);
    try {
      setLoading(true);
      // login user
      const data: UserCredential | undefined =
        await createAuthUserWithEmailAndPassword(email, password);
      if (data === undefined) return;
      // add user to DB
      await createUserDocumentFromAuth(data.user, { username });
      setLoading(false);
      redirect("/");
      activateAlert("User account created successfully", "green");
    } catch (error) {
      setLoading(false);
      activateAlert("An unexpected error has occured", "red");
      console.log("error during sign up", error);
    }
  }

  function onCheckboxHandler() {
    setCheckboxChecked((prev) => !prev);
  }

  return (
    <div className="h-[100vh]">
      <div className="sm:centeredDiv border-[1px] shadow-xl h-[700px] sm:h-[730px] w-[95%] max-w-[500px] m-auto sm:mt-[40px] rounded-3xl p-[10px] sm:py-[20px] sm:px-[30px]">
        <p className="text-2xl font-bold p-[10px] md:px-[25px] pt-3 sm:pt-[25px] text-left">
          Create Your Account
        </p>
        <form
          onSubmit={onFormSubmitHandler}
          className="flex flex-col mx-[10px] md:mx-[25px]"
        >
          <Input
            required
            type="text"
            placeholder="Name"
            name="userName"
            onChange={onInputChangeHandler}
            value={userName}
            label="Name"
          />
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
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onInputChangeHandler}
            value={confirmPassword}
            label="Confirm Password"
          />
          <p className="mt-[5px] mb-[10px] font-light text-sm secondary_text">
            *Password must be at least 6 characters
          </p>
          <div className="flex justify-start">
            <div className="flex flex-row justify-between items-center">
              <input
                type="checkbox"
                className="mr-3 h-5 w-5"
                onChange={onCheckboxHandler}
                checked={checkboxChecked}
              />
              <p className="font-light">
                I agree to the{" "}
                <Link
                  to={"/privacy-policy"}
                  className="underline ml-[3px] font-semibold"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
          <Button text="Sign Up" />
          <div className="mx-[10px] md:mx-[25px]">
            <p className="mt-[15px] mx-[5px] text-center secondary_text font-light">
              Already have an account?
              <Link to="/login" className="underline ml-[3px] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
