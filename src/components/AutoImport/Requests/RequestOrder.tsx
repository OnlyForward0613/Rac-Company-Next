import { Calculator, Whatsapp } from "iconsax-react";
import { useState, type ChangeEvent } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { BackButton } from "~/components/Buttons/BackButton";
import { DeleteButtonIcon } from "~/components/Buttons/DeleteButtonIcon";
import { DeleteItemButton } from "~/components/Buttons/DeleteItemButton";
import { DoneButton } from "~/components/Buttons/DoneButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { SaveAsDraftButton } from "~/components/Buttons/SaveAsDraftButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import CurrencyInput from "~/components/Forms/Inputs/CurrencyInput";
import FileInput from "~/components/Forms/Inputs/FileInput";
import SelectCityInput from "~/components/Forms/Inputs/SelectCityInput";
import SelectCountryInput from "~/components/Forms/Inputs/SelectCountryInput";
import SelectCountryPhoneCodeInput from "~/components/Forms/Inputs/SelectCountryPhoneCodeInput";
import SelectInput from "~/components/Forms/Inputs/SelectInput";
import SelectStateInput from "~/components/Forms/Inputs/SelectStateInput";
import TextAreaInput from "~/components/Forms/Inputs/TextAreaInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import LabelId from "~/components/LabelId";
import { AddressDetail } from "~/components/Shop/Orders/ClearPackage";
import {
  DefaultBillingAddress,
  DetailSection,
  type OrderItemProps,
} from "~/components/Shop/Orders/InitiateShipping";
import { StepDescription } from "~/components/Shop/Orders/OrdersPanel";
import {
  DefaultBillingAddressRadio,
  StepIndex,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
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
import { AUTO_IMPORT_ORIGINS, CAR_CONDITIONS } from "~/constants";
import {
  useAutoImportContext,
  type AutoImportRequestPackageType,
} from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import useStatesCities from "~/hooks/useStatesCities";

export const emptyValue: AutoImportRequestPackageType = {
  requestId: "",
  requestStatus: "Not Responded",
  requestLocalDate: new Date().toLocaleString(),
  items: [
    {
      brand: "",
      model: "",
      productionYear: "",
      value: 0,
      condition: "Drivable",
      color: "",
      mileage: 0,
      vin: "",
      url: "",
      image: "",
      carTitleCopy: "",
      description: "",
    },
  ],
  shipmentDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipPostalCode: "",
  },
  billingDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipPostalCode: "",
  },
};

export type AutoImportInputs = {
  requestPackages: AutoImportRequestPackageType;
};

const RequestOrder = () => {
  const { handleRequests } = useAutoImportContext();
  const { handleTabChange, handleActiveAction } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Details", content: <Step1 /> },
    {
      title: "Shipping & Billing Address",
      content: <Step2 />,
    },
    { title: "Order Summary", content: <Step3 /> },
    { title: "Success", content: <Step4 /> },
  ];
  const stepsContent = steps.map((step) => step.content);
  const {
    step,
    currentStepIndex,
    next,
    isFirstStep,
    isSecondToLastStep,
    isLastStep,
    back,
  } = useMultiStepForm(stepsContent);
  const currentTitle = steps[currentStepIndex]?.title ?? "";

  const formMethods = useForm<AutoImportInputs>({
    defaultValues: {
      requestPackages: emptyValue,
    },
  });

  const onSubmit: SubmitHandler<AutoImportInputs> = async (data) => {
    console.log(data.requestPackages);
    next();
  };

  const handleFinish = () => {
    handleRequests();
    handleTabChange("requests");
  };

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <RequestFormHeader title="Requesting For New Auto Import Order" />
        <StepIndex
          currentIndex={currentStepIndex}
          length={steps.length}
          title={currentTitle}
        />

        {step}

        {!isLastStep && (
          <>
            <div className="hidden gap-[10px] md:flex [&>*]:w-max">
              {isFirstStep && <BackButton onClick={handleBack} />}
              {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
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
                {isFirstStep && <BackButton onClick={handleBack} />}
                {!isFirstStep && !isLastStep && <BackButton onClick={back} />}
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
  const { control } = useFormContext<AutoImportInputs>();
  const { fields, append, remove } = useFieldArray<AutoImportInputs>({
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
      <SelectWarehouseOriginSection />
      <SectionHeader title="Fill in the Car(s) details" />
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

const SelectWarehouseOriginSection = () => {
  return (
    <>
      <SectionHeader
        title="Tell us where your Car(s) will be shipped from"
        hr
      />
      <div className="flex items-center gap-[10px] md:pl-[34px]">
        <SelectInput
          id={"originWarehouse"}
          label={"Origin Warehouse"}
          options={
            <>
              <option value="" disabled hidden>
                Select Origin
              </option>

              {AUTO_IMPORT_ORIGINS.map((origin) => {
                return (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                );
              })}
            </>
          }
        />
        <TooltipButton />
      </div>
    </>
  );
};

const ItemDetailsSection = ({
  index,
  expanded = false,
  handleRemoveItem,
}: ItemDetailsSectionProps) => {
  const { register } = useFormContext<AutoImportInputs>();
  const { open, toggle } = useAccordion(expanded);
  const [filename1, setFilename1] = useState("");

  const handleChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!files[0]) return;
    setFilename1(files[0].name);
  };

  const [filename2, setFilename2] = useState("");

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!files[0]) return;
    setFilename2(files[0].name);
  };

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <SectionContentLayout>
          <div className="flex w-full flex-col gap-[30px]">
            <div className="col-span-full flex items-center gap-[30px]">
              <h4 className="title-md md:title-lg text-gray-700">
                Car - <span className="text-primary-600">#{index + 1}</span>
              </h4>
              <div className="flex flex-grow justify-end">
                <AccordionButton {...{ open, toggle }} />
              </div>
            </div>

            {open && (
              <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-12">
                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`brand-${index}`}
                    label={"Brand"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car Brand
                        </option>
                      </>
                    }
                    {...register(`requestPackages.items.${index}.brand`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`model-${index}`}
                    label={"Model"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car Model
                        </option>
                      </>
                    }
                    {...register(`requestPackages.items.${index}.model`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`productionYear-${index}`}
                    label={"Production Year"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Car production year
                        </option>
                      </>
                    }
                    {...register(
                      `requestPackages.items.${index}.productionYear`,
                    )}
                  />
                </div>

                <div className="col-span-full md:col-span-5">
                  <CurrencyInput
                    id={`carValue-${index}`}
                    label={"Car Value"}
                    {...register(`requestPackages.items.${index}.value`)}
                  />
                </div>

                <div className="col-span-full flex items-center gap-[10px] md:col-span-4">
                  <SelectInput
                    id={`carCondition-${index}`}
                    label={"Car Condition"}
                    options={
                      <>
                        <option value="" disabled hidden>
                          Select Condition
                        </option>

                        {CAR_CONDITIONS.map((condition) => {
                          return (
                            <option key={condition} value={condition}>
                              {condition}
                            </option>
                          );
                        })}
                      </>
                    }
                    {...register(`requestPackages.items.${index}.condition`)}
                  />
                </div>

                <div className="col-span-full md:col-span-3">
                  <TextInput
                    id={`carColor-${index}`}
                    label={"Car Color"}
                    {...register(`requestPackages.items.${index}.color`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`mileage-${index}`}
                    label={"Mileage"}
                    type="number"
                    {...register(`requestPackages.items.${index}.mileage`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`vin-${index}`}
                    label={"Vehicle Identification Number"}
                    {...register(`requestPackages.items.${index}.vin`)}
                  />
                </div>

                <div className="col-span-full md:col-span-4">
                  <TextInput
                    id={`url-${index}`}
                    label={"Car's Website Link"}
                    {...register(`requestPackages.items.${index}.url`)}
                  />
                </div>

                <div className="col-span-full md:col-span-6">
                  <FileInput
                    id={`carPicture-${index}`}
                    label={"Upload Car Picture"}
                    value={filename1}
                    {...register(`requestPackages.items.${index}.image`, {
                      onChange: handleChange1,
                    })}
                  />
                </div>

                <div className="col-span-full md:col-span-6">
                  <FileInput
                    id={`carTitle-${index}`}
                    label={"Upload Copy of Car Title"}
                    value={filename2}
                    {...register(`requestPackages.items.${index}.image`, {
                      onChange: handleChange2,
                    })}
                  />
                </div>

                <div className="col-span-full flex flex-col rounded-[20px] bg-error-200 px-[20px] py-[15px]">
                  <b>Note: </b>
                  <p className="body-md md:label-lg text-gray-700">
                    We need the details of the car title before we can schedule
                    a pick up. Be sure sure that our driver can collect it
                    during pick up, as we can&apos;t ship a car without the
                    title.
                  </p>
                </div>

                <div className="col-span-full">
                  <TextAreaInput
                    id={`additionalCarDescription-${index}`}
                    label={"Additional Car Description"}
                    {...register(`requestPackages.items.${index}.image`, {
                      onChange: handleChange2,
                    })}
                  />
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader
                    title="Describe this car further with the following properties (optional)"
                    hr
                  />
                  <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
                    <AddPropertiesSection index={index} />
                  </div>
                </div>

                <div className="col-span-full flex flex-col gap-[30px]">
                  <SectionHeader title="Additional details" hr />
                  <DropOffAddress index={index} />
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

type DropOffAddressProps = { index: number };

const DropOffAddress = ({ index }: DropOffAddressProps) => {
  const { open, toggle } = useAccordion(false);
  const { register } = useFormContext<NonNullable<AutoImportInputs>>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackages"]["items"][number]["additionalDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <>
      <div className="flex items-center gap-[60px]">
        <span className="title-lg text-neutral-900">Drop Off</span>
        <div className="flex items-center gap-[15px]">
          <div className="toggle-switch relative inline-flex w-[52px]">
            <input
              id={`dropOffSwitch-${index}`}
              className="toggle-checkbox hidden"
              type="checkbox"
              onClick={toggle}
            />
            <label
              htmlFor={`dropOffSwitch-${index}`}
              className="toggle-default transition-color relative block h-8 w-12 rounded-full duration-150 ease-out"
            ></label>
          </div>
          <TooltipButton />
        </div>
      </div>
      {open && (
        <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
          <div className="flex w-full flex-col gap-[40px] py-[10px]">
            <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-full md:col-span-4">
                <TextInput
                  id={"contactName"}
                  label={"Pick up Contact Name"}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.contactName`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectCountryPhoneCodeInput
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.countryCode`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <TextInput
                  id={`contactPhoneNumber-${index}`}
                  label="Contact's Phone Number"
                  type="tel"
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.phoneNumber`,
                  )}
                />
              </div>

              <div className="col-span-full">
                <TextInput
                  id={`pickUpEmail-${index}`}
                  label="Pick up Contact Email Address"
                  type="email"
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.contactEmail`,
                  )}
                />
              </div>

              <div className="col-span-full">
                <TextInput
                  id={`pickUpAddress-${index}`}
                  label={"Pick up Address"}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.contactAddress`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectCountryInput
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.country`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectStateInput
                  states={states}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.state`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <SelectCityInput
                  cities={cities}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.city`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={`pickUpDate-${index}`}
                  label={"Pick up date"}
                  type="date"
                  min={new Date().toLocaleDateString()}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.pickUpDate`,
                  )}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <TextInput
                  id={"locationType"}
                  label={"Pickup Location Type"}
                  {...register(
                    `requestPackages.items.${index}.additionalDetails.locationType`,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Step2 = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Fill in the Shipment Address" hr />
        <div className="flex flex-col items-center gap-[30px] md:pl-[34px]">
          <FillInShippingAddress />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Provide your Billing Information" />
        <DefaultBillingAddressRadio />
        <CustomBillingAddress />
      </div>
    </div>
  );
};

const CustomBillingAddress = () => {
  const { open, toggle } = useAccordion(true);
  const { register } = useFormContext<AutoImportInputs>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackages"]["items"][number]["additionalDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[40px] py-[10px]">
        <div className="col-span-full flex items-center gap-[10px] md:gap-[30px]">
          <input
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
            name="radio"
            type="radio"
            value="female"
            aria-label="Custom Billing Address"
          />
          <h4 className="title-md md:title-lg text-gray-700">
            Custom Billing Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[30px]">
              <div className="col-span-1">
                <TextInput
                  id={"firstName"}
                  label={"First Name"}
                  {...register("requestPackages.shipmentDetails.firstName")}
                />
              </div>

              <div className="col-span-1">
                <TextInput
                  id={"lastName"}
                  label={"Last Name"}
                  {...register("requestPackages.shipmentDetails.lastName")}
                />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-full md:col-span-5">
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  {...register("requestPackages.shipmentDetails.email")}
                />
              </div>
              <div className="col-span-full md:col-span-3">
                <SelectCountryPhoneCodeInput
                  {...register("requestPackages.shipmentDetails.countryCode")}
                />
              </div>
              <div className="col-span-full md:col-span-4">
                <TextInput
                  id="phone-number"
                  label="Phone Number"
                  type="tel"
                  {...register("requestPackages.shipmentDetails.phoneNumber")}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"street-address"}
                label={"Street Address"}
                {...register("requestPackages.shipmentDetails.address")}
              />
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-4">
                <SelectCountryInput
                  {...register("requestPackages.billingDetails.country")}
                />
              </div>
              <div className="col-span-4">
                <SelectStateInput
                  states={states}
                  {...register("requestPackages.billingDetails.state")}
                />
              </div>
              <div className="col-span-4">
                <SelectCityInput
                  cities={cities}
                  {...register("requestPackages.billingDetails.city")}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"zipPostalCode"}
                label={"Zip Postal Code"}
                {...register("requestPackages.billingDetails.zipPostalCode")}
              />
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const FillInShippingAddress = () => {
  const { register } = useFormContext<AutoImportInputs>();
  const { getValues, setValue, watch } =
    useFormContext<
      Pick<
        NonNullable<
          AutoImportInputs["requestPackages"]["items"][number]["additionalDetails"]
        >,
        "country" | "state" | "city"
      >
    >();
  const { states, cities } = useStatesCities({ getValues, setValue, watch });

  return (
    <div className="flex w-full flex-col gap-[40px] py-[10px]">
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[30px]">
          <div className="col-span-1">
            <TextInput
              id={"firstName"}
              label={"Receiver's First Name"}
              {...register("requestPackages.shipmentDetails.firstName")}
            />
          </div>

          <div className="col-span-1">
            <TextInput
              id={"lastName"}
              label={"Receiver's Last Name"}
              {...register("requestPackages.shipmentDetails.lastName")}
            />
          </div>
        </div>

        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
          <div className="col-span-full md:col-span-5">
            <TextInput
              id="email"
              label="Receiver's Email"
              type="email"
              {...register("requestPackages.shipmentDetails.email")}
            />
          </div>
          <div className="col-span-full md:col-span-3">
            <SelectCountryPhoneCodeInput
              {...register("requestPackages.shipmentDetails.countryCode")}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="phone-number"
              label="Receiver's Phone Number"
              type="tel"
              {...register("requestPackages.shipmentDetails.phoneNumber")}
            />
          </div>
        </div>

        <div className="col-span-full">
          <TextInput
            id={"street-address"}
            label={"Receiver's Address"}
            {...register("requestPackages.shipmentDetails.address")}
          />
        </div>

        <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
          <div className="col-span-4">
            <SelectCountryInput
              {...register("requestPackages.shipmentDetails.country")}
            />
          </div>
          <div className="col-span-4">
            <SelectStateInput
              states={states}
              {...register("requestPackages.shipmentDetails.state")}
            />
          </div>
          <div className="col-span-4">
            <SelectCityInput
              cities={cities}
              {...register("requestPackages.shipmentDetails.city")}
            />
          </div>
        </div>

        <div className="col-span-full">
          <TextInput
            id={"zipPostalCode"}
            label={"Zip Postal Code"}
            {...register("requestPackages.billingDetails.zipPostalCode")}
          />
        </div>
      </div>
    </div>
  );
};

export const Step3 = () => {
  const fakeData = [
    {
      requestId: "",
      requestStatus: "Not Responded",
      requestLocalDate: new Date().toLocaleString(),
      items: [
        {
          brand: "",
          model: "",
          productionYear: "",
          value: 0,
          condition: "Drivable",
          color: "",
          mileage: 0,
          vin: "",
          url: "",
          image: "",
          carTitleCopy: "",
          description: "",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {fakeData.map((item, i) => {
        return <OrderItem key={item.requestId} index={i} />;
      })}
      <SectionHeader title="Confirm your Shipping Details" />
      <DestinationAddressDetails />
      <SectionHeader title="Confirm your Billing Details" />
      <DefaultBillingAddress />
    </div>
  );
};

export const DestinationAddressDetails = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="flex w-full items-center gap-[30px]">
          <h4 className="title-md md:title-lg text-gray-700">
            Destination/Shipping Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
            <DetailSection
              label="Receiver's First Name"
              value="Malibu"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Receiver's Last Name"
              value="SHedrack"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Contact Number"
              value="+234 803 456 7845"
              colSpanDesktop={4}
            />
            <DetailSection
              label="Receiver's Email"
              value="Malibushdrack@gmail.com"
              colSpanDesktop={4}
            />
            <div className="col-span-2"></div>
            <DetailSection
              label="Destination Country"
              value="Turkey"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Destination State"
              value="Istanbul"
              colSpanMobile={1}
              colSpanDesktop={2}
            />
            <DetailSection
              label="Destination City"
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
              label="Receiver's Address"
              value="No, 1osolo way, ikeja road, behind scaint merry"
            />
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const PickUpDetails = () => {
  return (
    <>
      <span className="title-md md:title-lg text-primary-900">
        Pickup Details
      </span>
      <HighlightedInfo text="Your Car will be picked up from this address" />
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10 [&>*]:text-primary-900">
        <AddressDetail
          label="Contact's First Name"
          value="Malibu"
          colSpanDesktop={4}
        />
        <AddressDetail
          label="Contact's Last Name"
          value="SHedrack"
          colSpanDesktop={4}
        />
        <AddressDetail
          label="Contact Number"
          value="+234 803 456 7845"
          colSpanDesktop={4}
        />
        <AddressDetail
          label="Contact Email"
          value="Malibushdrack@gmail.com"
          colSpanDesktop={4}
        />
        <AddressDetail
          label="Street Address"
          value="No, 1osolo way, ikeja road, behind scaint merry"
        />
        <AddressDetail
          label="Location of the Car (Country)"
          value="Turkey"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <AddressDetail
          label="Location of the Car (State)"
          value="Istanbul"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <AddressDetail
          label="Location of the Car (City)"
          value="Cyprusic"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <AddressDetail
          label="Zip/postal Code"
          value="98765"
          colSpanMobile={1}
          colSpanDesktop={2}
        />

        <AddressDetail
          label="Pick up Date"
          value="10/02/2023"
          colSpanDesktop={4}
        />
        <AddressDetail
          label="Location Type"
          value="Mosque"
          colSpanDesktop={4}
        />
      </div>
    </>
  );
};

export const OrderItem = ({ index }: OrderItemProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg font-medium text-gray-700">
            Car - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && <OrderItemDetails />}
        {index % 2 === 0 && (
          <>
            <hr className="block w-full border-dashed border-primary-600" />
            <PickUpDetails />
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const OrderItemDetails = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-12">
      <DetailSection
        label="Car Model"
        value="Designer Bags"
        colSpanDesktop={5}
      />
      <DetailSection label="Model" value="Designer Bags" colSpanDesktop={5} />
      <DetailSection label="Production Year" value="2022" colSpanDesktop={2} />
      <DetailSection
        label="Car Value"
        value="$560,000,000.00"
        colSpanDesktop={5}
      />
      <DetailSection
        label="Car Condition"
        value="Drivable"
        colSpanDesktop={3}
      />
      <DetailSection
        label="Car Color"
        value="Blue"
        colSpanMobile={1}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Mileage"
        value="77676km"
        colSpanMobile={1}
        colSpanDesktop={2}
      />
      <DetailSection
        label="Car Picture"
        value="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
        image
        colSpanDesktop={5}
      />
      <DetailSection
        label="Copy of the Car Title"
        value="https://placehold.co/500x500/cac4d0/1d192b?text=Image"
        image
        colSpanDesktop={5}
      />
      <DetailSection label="Car Description" value="Additonvnv ghss jgsjvsn" />
      <DetailSection label="Color" value="Blue" colSpanDesktop={3} />
      <DetailSection label="Stripes" value="5 inches" colSpanDesktop={3} />
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
              <HighlightedInfo text="From the details you provided, your car(s) will be delivered and shipped from here to our your selected 'destination' in Nigeria" />
              <DetailSection
                label="Origin warehouse"
                value=" United States (Houston - warehouse)"
              />
              <OriginWarehouseAddress />
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

export const OriginWarehouseAddress = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="title-md md:title-lg text-primary-900">
          Origin warehouse address
        </span>

        <hr className="mx-[10px] flex-grow border-dashed border-primary-900" />
      </div>
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10">
        <AddressDetail label="First Name" value="Malibu" colSpanDesktop={4} />
        <AddressDetail label="Last Name" value="SHedrack" colSpanDesktop={4} />
        <AddressDetail
          label="Street Address"
          value="No, 1osolo way, ikeja road, behind scaint merry"
        />
        <AddressDetail
          label="State"
          value="Istanbul"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <AddressDetail
          label="City"
          value="Cyprusic"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
        <AddressDetail
          label="Zip/postal Code"
          value="98765"
          colSpanMobile={1}
          colSpanDesktop={2}
        />
      </div>
    </>
  );
};

export const Step4 = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
        <LabelId label="Request ID" id="R78667" />
      </div>

      <CongratulationImage text="You have just successfully requested an order for Auto Import service." />
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="You have 4 more steps to take" />
        <SectionContentLayout>
          <div className="flex flex-col gap-[10px]">
            <span className="title-md md:title-lg font-medium text-neutral-700 md:pl-[14px] md:font-bold">
              Here are more information on how to track
            </span>
            <StepDescription
              stepNumber={1}
              description="We will review the details in your request and get back to you
                  with the shipping quote."
            />
            <StepDescription
              stepNumber={2}
              description={
                <>
                  To complete your order and initiate shipment of your car(s),
                  you are required to make payment for{" "}
                  <i>shipping and/or pick up only</i> a immediately we send you
                  the shipping quote while you delay the payment for port
                  handling & clearing fees upon their arrival to the port in
                  Nigeria.
                </>
              }
            />

            <StepDescription
              stepNumber={3}
              description="If your shipping address is Lagos, you will come to pick it up in our office otherwise we send it to your city"
            />
          </div>
        </SectionContentLayout>
      </div>

      <HaveAConcern />
    </div>
  );
};

const HaveAConcern = () => {
  return (
    <>
      <SectionHeader title="Have A Concern?" />
      <div className="flex flex-col flex-wrap items-center gap-[30px] px-[10px] md:flex-row md:pl-[34px]">
        <div className="flex max-w-[219px] flex-col gap-[10px]">
          <span className="body-md w-[219px]">
            Would you like to know the shipping cost of your package before
            hand?
          </span>
          <span className="w-fit">
            <GetAQuoteButton />
          </span>
        </div>
        <div className="flex max-w-[227px] flex-col gap-[10px]">
          <span className="body-md w-[219px]">
            Would you like to learn more about the port handling and clearing
            fee?
          </span>
          <span className="w-max">
            <CustomerSupportButton />
          </span>
        </div>
      </div>
    </>
  );
};

const GetAQuoteButton = () => {
  const onClick = () => {
    return;
  };

  return (
    <button
      onClick={onClick}
      aria-label="Get a quote"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Calculator size={18} className="text-primary-900" />
      <span className="label-lg font-medium text-primary-600">Get a quote</span>
    </button>
  );
};

export const CustomerSupportButton = () => {
  const onClick = () => {
    return;
  };
  return (
    <button
      onClick={onClick}
      aria-label="Speak to a Customer Rep"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Whatsapp size={18} className="text-primary-900" />
      <span className="label-lg font-medium text-primary-600">
        Speak to a Customer Rep
      </span>
    </button>
  );
};

export default RequestOrder;
