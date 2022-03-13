import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function App({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  // set auth cookie
  const handleAuthChange = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) {
      setIsAuth(true);
    } else {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setIsAuth(true);
          router.push("/profile");
        }
        if (event === "SIGNED_OUT") {
          setIsAuth(false);
          router.push("/");
        }

        return () => authListener?.unsubscribe();
      }
    );
    checkUser();
  }, []);

  return (
    <Provider session={pageProps.session}>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        {!isAuth && (
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        )}
        <Link href="/protected">
          <a>Protected</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </Provider>
  );
}
