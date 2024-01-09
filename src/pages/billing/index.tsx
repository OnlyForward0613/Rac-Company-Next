import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import MainTable from "~/components/MainTable";
import PaymentHistory from "~/components/PaymentHistory/PaymentHistory";
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
  console.log("user: ", user)

  if (!user) return null;

  return (
    <TabContextProvider>
      <PageLayout>
        {/* <ShopContextProvider> */}
        <TopAppBar tabs={false} />
        <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
          <PaymentHistory />
        </div>
        {/* </ShopContextProvider> */}
      </PageLayout>
    </TabContextProvider>
  );
};

export default shop;
