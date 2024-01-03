import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import ImportContextProvider from "~/contexts/ImportContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const importPage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <PageLayout>
        <ImportContextProvider>
          <TopAppBar />
        </ImportContextProvider>
      </PageLayout>
    </TabContextProvider>
  );
};

export default importPage;
