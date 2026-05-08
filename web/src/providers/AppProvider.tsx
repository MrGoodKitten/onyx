"use client";

import type { ReactNode } from "react";
import { CombinedSettings } from "@/interfaces/settings";
import { UserProvider } from "@/providers/UserProvider";
import { ProviderContextProvider } from "@/components/chat/ProviderContext";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { User } from "@/lib/types";
import { ModalProvider } from "@/components/context/ModalContext";
import { AuthTypeMetadata } from "@/lib/userSS";
import { AppSidebarProvider } from "@/providers/AppSidebarProvider";
import { AppBackgroundProvider } from "@/providers/AppBackgroundProvider";
import { QueryControllerProvider } from "@/providers/QueryControllerProvider";
import ToastProvider from "@/providers/ToastProvider";

interface AppProviderProps {
  children: ReactNode;
  user: User | null;
  settings: CombinedSettings;
  authTypeMeta AuthTypeMetadata;
  folded?: boolean;
}

export default function AppProvider({
  children,
  user,
  settings,
  authTypeMetadata,
  folded,
}: AppProviderProps) {
  return (
    <SettingsProvider settings={settings}>
      <UserProvider
        settings={settings}
        user={user}
        authTypeMetadata={authTypeMetadata}
      >
        <AppBackgroundProvider>
          <ProviderContextProvider>
            <ModalProvider user={user}>
              <AppSidebarProvider folded={!!folded}>
                <QueryControllerProvider>
                  <ToastProvider>{children}</ToastProvider>
                </QueryControllerProvider>
              </AppSidebarProvider>
            </ModalProvider>
          </ProviderContextProvider>
        </AppBackgroundProvider>
      </UserProvider>
    </SettingsProvider>
  );
}

