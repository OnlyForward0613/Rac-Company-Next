import { useState, type ChangeEvent } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { DeleteItemButton } from "~/components/Buttons/DeleteItemButton";
import { DeleteButtonIcon } from "~/components/Buttons/DeleteButtonIcon";
import { DoneButton } from "~/components/Buttons/DoneButton";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import { BackButton } from "~/components/Buttons/BackButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import CurrencyInput from "~/components/Forms/Inputs/CurrencyInput";
import FileInput from "~/components/Forms/Inputs/FileInput";
import QuantityInput from "~/components/Forms/Inputs/QuantityInput";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import TextAreaInput from "~/components/Forms/Inputs/TextAreaInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import LabelId from "~/components/LabelId";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  AddButton,
  AddPropertiesSection,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
  TooltipButton,
  type ItemDetailsSectionProps,
} from "~/components/Shop/Requests/RequestOrder";
import {
  useImportContext,
  type ImportRequestPackageType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";

export const emptyValue: ImportRequestPackageType = {
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

export type ImportInputs = {
  requestPackages: ImportRequestPackageType;
};

const RequestOrder = () => {
  const [oops] = useState(false);
  const { step, next, isFirstStep, isLastStep, isSecondToLastStep } =
    useMultiStepForm([<Step1 />, <Step2 />, <Step3 oops={oops} />]);

  const { handleRequests } = useImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const formMethods = useForm<ImportInputs>({
    defaultValues: {
      requestPackages: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<ImportInputs> = async (data) => {
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
        <RequestFormHeader title="Requesting For New Import Order" />
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

export const Step1 = () => {
  return (
    <>
      <SectionHeader
        title="Tell us where your package will be shipped from"
        hr
      />
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 md:pl-[34px]">
        <SelectOrigin />
        <SelectPackageDeliveryStatus />
      </div>
    </>
  );
};

export const Step2 = () => {
  const { control } = useFormContext<ImportInputs>();
  const { fields, append, remove } = useFieldArray<ImportInputs>({
    control,
    name: "requestPackages.items",
  });

  const handleAddMore = () => {
    append(emptyValue.items);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Step1 />

      <SectionHeader title="describe your package" />
      <div className="flex flex-col gap-[20px]">
        {fields.map((field, i) => {
          return (
            <ItemDetailsSection
              key={field.id}
              index={i}
              handleRemoveItem={() => handleRemove(i)}
              expanded
            />
          );
        })}
      </div>
      <div className="w-max">
        <AddButton title="Add Item" onClick={handleAddMore} />
      </div>
    </>
  );
};

const ItemDetailsSection = ({
  index,
  expanded = false,
  handleRemoveItem,
}: ItemDetailsSectionProps) => {
  const { register, getValues, setValue } = useFormContext<ImportInputs>();
  const { open, toggle } = useAccordion(expanded);
  const [filename, setFilename] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!files[0]) return;
    setFilename(files[0].name);
  };

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Item - <span className="text-primary-600">#{index + 1}</span>
              </h4>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full">
                  <TextInput id={`itemName-${index}`} label={"Item Name"} />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-6">
                  <SelectInput
                    id={`idType-${index}`}
                    label={"ID Type"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select a Store
                        </option>
                      </>
                    }
                  />
                  <TooltipButton />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-6 ">
                  <TextInput id={`idNumber-${index}`} label={"ID Number"} />
                  <TooltipButton />
                </div>

                <div className="col-span-full flex items-center gap-[10px]">
                  <SelectInput
                    id={`itemDeliveryStatus-${index}`}
                    label={"Item Delivery Status"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          No
                        </option>
                      </>
                    }
                  />
                  <TooltipButton />
                </div>

                <div className="col-span-full flex items-center gap-[10px]">
                  <SelectInput
                    id={`deliveredBy-${index}`}
                    label={"Delivered By"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          No
                        </option>
                      </>
                    }
                  />
                  <TooltipButton />
                </div>

                <div className="col-span-full md:col-span-8">
                  <CurrencyInput
                    id={`itemOriginalCost-${index}`}
                    label={"Item Original Cost"}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <QuantityInput
                    id={`quantity-${index}`}
                    label={"Quantity"}
                    {...register(`requestPackages.items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    handleAdd={() => {
                      const prev =
                        getValues(`requestPackages.items.${index}.quantity`) ??
                        0;
                      const value = prev + 1;
                      setValue(
                        `requestPackages.items.${index}.quantity`,
                        value,
                      );
                    }}
                    handleSubtract={() => {
                      const prev =
                        getValues(`requestPackages.items.${index}.quantity`) ??
                        0;
                      if (prev <= 1) return;
                      const value = prev - 1;
                      setValue(
                        `requestPackages.items.${index}.quantity`,
                        value,
                      );
                    }}
                  />
                </div>

                <div className="col-span-full">
                  <FileInput
                    id={`itemPicture-${index}`}
                    label={"Upload Item Picture"}
                    value={filename}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={`additionalItemDescription-${index}`}
                    label={"Additional Item Description"}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader
                    title="Describe the item you wish to purchase with further custom properties"
                    hr
                  />
                  <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
                    <AddPropertiesSection index={index} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 p-[10px] md:hidden">
              <DeleteItemButton onClick={handleRemoveItem} />
            </div>
          </div>
        </SectionContentLayout>
        <div className="hidden md:block">
          <DeleteButtonIcon onClick={handleRemoveItem} />
        </div>
      </div>
    </>
  );
};

export type Step3Props = { oops: boolean };

export const Step3 = ({ oops }: Step3Props) => {
  return (
    <div className="flex flex-col gap-[30px]">
      {oops ? (
        <CongratulationImage text="Send your package to our Warehouse in United States (your selected “Origin”)" />
      ) : (
        <CongratulationImage text="You have just successfully requested for Import service." />
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

export type InstructionsItem = { content: string | JSX.Element };

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
        "Additionally, you will just agree with the shipping cost to allow us process your Order, You will be paying for the shipment Cost when upon arrival/clearing of your package.",
    },
    {
      content:
        "And finally, you will be paying for the shipping cost when the package gets to our office in Nigeria (you would inform us about the one closest to you in the coming shipping stages",
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

export const Guidelines = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium text-neutral-700 md:pl-[14px] md:font-bold">
        Here are some guidelines for you
      </span>
      <ul className="flex flex-col gap-[14px]">
        <StepDescription
          stepNumber={1}
          description="Once you are sure that this package has gotten to the warehouse address above, attempt requesting for a new import order and provide us information we need to Identify the package as yours."
          backgroundColor="bg-primary-600"
        />

        <StepDescription
          stepNumber={2}
          description={
            <span className="body-lg md:title-lg text-gray-900">
              Here are some tip to help us quickly identify your package
              <ul className="list-item pl-[30px] [&>*]:list-disc">
                <li>Attach your USER ID on the Package if you can.</li>
                <li>
                  If you are purchasing the package directly from the seller,
                  provide us the TRACKING ID or any other related ID on the
                  package that is Unique to your order from the seller.
                </li>
                <li>
                  If you have the actual picture of the package, provide it
                  while requesting for the Import order on our website
                </li>
              </ul>
            </span>
          }
          backgroundColor="bg-primary-600"
        />
      </ul>
    </div>
  );
};

const SelectOrigin = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"origin"}
        label={"Origin"}
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

const SelectPackageDeliveryStatus = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <SelectInput
        id={"packageDeliveryStatus"}
        label={"Package Delivery Status"}
        options={
          <>
            <option value="" disabled hidden>
              Select a Delivery Status
            </option>
          </>
        }
      />
      <TooltipButton />
    </div>
  );
};

export default RequestOrder;
