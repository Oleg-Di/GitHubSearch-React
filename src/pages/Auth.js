import { useContext } from "react";
import { Input } from "../UI/input";
import { AuthContext } from "./../context/authForm/authContext";

export const Auth = () => {
  const {registerHandler, loginHandler, formControls, onChangeHandler, isFormValid, submitHandler } =
    useContext(AuthContext);

  return (
    <>
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "700px",
        }}
      >
        <form onSubmit={e =>submitHandler(e)}>
        <h1 className='text-center'>Log in or register</h1>
          {Object.keys(formControls).map((form, index) => {
            const control = formControls[form];
            return (
              <Input
                onChange={(e) => onChangeHandler(e, form)}
                control={control}
                key={index}
              />
            );
          })}
          <button
            onClick={loginHandler}
            disabled={!isFormValid}
            className={isFormValid ? "button btn-success" : "gray-500"}
          >
            Login
          </button>
          <button
            onClick={registerHandler}
            disabled={!isFormValid}
            style={{ marginLeft: 10 }}
            className={isFormValid ? "button btn-secondary" : "button gray-500"}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
