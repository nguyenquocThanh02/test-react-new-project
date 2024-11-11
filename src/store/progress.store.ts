import { create } from "zustand";

type progressType = {
  progress: number;
  uploadSize: number;
  totalSize: number;
  setProgress: (value: number) => void;
  setUploadSize: (value: number) => void;
  setTotalSize: (value: number) => void;
};
export const progressStore = create<progressType>((set) => ({
  progress: 0,
  uploadSize: 0,
  totalSize: 0,
  setProgress: (value: number) => set(() => ({ progress: value })),
  setUploadSize: (value: number) => set(() => ({ uploadSize: value })),
  setTotalSize: (value: number) => set(() => ({ totalSize: value })),
}));
