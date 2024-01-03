import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import ShopContextProvider from "~/contexts/ShopContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const shop = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <PageLayout>
        <ShopContextProvider>
          <TopAppBar />
        </ShopContextProvider>
      </PageLayout>
    </TabContextProvider>
  );
};

export default shop;
