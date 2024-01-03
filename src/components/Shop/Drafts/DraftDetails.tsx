import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import { BackButton } from "~/components/Buttons/BackButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  RequestFormHeader,
  RequestOrderStep1,
  RequestOrderStep2,
  emptyValue,
  type ShopInputs,
} from "../Requests/RequestOrder";

const DraftDetails = () => {
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<RequestOrderStep1 />, <RequestOrderStep2 />]);

  const { clearDrafts } = useShopContext();
  const { handleTabChange, handleActiveAction } = useTabContext();

  const formMethods = useForm<ShopInputs>({
    defaultValues: {
      requestPackages: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<ShopInputs> = async (data) => {
    console.log(data.requestPackages);
    next();
  };

  const handleFinish = () => {
    handleTabChange("requests");
    formMethods.handleSubmit(onSubmit);
    clearDrafts();
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <FormProvider {...formMethods}>
      <div
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        <RequestFormHeader
          title="Requesting For New Shop For Me Service"
          draft
        />

        {step}

        {isFirstStep && (
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

export default DraftDetails;
