import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updatePassword } from "firebase/auth";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLoading } from "../hooks/useLoading";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

export default function UpdatePassword() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;
  const { activateAlert } = useAlert();
  const { currentUser } = useCurrentUser();
  const {setLoading} = useLoading();
  const redirect = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      redirect("/");
    }
  }, [currentUser, redirect]);

  function onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function onFormSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === "" || confirmPassword === "") {
      activateAlert("Please fill out all fields", "red");
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
    if (currentUser !== null) {
        try {
          setLoading(true)
            await updatePassword(currentUser, password);
            redirect("/dashboard");
            setLoading(false);
            activateAlert("Password have beed successfully updated", "green");
        } catch (error) {
          setLoading(false)
            activateAlert("An unexpected error has occured", "red");
        }
    }
  }

  return (
    <section>
      <div className="centeredDiv border-[1px] shadow-xl  h-[470px] w-[95%] max-w-[500px] m-auto mt-[20px] rounded-3xl p-[10px] sm:py-[20px] sm:px-[30px] centered_div">
        <p className="text-2xl font-bold p-[10px] md:px-[25px] pt-[25px] text-left">
          Update Password
        </p>
        <form
          onSubmit={onFormSubmitHandler}
          className="flex flex-col mx-[10px] md:mx-[25px]"
        >
          <div className="flex flex-col my-[10px]">
          <Input
            required
            type="password"
            placeholder="New password"
            name="password"
            onChange={onInputChangeHandler}
            value={password}
            label="Password"
          />
          <Input
            required
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            onChange={onInputChangeHandler}
            value={confirmPassword}
            label="Confirm Password"
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
