import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import ExportContextProvider from "~/contexts/ExportContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const exportPage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <PageLayout>
        <ExportContextProvider>
          <TopAppBar />
        </ExportContextProvider>
      </PageLayout>
    </TabContextProvider>
  );
};

export default exportPage;
