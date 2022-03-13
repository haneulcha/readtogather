import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { User } from "@supabase/supabase-js";

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<User>();
  const router = useRouter();

  const fetchProfile = async () => {
    const profileData = await supabase.auth.user();
    if (!profileData) {
      router.push("/sign-in");
    } else {
      setProfile(profileData);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="profile-container">
      {profile.id}
      {profile.email}
      <button type="button" onClick={signOut}>
        log out
      </button>
    </div>
  );
};

export default Profile;
