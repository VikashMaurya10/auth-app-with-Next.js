import { toast } from "react-toastify";

const isValidEmail = (email) => {
  const fillterString = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,3}$/;

  if (email?.length == 0) {
    document.getElementById("email").focus();
    toast.warning("Please enter email");
    return false;
  }

  if (!fillterString.test(email)) {
    document.getElementById("email").focus();
    toast.error("Please enter a valid email");
    return false;
  }
  return true;
};

const isValidPassword = (password) => {
  const fillterString =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password?.length == 0) {
    toast.warning("Please enter password");
    return false;
  }

  if (!fillterString.test(password)) {
    toast.warning(
      "Please enter At least one lowercase letter At least one uppercase letter At least one digit At least one special character from the set [@$!%*?&] A minimum length of 8 characters"
    );
    return false;
  }
  return true;
};

export { isValidPassword, isValidEmail };
