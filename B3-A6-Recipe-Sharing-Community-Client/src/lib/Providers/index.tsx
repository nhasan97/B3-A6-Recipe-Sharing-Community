"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ProvidersProps } from "@/src/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/src/context/user.provider";
import { Toaster } from "sonner";
import RecipeProvider from "@/src/context/recipes.providers";

// Create a client
const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RecipeProvider>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </RecipeProvider>
      </UserProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
