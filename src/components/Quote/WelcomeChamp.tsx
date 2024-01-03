/* eslint-disable @next/next/no-img-element */
import { Country } from "country-state-city";
import { Car, ExportSquare, ImportSquare, Shop } from "iconsax-react";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { capitalizeWords } from "~/Utils";
import { SERVICES } from "~/constants";
import useMultiStepForm from "~/hooks/useMultistepForm";
import { DoneButton } from "../Buttons/DoneButton";
import { ProceedButton } from "../Buttons/ProceedButton";
import QuantityInput from "../Forms/Inputs/QuantityInput";
import SelectInput from "../Forms/Inputs/SelectInput";
import TextInput from "../Forms/Inputs/TextInput";
import {
  RequestFormHeader,
  SectionHeader,
} from "../Shop/Requests/RequestOrder";

type QuoteInputs = {
  origin: string;
  destination: string;
  service: (typeof SERVICES)[number];
  weight: number;
  quantity: number;
  length: number;
  width: number;
  height: number;
};

const defaultValues: QuoteInputs = {
  origin: "",
  destination: "",
  service: "export",
  weight: 0,
  quantity: 1,
  length: 0,
  width: 0,
  height: 0,
};

const WelcomeChamp = () => {
  const { step, next, isFirstStep, isLastStep, back } = useMultiStepForm([
    <Step1 />,
    <Step2 />,
  ]);

  const formMethods = useForm<QuoteInputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<QuoteInputs> = (data) => {
    if (!isLastStep) next();
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        {step}

        {isFirstStep && (
          <div className="w-full md:max-w-[300px]">
            <ProceedButton
              label="Get Quote"
              onClick={formMethods.handleSubmit(onSubmit)}
            />
          </div>
        )}
        {isLastStep && (
          <div className="w-full md:max-w-[300px]">
            <DoneButton
              handleFinish={() => {
                formMethods.reset();
                back();
              }}
            />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

const Step1 = () => {
  const { register, setValue, getValues } = useFormContext<QuoteInputs>();

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <h2 className="headline-sm font-bold text-gray-700">Welcome Champ!</h2>
        <p className="title-lg text-gray-700">
          This is where you can get the cost of shipping before hand
        </p>
      </div>
      <div className="flex max-w-[1000px] flex-col gap-[30px] rounded-[20px] border border-gray-200 bg-white p-[20px] md:p-[30px]">
        <h3 className="title-lg text-gray-700">
          Provide details about your package
        </h3>
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-12">
          <div className="col-span-full md:col-span-6">
            <SelectInput
              id="originCountry"
              label="Origin Country"
              {...register("origin")}
              options={
                <>
                  <option value="" disabled hidden>
                    Enter the origin country
                  </option>
                  {Country.getAllCountries().map(({ name, isoCode }) => {
                    return (
                      <option key={`country-${name}`} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
                </>
              }
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <SelectInput
              id="destinationCountry"
              label="Destination Country"
              {...register("destination")}
              options={
                <>
                  <option value="" disabled hidden>
                    Enter the destination country
                  </option>
                  {Country.getAllCountries().map(({ name, isoCode }) => {
                    return (
                      <option key={`country-${name}`} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
                </>
              }
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <SelectInput
              id="serviceInput"
              label="Service"
              {...register("service")}
              options={
                <>
                  <option value="" disabled hidden>
                    Select a service
                  </option>
                  {SERVICES.map((service) => {
                    return (
                      <option key={service} value={service}>
                        {capitalizeWords(service)}
                      </option>
                    );
                  })}
                </>
              }
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="weight"
              label="Weight (in kg)"
              {...register("weight")}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <QuantityInput
              id="quantity"
              label="Quantity"
              {...register("quantity", { valueAsNumber: true })}
              handleAdd={() => {
                const prev = getValues("quantity");
                const value = prev + 1;
                setValue("quantity", value);
              }}
              handleSubtract={() => {
                const prev = getValues("quantity");
                if (prev <= 1) return;
                const value = prev - 1;
                setValue("quantity", value);
              }}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="length"
              label="Length (in inches)"
              {...register("length")}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="width"
              label="Width (in inches)"
              {...register("width")}
            />
          </div>
          <div className="col-span-full md:col-span-4">
            <TextInput
              id="height"
              label="Height (in inches)"
              {...register("height")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

type Step2ServicesType = Record<
  (typeof SERVICES)[number],
  {
    text: string;
    icon: JSX.Element;
    href: string;
  }
>;

const services: Step2ServicesType = {
  export: {
    text: "Would you like to initiate an export service right away?",
    icon: <ExportSquare />,
    href: "/export",
  },
  import: {
    text: "Would you like to initiate an import service right away?",
    icon: <ImportSquare />,
    href: "/import",
  },
  "auto import": {
    text: "Would you like to initiate an auto import service right away?",
    icon: <Car />,
    href: "/auto-import",
  },
  "shop for me": {
    text: "Would you like to initiate a shop for me service right away?",
    icon: <Shop />,
    href: "/shop",
  },
};

const Step2 = () => {
  const router = useRouter();
  const { getValues } = useFormContext<QuoteInputs>();

  return (
    <>
      <RequestFormHeader title="Getting a Quote" />
      <div className="flex flex-col-reverse gap-[10px] rounded-[20px] bg-primary-600 px-[21px] py-[15px] md:flex-row md:px-[14px] md:py-[10px]">
        <img
          src="/images/delivery_package_boxes.png"
          alt="delivery package boxes"
          className="md:w-1/2"
        />
        <div className="flex flex-col justify-center gap-[10px] text-white">
          <span className="title-lg md:headline-md !font-bold">
            You Just Got a Quote!
          </span>
          <span className="title-lg md:headline-md">
            The shipping cost shown here is an estimate based on the package
            details you provided.
          </span>
          <div className="flex flex-col gap-[10px] border-t-[1px] p-[10px] md:border-0">
            <span className="body-lg">Estimated Shipping Cost:</span>
            <span className="title-lg md:headline-md">$345.00</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="What next?" />
        <div className="flex flex-col gap-[10px] px-[10px] md:px-[34px]">
          <p className="body-md">{services[getValues("service")].text}</p>
          <div className="w-full md:w-max">
            <button
              onClick={() => router.push(services[getValues("service")].href)}
              aria-label={`Initiate ${capitalizeWords(getValues("service"))}`}
              className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
            >
              <span className="text-primary-900 [&>*]:w-[18px] [&>*]:md:w-[24px]">
                {services[getValues("service")].icon}
              </span>
              <span className="label-lg md:body-lg whitespace-nowrap text-primary-600">
                Initiate {capitalizeWords(getValues("service"))}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeChamp;
