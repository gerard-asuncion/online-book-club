import * as Sentry from '@sentry/react';
import { useEffect } from "react";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/form/Sidebar";
import ScreenFrame from "../../components/ui/ScreenFrame";
import useSidebar from "../../hooks/useSidebar";
import useResponsive from "../../hooks/useResponsive";
import useUserData from "../../hooks/useUserData";
import { changeWindowLayout, changeSidebarLayout } from "../../utils/classNameUtils";
import type { AppLayoutProps } from '../../types/props';

function AppLayout({ children }: AppLayoutProps) {
  
  const { updateUserData } = useUserData();
  const { isOpenSidebar } = useSidebar();

  useEffect(() => {
    updateUserData();
  }, [])

  useResponsive();

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ScreenFrame page="full">
        <Header />
          <section className="md:grid md:grid-cols-4 grow overflow-hidden">
              <div className={`
                ${changeWindowLayout(isOpenSidebar)}
                overflow-hidden`}>
                  {children}
              </div>
              <div className={`
                ${changeSidebarLayout(isOpenSidebar)}
                md:border-l-4
                border-main-color
                overflow-y-auto
                px-5`}>
                  <Sidebar />
              </div>
          </section>
      </ScreenFrame>
    </Sentry.ErrorBoundary>
  )
}

export default AppLayout;