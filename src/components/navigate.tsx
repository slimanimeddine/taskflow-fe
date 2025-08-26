"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectProps {
  to: string;
  replace?: boolean;
}

export default function Navigate({ to, replace = true }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to as Route);
    } else {
      router.push(to as Route);
    }
  }, [to, replace, router]);

  return null;
}
