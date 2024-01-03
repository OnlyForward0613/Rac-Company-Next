import { ConvertCard, Security, Wallet } from "iconsax-react";
import { BackButton } from "~/components/Buttons/BackButton";
import LabelId from "~/components/LabelId";
import { type REQUEST_STATUS } from "~/constants";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import AccordionButton from "../../Forms/AccordionButton";
import { NotRespondedStatus, RespondedStatus } from "../Orders";
import { DetailSection } from "../Orders/InitiateShipping";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "./RequestOrder";

const RequestDetails = () => {
  const { requestPackages } = useShopContext();
  const { viewIndex, handleActiveAction, handleTabChange } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const status = requestPackage.requestStatus ?? "Not Responded";

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleProceed = () => {
    handleTabChange("requests");
    handleActiveAction("proceed to checkout");
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Shop For Me Order Request Details" />
      <LabelId label="Request ID" id={requestPackage.requestId} />
      <RequestInformation
        info={{
          date: requestPackage.requestLocalDate.toLocaleString(),
          status,
        }}
        onClick={handleProceed}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {requestPackage.items.map((item, i) => {
          return <Item key={i} index={i} />;
        })}
      </div>
      <BillingDetails />
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
        {status === "Responded" && (
          <RedProceedToCheckoutButton onClick={handleProceed} />
        )}
      </div>
    </div>
  );
};

type ProceedButtonProps = { onClick: () => void };

export const RedProceedToCheckoutButton = ({ onClick }: ProceedButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Proceed"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Wallet size={18} variant="Bold" />
      <span className="body-lg text-white">Proceed to checkout</span>
    </button>
  );
};

export const BillingDetails = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Billing Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Payments Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[14px] py-[10px]">
                <p className="label-lg text-gray-700">
                  The <b className="text-neutral-900">shop for me cost</b> could
                  have been changed/updated by our staffs if they observe
                  differences between the details you provided and the ones we
                  verify from the store, however we will inform you about it.
                </p>
              </div>
              <div className="flex w-max flex-col gap-[15px]">
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Total Shipment Cost:</span>
                  <span className="title-lg text-neutral-900">
                    Not yet allocated
                  </span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Payment Status:</span>
                  <span className="title-lg text-neutral-900">Unpaid</span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <LabelWithTooltip label="Total Shop For Me Cost:" />
                  <span className="title-lg text-neutral-900">$234,000.00</span>
                </div>
                <div className="grid grid-cols-1 items-center gap-[20px] text-gray-700 md:grid-cols-2">
                  <span className="body-md">Store:</span>
                  <span className="title-lg text-neutral-900">Amazon</span>
                </div>
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

type ItemProps = {
  index: number;
};

export const Item = ({ index }: ItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg font-medium text-gray-700">
            Item - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && (
          <>
            <HighlightedInfo text="These details could have been changed/updated by our staffs if they observe differences between the ones you provided and the ones we verified from the store, however we will inform you about it." />
            <div className="grid w-full grid-cols-2 gap-[15px] md:grid-cols-4">
              <RequestItemDetails />
              <RequestItemRelatedCosts />
            </div>
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

const RequestItemDetails = () => {
  return (
    <>
      <DetailSection label="Store" value="Amazon" />
      <DetailSection label="Urgent Purchase" value="No" />
      <DetailSection label="Item URL" value="htttp/jjnkkukja.jhgyjayjdjjhcjc" />
      <DetailSection label="Item Name" value="Designer Bags" tooltip />
      <DetailSection label="Item Cost from Store" value="$45.00" />
      <DetailSection label="Quantity" value="4" />
      <DetailSection label="Weight" value="67kg" colSpanDesktop={1} tooltip />
      <DetailSection
        label="Height"
        value="5 inches"
        colSpanDesktop={1}
        tooltip
      />
      <DetailSection
        label="Length"
        value="5 inches"
        colSpanDesktop={1}
        tooltip
      />
      <DetailSection
        label="Width"
        value="5 inches"
        colSpanDesktop={1}
        tooltip
      />
      <DetailSection
        label="Product/Item Picture"
        value="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
        image
        tooltip
      />
      <DetailSection
        label="Product Description"
        value="Additonvnv ghss jgsjvsn"
      />
      <DetailSection label="Color" value="Blue" colSpanDesktop={1} tooltip />
      <DetailSection
        label="Stripes"
        value="5 inches"
        colSpanDesktop={1}
        tooltip
      />
    </>
  );
};

const RequestItemRelatedCosts = () => {
  return (
    <>
      <div className="col-span-full">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center">
            <span className="title-md md:title-lg text-primary-900">
              Item Related Costs
            </span>

            <hr className="mx-[10px] flex-grow border-dashed border-primary-900" />

            <div className="hidden md:block">
              <div className="flex flex-col items-center gap-[10px] md:flex-row md:gap-[20px]">
                <span className="body-md">
                  Default Currency: <span className="title-sm">USD</span>
                </span>
                <div className="w-max">
                  <ChangeCurrencyButton />
                </div>
              </div>
            </div>
          </div>

          <HighlightedInfo
            text="These costs could have been changed/updated by our staffs if they
            observed differences between the details you provided and the ones
            we verified from the store."
          />
          {/* for mobile screen */}
          <div className="block md:hidden">
            <div className="flex flex-col items-center gap-[10px] md:flex-row md:gap-[20px]">
              <span className="body-md">
                Default Currency: <span className="title-sm">USD</span>
              </span>
              <div className="w-full md:w-max">
                <ChangeCurrencyButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full flex flex-col gap-[5px] md:col-span-2 md:gap-[20px]">
        <span className="body-md text-primary-600 md:max-w-[139px]">
          Urgent purchase fee:
        </span>
        <span className="title-md md:title-lg font-medium text-primary-900">
          $0.00
        </span>
      </div>

      <div className="col-span-full flex flex-col gap-[5px] md:col-span-2 md:gap-[20px]">
        <span className="body-md text-primary-600 md:max-w-[139px]">
          <LabelWithTooltip label="Processing Fee:" />
        </span>
        <span className="title-md md:title-lg font-medium text-primary-900">
          $87,000.00
        </span>
      </div>

      <div className="col-span-full flex flex-col gap-[5px] md:col-span-2 md:gap-[20px]">
        <span className="body-md text-primary-600 md:w-[139px] ">
          Shipping to Origin Warehouse Cost:
        </span>
        <span className="title-md md:title-lg font-medium text-primary-900">
          $87,000.00
        </span>
      </div>

      <div className="col-span-full flex flex-col gap-[5px] md:col-span-2 md:gap-[20px]">
        <span className="body-md text-primary-600 md:max-w-[139px]">
          <LabelWithTooltip label="Shop For Me Cost:" />
        </span>
        <span className="title-md md:title-lg font-medium text-primary-900">
          $87,000.00
        </span>
      </div>
    </>
  );
};

// todo:
const ChangeCurrencyButton = () => {
  return (
    <button
      aria-label="change currency"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-400 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <ConvertCard size={16} color="#292d32" variant="Bold" />
      <span className="label-lg">Change Currency</span>
    </button>
  );
};

type LabelWithTooltipProps = { label: string };

export const LabelWithTooltip = ({ label }: LabelWithTooltipProps) => {
  return (
    <div className="flex w-fit items-start gap-[10px]">
      <TooltipButton />
      <span className="body-md h-[40px] max-w-[100px]">{label}</span>
    </div>
  );
};

export const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Package Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <HighlightedInfo
                text="Your Items will be delivered here after we help you purchase your them
        and they will be shipped from here to our pickup office in Nigeria"
              />
              <DetailSection
                label="Country of Purchase"
                value="United States (Houston - warehouse)"
              />
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

type HighlightedInfoProps = { text: string };

export const HighlightedInfo = ({ text }: HighlightedInfoProps) => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[14px] py-[10px]">
      <p className="body-md md:label-lg text-gray-700">{text}</p>
    </div>
  );
};

export const requestStatuses = {
  Responded: <RespondedStatus />,
  "Not Responded": <NotRespondedStatus />,
};

export type RequestInformationProps = Partial<ProceedButtonProps> & {
  info: { date: string; status: (typeof REQUEST_STATUS)[number] };
};

export const RequestInformation = ({
  info,
  onClick,
}: RequestInformationProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Order Information" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Order Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
              <div className="md:col-span-2">
                <DetailSection label="Request Date" value={info.date} />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Request Status"
                  value={requestStatuses[info.status]}
                />
              </div>
              <div className="flex w-max items-center md:col-span-4">
                {info.status === "Responded" && (
                  <ProceedToCheckoutButton onClick={onClick} />
                )}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export const ProceedToCheckoutButton = ({
  onClick,
}: ProceedToCheckoutButtonProps) => {
  const { handleActiveAction, handleTabChange } = useTabContext();

  const handleClick = () => {
    handleTabChange("orders");
    handleActiveAction("proceed to checkout");
  };

  return (
    <button
      onClick={onClick ?? handleClick}
      aria-label="Take Action Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
    >
      <Security size={18} className="text-primary-900" />
      <span className="label-lg whitespace-nowrap text-primary-600">
        Proceed to Checkout
      </span>
    </button>
  );
};

type ProceedToCheckoutButtonProps = { onClick?: () => void };

export const ModalProceedToCheckoutButton = ({
  onClick,
}: ProceedToCheckoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Take Action Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[88px] border border-gray-500 bg-white px-[14px] py-[10px] text-sm font-medium tracking-[.00714em] text-white"
    >
      <Security size={18} variant="Bold" />
      <span className="label-lg whitespace-nowrap text-primary-600">
        Proceed to Checkout
      </span>
    </button>
  );
};

export default RequestDetails;
