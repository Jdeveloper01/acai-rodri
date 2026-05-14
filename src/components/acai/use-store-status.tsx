import { useMemo } from "react";

const OPENING_TIME = 10; // 10:00
const CLOSING_TIME = 23; // 23:00

export function useStoreStatus() {
  return useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const isOpen =
      currentHour >= OPENING_TIME && currentHour < CLOSING_TIME;

    const schedule = `${String(OPENING_TIME).padStart(2, "0")}:00 - ${String(CLOSING_TIME).padStart(2, "0")}:00`;

    return { isOpen, schedule };
  }, []);
}
