"use client";

import { createContext, useContext } from "react";
export type ToastMessage = {
  severity?: "success" | "info" | "warn" | "error";
  summary?: string;
  detail?: string;
  life?: number;
};

type ToastContextType = {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}