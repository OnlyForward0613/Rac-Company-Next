import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import { BackButton } from "~/components/Buttons/BackButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import CongratulationImage from "~/components/CongratulationImage";
import {
  Guidelines,
  Step1,
  Step2,
  type InstructionsItem,
  type Step3Props,
} from "~/components/Import/Requests/RequestOrder";
import LabelId from "~/components/LabelId";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import {
  useExportContext,
  type ExportRequestPackageType,
} from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";

export const emptyValue: ExportRequestPackageType = {
  requestId: "",
  requestStatus: "Not Responded",
  requestLocalDate: new Date().toLocaleString(),
  items: [
    {
      image: "",
      name: "",
      idType: "Tracking ID",
      idNumber: "",
      deliveryStatus: "",
      deliveredBy: "",
      originalCost: 1,
      quantity: 1,
      description: "",
    },
  ],
};

export type ExportInputs = {
  requestPackages: ExportRequestPackageType;
};

const RequestOrder = () => {
  const [oops] = useState(false);
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<Step1 />, <Step2 />, <Step3 oops={oops} />]);

  const { handleRequests } = useExportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const formMethods = useForm<ExportInputs>({
    defaultValues: {
      requestPackages: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<ExportInputs> = async (data) => {
    console.log(data.requestPackages);
    next();
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
    formMethods.handleSubmit(onSubmit);
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Export Order" />
        {!isLastStep && (
          <HighlightedInfo text="Provide as much Information as possible needed for our staffs to identify your package if it has been delivered. The more Information you provide, the easier we identify your package." />
        )}
        {isLastStep && (
          <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
            <LabelId label="Request:" id="R78667" />
          </div>
        )}

        {step}

        {isFirstStep && (
          <>
            <div className="flex w-full flex-col gap-[10px] md:flex-row md:[&>*]:w-max">
              <BackButton onClick={handleBack} />
              <ProceedButton onClick={next} />
            </div>
          </>
        )}
        {!isFirstStep && !isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              <BackButton onClick={handleBack} />
              <SaveAsDraftButton />
              <ProceedButton
                onClick={
                  isSecondToLastStep ? formMethods.handleSubmit(onSubmit) : next
                }
              />
            </div>
            {/* for mobile screen */}
            <div className="grid w-full grid-cols-2 gap-[10px] md:hidden">
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <BackButton onClick={handleBack} />
              </div>
              <div className="col-span-full [@media(min-width:320px)]:col-span-1">
                <ProceedButton
                  onClick={
                    isSecondToLastStep
                      ? formMethods.handleSubmit(onSubmit)
                      : next
                  }
                />
              </div>
              <div className="col-span-full">
                <SaveAsDraftButton />
              </div>
            </div>
          </>
        )}
        {isLastStep && (
          <div className="w-full md:w-[200px]">
            <DoneButton handleFinish={handleFinish} />
          </div>
        )}
        <NeedHelpFAB />
      </div>
    </FormProvider>
  );
};

export const Step3 = ({ oops }: Step3Props) => {
  return (
    <div className="flex flex-col gap-[30px]">
      {oops ? (
        <CongratulationImage text="Send your package to our Warehouse in United States (your selected “Origin”)" />
      ) : (
        <CongratulationImage text="You have just successfully requested for Export service." />
      )}
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="What Next?" />
        <SectionContentLayout>
          {oops ? <Guidelines /> : <Instructions />}
        </SectionContentLayout>
      </div>
    </div>
  );
};

const Instructions = () => {
  const instructions: InstructionsItem[] = [
    {
      content: (
        <>
          Kindly note that we use the package descriptions you provided to
          identify the package you claim to have been delivered to our Warehouse
          (<span className="text-primary-600">Origin warehouse</span> you
          selected) for shipping.
        </>
      ),
    },
    {
      content:
        "After we have been able to Identify your package, you will be notified so you can proceed to Initiate shipping processes for your package.",
    },
    {
      content:
        "After we have confirmed your payment, we will begin your shipment processes and you can track package till it gets delivered.",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium text-neutral-700 md:pl-[14px] md:font-bold">
        Here is how to pick your package up from our office
      </span>
      <ul className="flex flex-col gap-[14px]">
        {instructions.map((item, i) => (
          <StepDescription
            key={i}
            stepNumber={i + 1}
            description={item.content}
            backgroundColor="bg-primary-600"
          />
        ))}
      </ul>
    </div>
  );
};

export default RequestOrder;
