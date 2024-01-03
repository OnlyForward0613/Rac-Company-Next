/* eslint-disable @next/next/no-img-element */
import { Location, Routing2, TransmitSquare } from "iconsax-react";
import { type ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { capitalizeWords } from "~/Utils";
import { SHIPPING_STATUS } from "~/constants";
import { useTrackingContext } from "~/contexts/TrackingContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { CustomerSupportButton } from "../AutoImport/Requests/RequestOrder";
import { BackButton } from "../Buttons/BackButton";
import AccordionButton from "../Forms/AccordionButton";
import SearchInput from "../Forms/Inputs/SearchInput";
import LabelId from "../LabelId";
import { SubSectionTitle } from "../Shop/Requests/RequestCheckout";
import {
  SectionContentLayout,
  SectionHeader,
} from "../Shop/Requests/RequestOrder";

type SearchInputType = {
  trackingId: string;
};

const Search = () => {
  const { step, next, isFirstStep, back } = useMultiStepForm([
    <Step1 />,
    <Step2 />,
  ]);

  const formMethods = useForm<SearchInputType>();

  const onSubmit: SubmitHandler<SearchInputType> = async (data) => {
    const id = data.trackingId;
    console.log(id);
    handleOrder(id);
    next();
  };

  const { handleOrder } = useTrackingContext();

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1094px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        {step}

        {!isFirstStep && (
          <div className="md:max-w-[200px]">
            <BackButton onClick={back} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

const Step1 = () => {
  const { register } = useFormContext<SearchInputType>();

  return (
    <>
      <p className="title-md md:title-lg text-gray-700">
        All shipments from RAC Logistics have a unique <b>tracking ID</b>, you
        can track packages with this <b>tracking ID</b> to be updated about
        their journey.
      </p>
      <div className="flex flex-col items-center gap-[20px] md:flex-row">
        <SearchInput
          id="trackingId"
          label="Enter Tracking ID"
          bg="!bg-white"
          {...register("trackingId")}
        />
        <button
          type="submit"
          className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:w-max md:px-6"
        >
          <Routing2 size={18} variant="Bold" />
          <span className="label-lg text-white">Track</span>
        </button>
      </div>
    </>
  );
};

const Step2 = () => {
  const { getValues } = useFormContext<SearchInputType>();
  const { orderPackage } = useTrackingContext();

  if (!orderPackage)
    return (
      <LabelId label="Tracking ID Not Found" id={getValues("trackingId")} />
    );

  return (
    <>
      <LabelId label="Tracking ID" id={orderPackage.trackingId} />
      <RecentUpdate />
      <EstimatedDeliveryDate
        title="April,10 2023 - By End of Day"
        description="12 days remaining to arrive destination"
      />
      <AllShipmentUpdates />
      <HaveAConcern />
    </>
  );
};

const HaveAConcern = () => {
  return (
    <div className="col-span-4 flex flex-col gap-[5px]">
      <SectionHeader title="Have A Concern?" />
      <div className="ml-[34px] flex flex-col gap-[5px] text-gray-900">
        <span className="body-md">
          If you would prefer to speak to someone personally about the location
          of your shipment, please use the button below
        </span>
        <div className="md:w-max">
          <CustomerSupportButton />
        </div>
      </div>
    </div>
  );
};

const AllShipmentUpdates = () => {
  const { orderPackage } = useTrackingContext();

  if (!orderPackage) return;

  return (
    <div className="flex flex-col gap-[15px]">
      <SectionHeader title="All Shipment Updates" />
      <ArrivedDestination />
      <InTransit />
      <Starting />
    </div>
  );
};

const ArrivedDestination = () => {
  const { orderPackage } = useTrackingContext();

  if (!orderPackage) return;

  const { open, toggle } = useAccordion(
    SHIPPING_STATUS.slice(5).includes(orderPackage.shippingStatus),
  );

  return (
    <>
      {SHIPPING_STATUS.slice(5).includes(orderPackage.shippingStatus) && (
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex items-center gap-[20px]">
              <SubSectionTitle
                title={
                  <>
                    While shipment <b>Arrived destination</b>
                  </>
                }
              />
              {open && (
                <img
                  src="/images/shipment_updates_arrow.svg"
                  alt="arrow right"
                  className="hidden md:block"
                />
              )}
              {open && (
                <div className="hidden w-max items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:flex">
                  <input
                    className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                    type="radio"
                    checked={true}
                    readOnly
                  />
                  <span className="title-sm font-medium text-gray-700">
                    {capitalizeWords(orderPackage.shippingStatus)}
                  </span>
                </div>
              )}
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>
            {/* for mobile */}
            {open && (
              <div className="flex w-full items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:hidden md:w-max">
                <input
                  className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                  type="radio"
                  checked={true}
                  readOnly
                />
                <span className="title-sm font-medium text-gray-700">
                  {capitalizeWords(orderPackage.shippingStatus)}
                </span>
              </div>
            )}
            {open && (
              <div className="flex flex-col p-0 md:p-[30px]">
                <DateSection dayOfWeek="Wednesday" localDate="April,05 2023">
                  <TimeSection
                    icon={<Location variant="Bold" />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                </DateSection>

                <DateSection dayOfWeek="Wednesday" localDate="April,05 2023">
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                </DateSection>
              </div>
            )}
          </div>
        </SectionContentLayout>
      )}
    </>
  );
};

type DateSectionProps = {
  dayOfWeek: string;
  localDate: string;
  children: ReactNode;
};

const DateSection = ({ dayOfWeek, localDate, children }: DateSectionProps) => {
  return (
    <>
      <div className="flex flex-col border-gray-500 text-gray-900 md:flex-row md:border-l">
        <div className="flex w-[139px] flex-col gap-[5px] p-[10px]">
          <span className="body-md">{dayOfWeek}</span>
          <span className="title-md font-bold">{localDate}</span>
        </div>

        <div className="dashed-vertical relative flex flex-col items-center gap-[15px] py-[10px]">
          {children}
        </div>
      </div>
      <div className="dashed-horizontal relative h-[1px] w-full last:hidden" />
    </>
  );
};

type TimeSectionProps = {
  icon: JSX.Element;
  localTime: string;
  processedAt: string;
  location: string;
};

const TimeSection = ({
  icon,
  localTime: time,
  processedAt,
  location,
}: TimeSectionProps) => {
  return (
    <div className="flex items-center gap-[10px] pl-[10px] md:gap-[20px]">
      <div className="text-gray-500">{icon}</div>
      <div className="flex flex-col gap-[5px] md:pl-[34px]">
        <span className="body-md">{time}</span>
        <span className="label-lg">Processed at {processedAt}</span>
        <span className="body-md">{location}</span>
      </div>
    </div>
  );
};

const InTransit = () => {
  const { orderPackage } = useTrackingContext();

  if (!orderPackage) return;

  const { open, toggle } = useAccordion(
    !SHIPPING_STATUS.slice(5).includes(orderPackage.shippingStatus),
  );

  return (
    <>
      {SHIPPING_STATUS.slice(4).includes(orderPackage.shippingStatus) && (
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex items-center gap-[20px]">
              <SubSectionTitle
                title={
                  <>
                    While shipment was <b>In Transit</b>
                  </>
                }
              />
              {open && (
                <img
                  src="/images/shipment_updates_arrow.svg"
                  alt="arrow right"
                  className="hidden md:block"
                />
              )}
              {open && (
                <div className="hidden items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:flex">
                  <input
                    className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                    type="radio"
                    checked={true}
                    readOnly
                  />
                  <span className="title-sm font-medium text-gray-700">
                    {capitalizeWords(orderPackage.shippingStatus)}
                  </span>
                </div>
              )}
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {/* for mobile */}
            {open && (
              <div className="flex w-full items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:hidden md:w-max">
                <input
                  className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                  type="radio"
                  checked={true}
                  readOnly
                />
                <span className="title-sm font-medium text-gray-700">
                  {capitalizeWords(orderPackage.shippingStatus)}
                </span>
              </div>
            )}
            {open && (
              <div className="flex flex-col p-0 md:p-[30px]">
                <DateSection dayOfWeek="Wednesday" localDate="April,05 2023">
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                </DateSection>
              </div>
            )}
          </div>
        </SectionContentLayout>
      )}
    </>
  );
};

const Starting = () => {
  const { orderPackage } = useTrackingContext();

  if (!orderPackage) return;

  const { open, toggle } = useAccordion(
    !SHIPPING_STATUS.slice(4).includes(orderPackage.shippingStatus),
  );

  return (
    <>
      {SHIPPING_STATUS.includes(orderPackage.shippingStatus) && (
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex items-center gap-[20px]">
              <SubSectionTitle
                title={
                  <>
                    While shipment was <b>Starting</b>
                  </>
                }
              />
              {open && (
                <img
                  src="/images/shipment_updates_arrow.svg"
                  alt="arrow right"
                  className="hidden md:block"
                />
              )}
              {open && (
                <div className="hidden items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:flex">
                  <input
                    className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                    type="radio"
                    checked={true}
                    readOnly
                  />
                  <span className="title-sm font-medium text-gray-700">
                    {capitalizeWords(orderPackage.shippingStatus)}
                  </span>
                </div>
              )}
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {/* for mobile */}
            {open && (
              <div className="flex w-full items-center gap-[20px] rounded-[20px] border border-gray-200 p-[15px] md:hidden md:w-max">
                <input
                  className="relative h-[18px] w-[18px] accent-primary-600 before:absolute before:h-10 before:w-10 before:-translate-x-[.7rem] before:-translate-y-[.7rem] before:rounded-full before:bg-primary-500 before:opacity-[12%]"
                  type="radio"
                  checked={true}
                  readOnly
                />
                <span className="title-sm font-medium text-gray-700">
                  {capitalizeWords(orderPackage.shippingStatus)}
                </span>
              </div>
            )}
            {open && (
              <div className="flex flex-col p-0 md:p-[30px]">
                <DateSection dayOfWeek="Wednesday" localDate="April,05 2023">
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                  <TimeSection
                    icon={<TransmitSquare />}
                    localTime="09:53 Local time"
                    processedAt="Processed at LONDON - HEARTHROW - UK"
                    location="LONDON - HEATHROW - UK"
                  />
                </DateSection>
              </div>
            )}
          </div>
        </SectionContentLayout>
      )}
    </>
  );
};

type EstimatedDeliveryDateProps = { title: string; description: string };

const EstimatedDeliveryDate = ({
  title,
  description,
}: EstimatedDeliveryDateProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-[5px]">
      <SectionHeader title="Estimated Delivery Date" />
      <div className="ml-[34px] flex flex-col gap-[5px] text-gray-900">
        <span className="title-md md:title-lg font-bold">{title}</span>
        <span className="body-md">{description}</span>
      </div>
    </div>
  );
};

const RecentUpdate = () => {
  const { orderPackage } = useTrackingContext();

  if (!orderPackage) return;

  const statusToImageMap = {
    "ready for shipping": "/images/shipping status modal/roadmap1_image.svg",
    "not started": "/images/shipping status modal/roadmap1_image.svg",
    processing: "/images/shipping status modal/roadmap1_image.svg",
    cancelled: "/images/shipping status modal/roadmap1_image.svg",
    "in transit": "/images/shipping status modal/roadmap2_image.svg",
    "arrived destination": "/images/shipping status modal/roadmap3_image.svg",
    cleared: "/images/shipping status modal/roadmap3_image.svg",
    delivered: "/images/shipping status modal/roadmap3_image.svg",
  };

  const imagePath = statusToImageMap[orderPackage.shippingStatus];

  return (
    <div className="grid grid-cols-1 items-center gap-[10px] md:grid-cols-10">
      <div className="col-span-4 flex rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
        <hr className="h-[65px] border-r border-solid border-white" />
        <div className="flex flex-col">
          <div className="flex flex-col gap-[1px] pl-[10px]">
            <span className="title-md font-bold">Origin:</span>
            <span className="label-lg">Nigeria</span>
          </div>
          <img
            src={imagePath}
            alt={`roadmap ${orderPackage.shippingStatus} image`}
            className="my-2"
          />
          <div className="flex flex-col gap-[1px] self-end pr-[10px]">
            <span className="title-md font-bold">Origin:</span>
            <span className="label-lg">USA</span>
          </div>
        </div>
        <hr className="h-[65px] self-end border-r border-solid border-secondary-600" />
      </div>

      <div className="col-span-4 flex flex-col gap-[5px]">
        <SectionHeader title="Most Recent Update" />
        <div className="ml-[34px] flex flex-col gap-[5px] text-gray-900">
          <span className="title-md md:title-lg font-bold">
            Processed at London-Heathrow-UK
          </span>
          <div className="body-md flex flex-wrap gap-[5px]">
            <span>April, 05 2023</span>
            <span>09:53 AM local time,</span>
            <span>London-Heathrow-UK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
