import dynamic from "next/dynamic";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import TrackingContextProvider from "~/contexts/TrackingContext";

const Search = dynamic(() => import("~/components/Tracking/Search"));
const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const tracking = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TrackingContextProvider>
      <PageLayout>
        <TopAppBar tabs={false} />
        <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
          <Search />
          <NeedHelpFAB />
        </div>
      </PageLayout>
    </TrackingContextProvider>
  );
};

export default tracking;
