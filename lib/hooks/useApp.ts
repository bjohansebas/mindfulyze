import { AppContext } from "@/app/(app)/provider";
import { useContext } from "react";

export const useApp = () => useContext(AppContext)