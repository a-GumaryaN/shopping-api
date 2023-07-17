interface Code {
  email: string;
  phone_number: string;
  code: string;
  target: "reset password" | "registration" | "password less login";
}

export default Code;
