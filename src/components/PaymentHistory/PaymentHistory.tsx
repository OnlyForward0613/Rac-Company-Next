/* eslint-disable @next/next/no-img-element */
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { BackSquare, More, TickSquare, CloseSquare } from "iconsax-react";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Balancer from "react-wrap-balancer";
import { capitalizeWords } from "~/Utils";
import { CancelButton } from "~/components/Buttons/CancelButton";
import { CloseModalButton } from "~/components/Buttons/CloseModalButton";
import { MoreButton } from "~/components/Buttons/MoreButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import RequestOrderButton from "~/components/Buttons/RequestOrderButton";
import CongratulationImage from "~/components/CongratulationImage";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import MainTable from "~/components/MainTable";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
    DetailSection,
    InitiateShippingButton,
} from "~/components/Shop/Orders/InitiateShipping";
import {
    ClearPackageButton,
    ImageColumn,
    PickUpInstructions,
    TrackButton,
    excluded,
    type ShippingStatusModalProps,
    type ShippingStatusProps,
    type SomeStatusType,
} from "~/components/Shop/Orders/OrdersPanel";
import {
    RequestFormHeader,
    SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { type FilterCategoriesType } from "~/components/SearchBar";
import { SHIPPING_STATUS } from "~/constants";
import {
    useAutoImportContext,
    type AutoImportOrderPackageType,
} from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import ReturnToButton from "../Buttons/ReturnToButton";
import { PaymentPackageType, usePaymentContext } from "~/contexts/PaymentContext";
import { EyeButton } from "../Buttons/EyeButton";
import Link from "next/link";

const paymentData = [
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'shop for me',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'import',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'auto import',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'export',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'shop for me',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'import',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'auto import',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
    {
        invoiceID: "IN6123578",
        orderId: "OD08756",
        service: 'export',
        paymentFor: 'Shipping Cost',
        totalCost: 107.76,
        createdAt: new Date().toLocaleString(),
        paidAt: new Date().toLocaleString(),
    },
];
const PaymentHistory = () => {
    // const { orderPackages } = useAutoImportContext();

    if (Array.isArray(paymentData) && paymentData.length > 0) {
        console.log('paymentData: ', paymentData)
        return (
            <OrdersTable />
        );
    }

    return (
        <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
            <h2 className="title-lg max-w-[462px] text-center">
                <Balancer>
                    You have no payment history here at the moment yet.
                </Balancer>
            </h2>
            <ReturnToButton />
        </div>
    );
};

const OrdersTable = () => {
    // let { orderPackages } = usePaymentContext();
    const paymentData = [
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'shop for me',
            paymentFor: 'Shipping Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'import',
            paymentFor: 'Shipping Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'auto import',
            paymentFor: 'Shipping Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'export',
            paymentFor: 'Shipping Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'shop for me',
            paymentFor: 'Shop For Me Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'import',
            paymentFor: 'Clearing & Port Handling',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'auto import',
            paymentFor: 'Clearing & Port Handling',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
        {
            invoiceID: "IN6123578",
            orderId: "OD08756",
            service: 'export',
            paymentFor: 'Shipping Cost',
            totalCost: 107.76,
            createdAt: new Date().toLocaleString(),
            paidAt: new Date().toLocaleString(),
        },
    ];
    const { handleActiveAction, handleViewIndex } = useTabContext();

    const onClick = (index: number) => {
        handleViewIndex(index);
        handleActiveAction("order details");
    };

    const defaultColumns = useMemo(() => {
        const columnHelper = createColumnHelper<PaymentPackageType>();

        return [
            columnHelper.display({
                id: "invoiceID",
                header: "Invoice ID",
                cell: ({ row }) => (
                    <span className="title-md font-medium">{row.original.invoiceID}</span>
                ),
            }),
            columnHelper.accessor("orderId", {
                header: "Request/Order ID",
                cell: ({ row }) => (
                    <Link href={`/billing/${row.original.service + row.original.paymentFor}`}><span className="title-md font-medium">{row.original.orderId}</span></Link>
                ),
            }),
            columnHelper.display({
                id: "service",
                header: "Service",
                cell: ({ row }) => (
                    <span className="title-md font-medium">
                        {capitalizeWords(row.original.service)}
                    </span>
                ),
            }),
            columnHelper.accessor("paymentFor", {
                header: "Payment For",
                cell: ({ row }) => (
                    <span className="title-md font-medium text-primary-900">
                        {row.original.paymentFor}
                    </span>
                ),
            }),
            columnHelper.accessor("totalCost", {
                header: "Total Cost",
                cell: ({ row }) => (
                    <span className="title-md flex gap-[5px] font-medium">
                        <More size="20" variant="Bold" className="text-error-600" />$
                        {row.original.totalCost}
                    </span>
                ),
            }),
            columnHelper.accessor("createdAt", {
                header: "Created At",
                cell: ({ row }) => (
                    <span className="title-md font-medium">
                        {row.original.createdAt}
                    </span>
                ),
            }),
            columnHelper.accessor("paidAt", {
                header: "Paid At",
                cell: ({ row }) => (
                    <span className="title-md font-medium">
                        {row.original.paidAt}
                    </span>
                ),
            }),
            columnHelper.display({
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <EyeButton onClick={() => onClick(Number(row.id))} />
                )
            })
        ] as Array<ColumnDef<AutoImportOrderPackageType, unknown>>;
    }, []);

    const filterCategories = useMemo<FilterCategoriesType[]>(
        () => [
            {
                category: "Payment status",
                categoryFilters: [
                    {
                        label: (
                            <span className="flex items-center gap-[10px]">
                                <TickSquare
                                    size={18}
                                    variant="Bold"
                                    className="text-primary-900"
                                />
                                Paid
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                <More size={18} variant="Bold" className="text-error-600" />
                                To be paid up on clearing
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                <More size={18} variant="Bold" className="text-error-600" />
                                Unpaid
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                <BackSquare
                                    size={18}
                                    variant="Bold"
                                    className="text-primary-600"
                                />
                                Reversed
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                <CloseSquare size={18} variant="Bold" className="text-error-600" />
                                Cancelled
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                <More size={18} variant="Bold" className="text-gray-300" />
                                Processing
                            </span>
                        ),
                    },
                ],
            },
            {
                category: "Service",
                categoryFilters: [
                    {
                        label: (
                            <span className="flex items-center gap-[10px]">
                                Shop for me
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                Export
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                Import
                            </span>
                        ),
                    },
                    {
                        label: (
                            <span className="flex items-center gap-[5px]">
                                Auto Import
                            </span>
                        ),
                    },
                ],
            },
            {
                category: "Total cost",
                categoryFilters: [
                    { label: "$0 - $20" },
                    { label: "$20 - $50" },
                    { label: "$50 - $100" },
                    { label: "$100 - $500" },
                    { label: "Above $500" },
                ],
            },
        ],
        [],
    );

    return (
        <MainTable
            id="payment"
            columns={defaultColumns}
            data={paymentData}
            filterCategories={filterCategories}
        />
    );
};

const ShippingStatus = ({ id, status }: ShippingStatusProps) => {
    // const capitalizedWords = status
    //     .split(" ")
    //     .map((word) => {
    //         return word.slice(0, 1).toUpperCase() + word.slice(1);
    //     })
    //     .join(" ");

    useEffect(() => {
        tailmater();
    }, []);

    const modalId = `shipping-status-modal-${id}`;
    const dataTarget = `#${modalId}`;

    const buttonStyles = {
        "not started": "bg-gray-200 text-gray-700",
        "ready for shipping": "bg-brand-orange text-white",
        "arrived destination": "bg-primary-900 text-white",
        "in transit": "bg-primary-600 text-white",
        processing: "bg-gray-500 text-white",
        cleared: "bg-primary-900 text-white",
        delivered: "bg-primary-900 text-white",
        cancelled: "bg-error-600 text-white",
    };

    const buttonStyle = buttonStyles[status];

    return (
        <>
            <button
                data-type="dialogs"
                data-target={dataTarget}
                // aria-label={capitalizedWords}
                className={`btn relative w-full rounded-[10px] px-[10px] py-[5px] text-center ${buttonStyle}`}
            >
                "capitalizedWords"
            </button>
            {createPortal(
                <ShippingStatusModal {...{ modalId, status }} />,
                document.body,
            )}
        </>
    );
};

const ShippingStatusModal = ({ modalId, status }: ShippingStatusModalProps) => {
    const dataClose = `#${modalId}`;

    const content = {
        cancelled:
            "Kindly note that the shipping for your package has been cancelled.",
        "not started":
            "The purchase of the item(s) in your package has not started or under process. We will notify you your package is ready for shipping.",
        "ready for shipping":
            "Your package is ready to be shipped, kindly proceed to initiate shipping for your package.",
        processing:
            "Your shipment is under processing, would you like to track it?",
        "in transit": "Your package is in transit, would you like to track it?",
        "arrived destination":
            "Your package has arrived its destination, you are required to clear it now before you can pick it up.",
    };

    const statusToImageMap = {
        "ready for shipping": "/images/shipping status modal/roadmap1_image.svg",
        processing: "/images/shipping status modal/roadmap1_image.svg",
        "in transit": "/images/shipping status modal/roadmap2_image.svg",
        "arrived destination": "/images/shipping status modal/roadmap3_image.svg",
    };

    const imagePath = statusToImageMap[status as SomeStatusType];

    const maxWidth =
        status === "cleared" ? "max-w-[1000px] mt-60" : "max-w-[700px]";

    const marginTop = status === "cleared" ? "mt-[400px] md:mt-[300px]" : "";

    return (
        <div
            id={modalId}
            className={
                "ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center  justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
            }
        >
            <div
                data-close={dataClose}
                className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
            ></div>
            <div
                className={`z-50 flex h-max w-full flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px] ${maxWidth} ${marginTop}`}
            >
                <RequestFormHeader title="Shipping Status" />

                <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 bg-surface-200 p-[20px]">
                    <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
                </div>

                {!excluded.includes(status) && (
                    <div className="flex rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
                        <hr className="h-[65px] border-r border-solid border-white" />
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-[1px] pl-[10px]">
                                <span className="title-md font-bold">Origin:</span>
                                <span className="label-lg">Nigeria</span>
                            </div>
                            {imagePath && (
                                <img
                                    src={imagePath}
                                    alt={`roadmap ${status} image`}
                                    className="my-4 md:-my-2"
                                />
                            )}
                            <div className="flex flex-col gap-[1px] self-end pr-[10px]">
                                <span className="title-md font-bold">Origin:</span>
                                <span className="label-lg">USA</span>
                            </div>
                        </div>
                        <hr className="h-[65px] self-end border-r border-solid border-secondary-600" />
                    </div>
                )}

                {status === "delivered" && (
                    <CongratulationImage text="Your package has been delivered." />
                )}
                {status === "cleared" && (
                    <>
                        <CongratulationImage text="you can now pick up your package from our office in Nigeria (your selected “Destination”)" />

                        <div className="rounded-[20px] border border-gray-200 bg-surface-200 px-[28px] py-[20px]">
                            <div className="grid w-fit grid-cols-1 gap-[15px] md:grid-cols-4">
                                <DetailSection
                                    label="Pick up Address"
                                    value="No, 1osolo way, ikeja road, behind scaint merry"
                                />
                                <DetailSection
                                    label="Country"
                                    value="Nigeria"
                                    colSpanMobile={1}
                                    colSpanDesktop={1}
                                />
                                <DetailSection
                                    label="State"
                                    value="Lagos"
                                    colSpanMobile={1}
                                    colSpanDesktop={1}
                                />
                                <DetailSection
                                    label="City"
                                    value="Ikeja"
                                    colSpanMobile={1}
                                    colSpanDesktop={1}
                                />
                                <DetailSection
                                    label="Zip/postal Code"
                                    value="98765"
                                    colSpanMobile={1}
                                    colSpanDesktop={1}
                                />
                            </div>
                        </div>
                        <SectionHeader title="What next?" />
                        <PickUpInstructions />
                    </>
                )}

                <p className="title-lg text-neutral-900">
                    {content[status as SomeStatusType]}
                </p>

                <div className="flex flex-row items-end justify-end">
                    <div className="w-max whitespace-nowrap">
                        {["cancelled", "not started", "cleared", "delivered"].includes(
                            status,
                        ) && <CloseModalButton dataClose={dataClose} />}
                        {status === "ready for shipping" && (
                            <div className="flex gap-[8px]">
                                <CancelButton dataClose={dataClose} />
                                <InitiateShippingButton dataClose={dataClose} />
                            </div>
                        )}
                        {(status === "processing" || status === "in transit") && (
                            <div className="flex gap-[8px]">
                                <CancelButton dataClose={dataClose} />
                                <TrackButton dataClose={dataClose} />
                            </div>
                        )}
                        {status === "arrived destination" && (
                            <div className="flex gap-[8px]">
                                <CancelButton dataClose={dataClose} />
                                <ClearPackageButton dataClose={dataClose} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
