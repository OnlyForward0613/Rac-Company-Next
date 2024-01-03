import { ArrowRight3, ExportCircle } from "iconsax-react";
import { useEffect } from "react";
import { BackButton } from "~/components/Buttons/BackButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import OrderTrackingId from "~/components/OrderTrackingId";
import { DefaultBillingAddress } from "~/components/Shop/Orders/InitiateShipping";
import {
  AndLastly,
  Cost,
  ImportantNotice,
  NextButton,
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import {
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { DestinationAddressDetails } from "../Requests/RequestOrder";
import { OrderItem, PackageTable } from "./InitiateShipping";

const ClearPackage = () => {
  const { handlePayNowAction } = useAutoImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <Step1 /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <Step2 />,
    },
    { title: "Clear Cars", content: <Step3 /> },
    { title: "Success", content: <Step4 /> },
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
        <CongratulationImage text="You car(s) have arrived the port, proceed to clear it." />
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

      {isLastStep && <CongratulationImage text="Expect your car(s) soon" />}

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

const Step1 = () => {
  const { orderPackages } = useAutoImportContext();

  if (!orderPackages) return;

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Confirm that the Car(s) below are the car(s) you wish to clear" />
      {orderPackages.map((item, i) => {
        return <OrderItem key={item.orderId} index={i} />;
      })}
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DestinationAddressDetails />
      <DefaultBillingAddress />
    </div>
  );
};

const Step3 = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />

      <SectionHeader title="Payment Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select the Payment Method You Wish to Use" />
      </div>
      <PaymentMethods />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-12">
        <div className="flex flex-col gap-[15px] md:col-span-4 md:max-w-[300px]">
          <SectionHeader title="Take Note" />
          <ImportantNotice />
        </div>
        <div className="flex flex-col gap-[15px] md:col-span-8">
          <SectionHeader title="Order costs" />
          <CostsSummary />
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-primary-900 px-[28px] py-[20px] text-white">
      <span className="title-lg">Order Costs Summary</span>
      <div className="flex flex-col gap-[10px]">
        <Cost title="Customs Clearing:" value="$126.66" />
        <Cost title="VAT:" value="$126.66" />
        <Cost title="Payment Method Surcharge:" value="$126.66" />
        <Cost title="Discount:" value={`- ${"$126.66"}`} />
        <TotalCost />
      </div>
    </div>
  );
};

const CostsSummary = () => {
  const { payNowAction } = useAutoImportContext();

  if (!payNowAction) return;

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col items-center justify-center gap-[20px] p-[20px]">
        <div className="flex flex-col gap-[5px]">
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
        <div className="w-[168px]">
          <PayNowButton onClick={payNowAction.action} />
        </div>
      </div>
    </div>
  );
};

const Step4 = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Track your package" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <h3 className="title-lg font-bold text-neutral-900">
              Here are more information on how to track
            </h3>
            <ul className="flex flex-col gap-[14px]">
              <li className="flex items-center gap-[26px]">
                <span className="rounded-[20px] bg-primary-600 p-[10px] text-white">
                  1
                </span>
                <span className="title-lg text-neutral-900">
                  You can start tracking your package in the next 24 hrs using
                  the <b>Tracking ID</b> above or{" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                      this link
                      <ExportCircle color="#292D32" size={18} />
                    </span>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </SectionContentLayout>
      </div>
      <AndLastly />
    </div>
  );
};

export default ClearPackage;
