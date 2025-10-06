"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { ToastContext, ToastMessage } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const showToast = useCallback((msg: ToastMessage | ToastMessage[]) => {
    const m = Array.isArray(msg) ? msg[0] : msg;
    setMessage(m);
    setOpen(false);
    // ensure state flip to retrigger animation
    requestAnimationFrame(() => setOpen(true));
  }, []);

  const bgBySeverity = useMemo(() => {
    switch (message?.severity) {
      case "success":
        return "bg-green-600";
      case "warn":
        return "bg-yellow-600";
      case "error":
        return "bg-red-600";
      default:
        return "bg-gray-800";
    }
  }, [message]);

  const duration = message?.life ?? 3000;

  useEffect(() => {
    if (!open || !duration) return;
    const t = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(t);
  }, [open, duration]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        <RadixToast.Root
          className={`pointer-events-auto fixed right-4 top-4 z-50 max-w-sm rounded text-white shadow-lg ${bgBySeverity}`}
          open={open}
          onOpenChange={setOpen}
        >
          {message?.summary && (
            <div className="px-4 pt-3 text-sm font-semibold">
              {message.summary}
            </div>
          )}
          {message?.detail && (
            <div className="px-4 pb-3 text-sm opacity-90">{message.detail}</div>
          )}
        </RadixToast.Root>
        <RadixToast.Viewport className="fixed bottom-0 right-0 z-50 flex w-96 max-w-full flex-col gap-2 p-4 outline-none" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
