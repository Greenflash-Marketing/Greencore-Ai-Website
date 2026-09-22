import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Diese Wrapper statt next/link bzw. next/navigation verwenden –
// sie halten die aktive Sprache in allen Links automatisch fest.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
