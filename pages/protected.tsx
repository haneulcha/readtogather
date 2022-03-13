import { GetServerSideProps, NextPage } from "next";
import { supabase } from "../client";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}
const Protected: NextPage<Props> = ({ user }) => {
  console.log({ user });
  return <div className="protected">Hello from protected route</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) return { props: {}, redirect: { destination: "/sign-in" } };

  return {
    props: { user },
  };
};

export default Protected;
