import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import MainTable from "~/components/MainTable";
import { useAuthContext } from "~/contexts/AuthContext";
import ShopContextProvider from "~/contexts/ShopContext";
import TabContextProvider from "~/contexts/TabContext";
import AutoImportInvoicieShippingCost from "./AutoImportInvoicieShippingCost";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
    loading: () => (
        <div className="h-screen">
            <LoadingSpinner />
        </div>
    ),
});

const paymentDetail = ({ serviceType }: any) => {
    const { user } = useAuthContext();

    if (!user) return null;

    return (
        <PageLayout>
            <TopAppBar tabs={false} />
            <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
                <AutoImportInvoicieShippingCost />
            </div>
        </PageLayout>
    );
};

export default paymentDetail;
