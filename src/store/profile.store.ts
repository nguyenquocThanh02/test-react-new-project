import { User } from "@/types/user.type";
import { create } from "zustand";

type UserState = {
  info: User | null;
  setInfo: (user: User) => void;
  clearInfo: () => void;
};

export const profileStore = create<UserState>((set) => ({
  info: null,
  setInfo: (info) =>
    set((state) => {
      return { ...state, info };
    }),
  clearInfo: () =>
    set((state) => {
      return { ...state, info: null };
    }),
}));
