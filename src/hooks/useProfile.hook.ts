import { localStorageKey } from "@/constants";
import { getProfile } from "@/service";
import { profileStore } from "@/store";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useProfileHook = () => {
  const { setInfo } = profileStore();
  const token = localStorage.getItem(localStorageKey.accessToken);

  const { data } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(),
  });

  const profile: User | undefined = data;

  if (token && profile) {
    setInfo(profile);
  }

  return profile;
};
