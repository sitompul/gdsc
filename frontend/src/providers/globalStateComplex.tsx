import { FC, ReactNode, createContext, useContext, useState } from "react";

import { Null, useStateType } from "../types/general";

/**
 * To create new Global State, copy all the contents below and replace "Profile" with "YourGlobalStateName"
 * And change the Profile type to match your object structure.
 */

export type Profile = {
  email: string;
  name: string;
}

const defaultProfile: Profile = {
  email: "",
  name: ""
};

const ProfileContext = createContext<Null<useStateType<Profile>>>(null);

type ProfileProps = {
  children: ReactNode;
}
export const ProfileProvider: FC<ProfileProps> = function(p) {
  const [get, set] = useState<Profile>(defaultProfile);

  return <ProfileContext.Provider
    value={[get, set]}
  >
    {p.children}
  </ProfileContext.Provider>;
}

export function useProfile() {
  const res = useContext(ProfileContext);
  return res || useState<Profile>(defaultProfile);
}
