import { ArrowRight3 } from "iconsax-react";
import { useEffect } from "react";
import { BackButton } from "~/components/Buttons/BackButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  BillingDetailsConfirmation,
  Success,
} from "~/components/Shop/Orders/ClearPackage";
import {
  DetailSection,
  ShippingMethod,
  Summary,
  type OrderItemProps,
  type ShipmentCostsSummaryProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  NextButton,
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import { PackageOrigin } from "~/components/Shop/Requests/RequestDetails";
import {
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { PackageTable } from "./InitiateShipping";

const ClearPackage = () => {
  const { handlePayNowAction } = useImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <BillingDetailsConfirmation />,
    },
    { title: "Clear Package", content: <ClearPackageStep /> },
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
        <CongratulationImage text="Your package have arrived its destination. Proceed to clear it." />
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
        <CongratulationImage text='You can now pick up your package from our office in Nigeria (your selected "Destination")' />
      )}

      {step}

      {currentStepIndex <= 1 && (
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
          <NextButton text="Proceed" next={next} />
        </div>
      )}
      {currentStepIndex === 3 && (
        <div className="w-[200px]">
          <NextButton text="Done" next={handleFinish} />
        </div>
      )}
    </div>
  );
};

const PackageConfirmation = () => {
  const { orderPackages } = useImportContext();

  if (!orderPackages) return;

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

export const OrderItem = ({ index }: OrderItemProps) => {
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

const OrderItemDetails = () => {
  return (
    <div className="grid w-fit grid-cols-4 gap-[15px]">
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

const ClearPackageStep = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Shipping Method Used" />
      </div>
      <ShippingMethod checked disabled expanded />

      <SectionHeader title="Payment Methods" />
      <PaymentMethods />

      <SectionHeader title="Shipment costs" />
      <ShipmentCostsSummary payButton />
    </div>
  );
};

const ShipmentCostsSummary = ({
  payButton = false,
}: ShipmentCostsSummaryProps) => {
  const { payNowAction } = useImportContext();

  if (!payNowAction) return;

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[10px]">
            <ArrowRight3 className="text-error-600" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              The total you are paying now includes only the Shipping fees
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
            <PayNowButton onClick={payNowAction.action} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearPackage;
