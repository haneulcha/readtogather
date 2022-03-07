import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { supabase } from "../client";

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  const signIn = async () => {
    if (!email) return;
    const { user, error } = await supabase.auth.signIn({ email });

    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted)
    return (
      <div>
        <h1>Please check your email</h1>
      </div>
    );

  return (
    <div>
      <h1>Sign In</h1>
      <label>email</label>
      <input type="text" onChange={handleInput} />
      <button type="submit" onClick={signIn}>
        confirm
      </button>
    </div>
  );
};

export default SignIn;
