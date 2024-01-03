/* eslint-disable @next/next/no-img-element */
import { ArrowRight3, ExportCircle, Ship } from "iconsax-react";
import { useEffect } from "react";
import { BackButton } from "~/components/Buttons/BackButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
} from "~/components/Shop/Requests/RequestOrder";
import SuccessImportantNotice from "~/components/SuccessImportantNotice";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  AndLastly,
  Cost,
  NextButton,
  PackageTable,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  type stepsContentType,
} from "../Requests/RequestCheckout";
import { LabelWithTooltip } from "../Requests/RequestDetails";
import { type ModalCloseType } from "../Requests/RequestsPanel";

const InitiateShipping = () => {
  const { handlePayNowAction } = useShopContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Address",
      content: <BillingAddressStep />,
    },
    { title: "Initiate Shipping", content: <InitiateShippingStep /> },
    { title: "Success", content: <Success /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const { step, currentStepIndex, next, isFirstStep, back, isLastStep } =
    useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleFinish = () => {
    handleTabChange("orders");
  };

  useEffect(() => {
    handlePayNowAction({ action: next });
  }, []);

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      {!isLastStep && (
        <CongratulationImage text="Your Package have arrived its Origin warehouse. Proceed to initiate shipping" />
      )}
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />

      {!isLastStep && (
        <div className="w-full md:w-max">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}
      {isLastStep && (
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}

      {isLastStep && (
        <CongratulationImage text="You have just successfully iInitiated shipment of your items" />
      )}
      {step}
      <div className="flex w-full flex-col items-center justify-center gap-[10px] md:w-max md:flex-row">
        {isFirstStep && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={handleBack} />
          </div>
        )}
        {!isFirstStep && currentStepIndex <= 1 && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={back} />
          </div>
        )}
        {currentStepIndex === 0 && <NextButton text="Proceed" next={next} />}
        {currentStepIndex === 1 && <NextButton text="Confirm" next={next} />}
      </div>
      {currentStepIndex === 2 && (
        <InitiateShippingAgreement back={back} next={next} />
      )}
      {currentStepIndex === 3 && (
        <div className="w-[200px]">
          <NextButton text="Done" next={handleFinish} />
        </div>
      )}
    </div>
  );
};

type InitiateShippingAgreement = { back: () => void; next: () => void };

export const InitiateShippingAgreement = ({
  back,
  next,
}: InitiateShippingAgreement) => {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div className="flex w-full items-center gap-[10px] rounded-[20px] border-[1px] border-gray-200 px-[15px] py-[10px]">
        <input
          type="checkbox"
          name="checked-demo"
          className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
          checked={undefined}
          onChange={() => {
            return;
          }}
        />
        <span className="body-md md:body-lg text-neutral-900">
          I agree to pay for the shipment cost upon arrival/clearing for my
          package
        </span>
      </div>

      <div className="flex flex-col gap-[10px] md:flex-row">
        <div className="w-full md:max-w-[141px]">
          <BackButton onClick={back} />
        </div>
        <div className="w-full md:max-w-[249px]">
          <InitiateShippingButton onClick={next} />
        </div>
      </div>

      <span className="body-md text-center md:text-start">
        Upon clicking &quot;initiate shipping&quot;, I confirm I have read and
        agreed to{" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600"
        >
          all terms and policies
        </a>
      </span>
    </div>
  );
};

type InitiateShippingButtonProps = Partial<ModalCloseType> & {
  onClick?: () => void;
};

export const InitiateShippingButton = ({
  dataClose,
  onClick,
}: InitiateShippingButtonProps) => {
  const { handleActiveAction, handleTabChange } = useTabContext();

  const handleClick = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <button
      onClick={onClick ?? handleClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Ship size="18" variant="Bold" />
      <span className="label-lg text-white">Initiate Shipping</span>
    </button>
  );
};

export const PackageConfirmation = () => {
  const { orderPackages } = useShopContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {orderPackages.map((item, i) => {
        return <OrderItem key={item.orderId} index={i} />;
      })}
    </div>
  );
};

export type OrderItemProps = {
  index: number;
};

const OrderItem = ({ index }: OrderItemProps) => {
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
        {open && <OrderItemDetails />}
      </div>
    </SectionContentLayout>
  );
};

export type DetailSectionProps = {
  label: string;
  value: string | JSX.Element;
  colSpanMobile?: "full" | number;
  colSpanDesktop?: "full" | number;
  image?: boolean;
  tooltip?: boolean;
};

export const DetailSection = ({
  label,
  value,
  colSpanMobile = "full",
  colSpanDesktop = "full",
  image,
  tooltip = false,
}: DetailSectionProps) => (
  <div
    className={`col-span-${colSpanMobile} flex flex-col justify-between gap-[5px] text-gray-700 md:col-span-${colSpanDesktop}`}
  >
    {tooltip ? (
      <LabelWithTooltip label={label} />
    ) : (
      <span className="body-md h-[40px] max-w-[100px]">{label}:</span>
    )}
    {image ? (
      <span className="title-lg text-neutral-900">
        <img
          src={image && (value as string)}
          alt=""
          className="w-[220px] rounded-[20px] bg-center object-cover"
        />
      </span>
    ) : (
      <span className="title-md md:title-lg break-words font-medium text-neutral-900">
        {value}
      </span>
    )}
  </div>
);

const OrderItemDetails = () => {
  return (
    <div className="grid w-fit grid-cols-4 gap-[15px]">
      <DetailSection label="Store" value="Amazon" />
      <DetailSection label="Urgent Purchase" value="No" />
      <DetailSection label="Item URL" value="htttp/jjnkkukja.jhgyjayjdjjhcjc" />
      <DetailSection
        label="Item Name"
        value="Designer Bags"
        colSpanMobile="full"
        colSpanDesktop={2}
      />
      <DetailSection
        label="Item Original Cost"
        value="$45.00"
        colSpanMobile="full"
        colSpanDesktop={1}
      />
      <DetailSection
        label="Quantity"
        value="4"
        colSpanMobile="full"
        colSpanDesktop={1}
      />
      <DetailSection
        label="Weight"
        value="67kg"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Height"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Length"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Width"
        value="5 inches"
        colSpanMobile={2}
        colSpanDesktop={1}
      />
      <DetailSection
        label="Product/Item Picture"
        value="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
        image
      />
      <DetailSection
        label="Product Description"
        value="Additonvnv ghss jgsjvsn"
      />
      <DetailSection label="Color" value="Blue" />
      <DetailSection label="Stripes" value="5 inches" />
    </div>
  );
};

const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Package Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg font-medium text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="flex flex-col gap-[5px]">
              <span className="body-md max-w-[100px] text-gray-700">
                Country of Purchase:
              </span>
              <span className="title-md md:title-lg font-medium text-neutral-900">
                United States (Houston - warehouse)
              </span>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

const BillingAddressStep = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your shipping address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <ShippingImportantNotice />
          <DestinationShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Confirm your Billing Information" />
        <DefaultBillingAddress />
      </div>
    </div>
  );
};

export const DefaultBillingAddress = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="flex w-full items-center gap-[30px]">
          <h4 className="title-md md:title-lg text-gray-700">
            Default Billing Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
            <DetailSection
              label="First Name"
              value="Malibu"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Last Name"
              value="SHedrack"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Contact Number"
              value="+234 803 456 7845"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Email"
              value="Malibushdrack@gmail.com"
              colSpanDesktop={4}
            />
            <div className="col-span-2"></div>
            <DetailSection
              label="Country"
              value="Turkey"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="State"
              value="Istanbul"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="City"
              value="Cyprusic"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Zip/postal Code"
              value="98765"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Address"
              value="No, 1osolo way, ikeja road, behind scaint merry"
            />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const DestinationShippingAddress = () => {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <SelectInput
        id={"destinationShippingAddress"}
        label={"Select destination"}
        options={
          <>
            <option value="" disabled hidden>
              Select Origin
            </option>
          </>
        }
      />
      <TooltipButton />
    </div>
  );
};

export const ShippingImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="label-lg text-primary-900">IMPORTANT NOTICE:</span>
      <div>
        <p className="title-sm ml-6 list-item text-gray-700">
          The{" "}
          <b>
            &quot;Destination/Shipping Address&quot; (which is our available
            pickup office in Nigeria)
          </b>{" "}
          you will select below is where your package will be delivered to,
          kindly select the one nearest to you.
        </p>
        <p className="title-sm ml-6 list-item text-gray-700">
          And if you want doorstep delivery, we will help you make provisions
          for that when it arrives the
          <b>
            &quot;Destination/Shipping Address&quot; (which is our office in
            Nigeria)
          </b>
          you selected, just inform us.
        </p>
      </div>
    </div>
  );
};

const InitiateShippingStep = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Shipping Method Used" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary />
    </div>
  );
};

export type ShipmentCostsSummaryProps = { payButton?: boolean };

export const ShipmentCostsSummary = ({
  payButton = false,
}: ShipmentCostsSummaryProps) => {
  const { payNowAction } = useShopContext();

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-error-600" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              The total you are paying now includes only the Shipping fees and
              is to be paid upon clearing/arrival of your package
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-primary-900" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              Prices and subtotals are displayed including taxes
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-primary-900" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              Discounts are calculated based on prices and subtotals taken
              without considering taxes
            </span>
          </div>
        </div>
        {payButton && (
          <div className="w-full self-center md:max-w-[500px]">
            <PayNowButton onClick={() => payNowAction?.action()} />
          </div>
        )}
      </div>
    </div>
  );
};

export const Summary = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-primary-900 px-[28px] py-[20px] text-white">
      <span className="title-lg">Shipping Costs Summary</span>
      <div className="flex flex-col gap-[10px]">
        <Cost title="Shipping Cost:" value="$126.66" />
        <Cost title="Clearing, Port Handling:" value="$126.66" />
        <Cost title="Other Charges:" value="$126.66" />
        <Cost title="Storage Charge:" value="$126.66" />
        <Cost title="Insurance:" value="$126.66" />
        <Cost title="VAT:" value="$126.66" />
        <Cost title="Payment Method Surcharge:" value="$126.66" />
        <Cost title="Discount:" value={`- ${"$126.66"}`} />
        <TotalCost />
      </div>
    </div>
  );
};

export type ShippingMethodProps = {
  expanded?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

export const ShippingMethod = ({
  expanded = false,
  checked,
  disabled,
  onChange = () => {
    return;
  },
}: ShippingMethodProps) => {
  const { open, toggle } = useAccordion(expanded);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px] py-[10px]">
        <div className="col-span-full flex items-center gap-[30px]">
          <form>
            <fieldset id="shippingMethods" className="flex items-center">
              <input
                disabled={disabled}
                className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
                name="radio"
                type="radio"
                value="male"
                aria-label="Custom Billing Address"
                checked={checked}
                onChange={onChange}
              />
            </fieldset>
          </form>
          <h4 className="title-md md:title-lg text-black">Basic</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-[10px] pl-[10px]">
            <div className="label-lg grid w-full grid-cols-2 gap-[20px] font-medium text-neutral-900 md:w-max">
              <span className="col-span-1">Shipping Cost:</span>
              <span className="col-span-1 place-self-end">$126.66</span>
              <span className="col-span-1">Clearing, Port Handling:</span>
              <span className="col-span-1 place-self-end">$126.66</span>
            </div>
            <div className="body-md flex flex-col gap-[5px] text-gray-700">
              <p>
                This shipping method takes your package 5 working days to arrive
                your destination from the 1st Wednesday after your payment, You
                can call us on +234 700 700 6000 or +1 888 567 8765 or{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 underline"
                >
                  send us a dm
                </a>{" "}
                to get alternative shipping methods with different benefits.
              </p>
              <p>
                The cost paid here covers clearing, documentation and delivery
                to the destination.
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SuccessImportantNotice />

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Track your package" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <span className="title-md md:title-lg font-medium text-neutral-700 md:pl-[14px] md:font-bold">
              Here are more information on how to track
            </span>
            <ul className="flex flex-col gap-[14px]">
              <li>
                <div className="flex items-center gap-[20px]">
                  <span
                    className={`title-lg rounded-[20px] bg-primary-600 p-[10px] text-white`}
                  >
                    1
                  </span>
                  <span className="body-lg md:title-lg text-neutral-900">
                    You can start tracking your package in the next 24 hrs using
                    the <b>Tracking ID</b> above or{" "}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                        this link
                        <ExportCircle color="#292D32" size={18} />
                      </span>
                    </a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </SectionContentLayout>
      </div>

      <AndLastly />
    </div>
  );
};

export default InitiateShipping;
