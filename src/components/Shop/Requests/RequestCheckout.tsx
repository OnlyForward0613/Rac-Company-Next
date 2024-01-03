/* eslint-disable @next/next/no-img-element */
import { ArrowRight3, ExportCircle, Receipt2, TickCircle } from "iconsax-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BackButton } from "~/components/Buttons/BackButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import SelectCityInput from "~/components/Forms/Inputs/SelectCityInput";
import SelectCountryInput from "~/components/Forms/Inputs/SelectCountryInput";
import SelectCountryPhoneCodeInput from "~/components/Forms/Inputs/SelectCountryPhoneCodeInput";
import SelectStateInput from "~/components/Forms/Inputs/SelectStateInput";
import TextInput from "~/components/Forms/Inputs/TextInput";
import LabelId from "~/components/LabelId";
import OrderTrackingId from "~/components/OrderTrackingId";
import SuccessImportantNotice from "~/components/SuccessImportantNotice";
import { type BillingDetailsType } from "~/contexts/AutoImportContext";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import useStatesCities from "~/hooks/useStatesCities";
import AccordionButton from "../../Forms/AccordionButton";
import { Item, PackageOrigin } from "./RequestDetails";
import {
  ChangeCurrencyButton,
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "./RequestOrder";

export type stepsContentType = { title: string; content: JSX.Element };

const RequestCheckout = () => {
  const { handlePayNowAction } = useShopContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <PackageConfirmation /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <BillingAddress />,
    },
    { title: "Place Order", content: <PlaceOrder /> },
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
    handleTabChange("requests");
  };

  useEffect(() => {
    handlePayNowAction({ action: next });
  }, []);

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Confirm and Place your Order" />
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />
      {!isLastStep && <LabelId label="Request ID" id="R78667" />}
      {isLastStep && (
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}
      {step}
      <div className="flex w-full flex-col items-center justify-center gap-[10px] md:w-max md:flex-row">
        {isFirstStep && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={handleBack} />
          </div>
        )}
        {!isFirstStep && !isLastStep && (
          <div className="w-full md:max-w-[210px]">
            <BackButton onClick={back} />
          </div>
        )}
        {currentStepIndex === 0 && <NextButton text="Proceed" next={next} />}
        {currentStepIndex === 1 && <NextButton text="Confirm" next={next} />}
        {currentStepIndex === 3 && (
          <div className="w-full">
            <NextButton text="Done" next={handleFinish} />
          </div>
        )}
      </div>
    </div>
  );
};

type NextButtonProps = { text: string; next: () => void };

export const NextButton = ({ text, next }: NextButtonProps) => {
  return (
    <button
      onClick={next}
      aria-label="Proceed"
      className="btn relative flex w-full min-w-[150px] flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <TickCircle size={18} variant="Bold" />
      <span className="body-lg text-white">{text}</span>
    </button>
  );
};

const PackageConfirmation = () => {
  const { requestPackages } = useShopContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <PackageOrigin />
      <hr className="block w-full border-dashed border-primary-900" />
      {requestPackages.map((item, i) => {
        return <Item key={item.requestId} index={i} />;
      })}
    </div>
  );
};

const BillingAddress = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Provide your billing address" hr />
      <DefaultBillingAddressRadio />
      <CustomBillingAddress />
    </div>
  );
};

export const DefaultBillingAddressRadio = () => {
  const { open, toggle } = useAccordion(false);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px]">
        <div className="col-span-full flex items-center gap-[10px] md:gap-[30px]">
          <input
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
            name="radio"
            type="radio"
            value="male"
            aria-label="Custom Billing Address"
            checked={true}
            onChange={() => {
              return;
            }}
          />
          <h4 className="title-md md:title-lg text-gray-700">
            Default Billing Address
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex w-full flex-col gap-[1px]">
            <span className="title-md font-medium text-neutral-900">
              Mr Rex Offor
            </span>
            <span className="body-lg text-neutral-700">+234 8080006321</span>
            <span className="body-lg text-neutral-700">rexoffor@gmail.com</span>
            <span className="body-lg text-neutral-700">
              29b Osolo Way Opposite Polaris Bank Ajao Estate, ikeja, Lagos
              State, USA, 075348
            </span>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const CustomBillingAddress = () => {
  const { open, toggle } = useAccordion(true);
  const { register, getValues, setValue, watch } =
    useForm<BillingDetailsType>();
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
                  {...register("firstName")}
                />
              </div>

              <div className="col-span-1">
                <TextInput
                  id={"lastName"}
                  label={"Last Name"}
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-full md:col-span-5">
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  {...register("email")}
                />
              </div>
              <div className="col-span-full md:col-span-3">
                <SelectCountryPhoneCodeInput {...register("countryCode")} />
              </div>
              <div className="col-span-full md:col-span-4">
                <TextInput
                  id="phone-number"
                  label="Phone Number"
                  type="tel"
                  {...register("phoneNumber")}
                />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"street-address"}
                label={"Street Address"}
                {...register("address")}
              />
            </div>

            <div className="col-span-full grid grid-cols-1 gap-[20px] md:grid-cols-12 md:gap-[30px]">
              <div className="col-span-4">
                <SelectCountryInput {...register("country")} />
              </div>
              <div className="col-span-4">
                <SelectStateInput states={states} {...register("state")} />
              </div>
              <div className="col-span-4">
                <SelectCityInput cities={cities} {...register("city")} />
              </div>
            </div>

            <div className="col-span-full">
              <TextInput
                id={"zipPostalCode"}
                label={"Zip Postal Code"}
                {...register("zipPostalCode")}
              />
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

const PlaceOrder = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details" />
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

export const PaymentMethods = () => {
  return (
    <form>
      <fieldset
        id="PaymentMethods"
        className="flex flex-col gap-[10px] md:pb-[40px]"
      >
        <PaymentMethod
          title="Credit/Debit Cards - Pay with Dollar/US Cards"
          description="Valid for MasterCard and Visa Cards. Maximum allowed is $1,500"
          expanded
        />
        <PaymentMethod
          title="Paystack - Pay with Naira Card"
          description="Pay with Your Naira Card"
          expanded
        />
        <PaymentMethod title="Pay At Bank in $ - Nigeria" />
        <PaymentMethod title="Pay At Bank in Naira - Nigeria" />
        <PaymentMethod title="Pay Via PayPal" />
      </fieldset>
    </form>
  );
};

export const PackageTable = () => {
  const th = [
    "Item",
    "Item URL",
    "Item Cost from Store",
    "Urgent Purchase",
    "Quantity of items",
    "Total value of item",
  ];

  return (
    <div className="overflow-x-scroll ">
      <table className="relative min-w-max table-auto text-left">
        <PackageTableHead th={th} />
        <PackageTableBody />
        <Totals />
      </table>
    </div>
  );
};

export const ImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[30px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="label-lg text-primary-900">IMPORTANT NOTICE:</span>
      <p className="label-lg font-medium text-gray-700">
        We do not ship or return any fraudulent purchased items. You are advised
        to only pay to ship items that uou can provide valid evidence of proof
        of purchase when and if requested. Items for which valid proof of
        purchase can be provided will be handed over to the CUSTOMS. In addition
        any shipping cost paid will be forfeited and billed to you as cost of
        verification.
      </p>
    </div>
  );
};

type CostProps = { title: string; value: string };

export const Cost = ({ title, value }: CostProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="label-lg flex items-center justify-between gap-[10px] font-medium">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <hr className="w-full border-gray-200" />
    </div>
  );
};

const Summary = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-primary-900 px-[28px] py-[20px] text-white">
      <span className="title-lg">Order Costs Summary</span>
      <div className="flex flex-col gap-[10px]">
        <Cost title="Total Urgent Purchase Cost:" value="$126.66" />
        <Cost title="Total Cost of Items from Store:" value="$126.66" />
        <Cost
          title="Total Shipping to Origin Warehouse cost:"
          value="$126.66"
        />
        <Cost title="Total Processing fee: " value="$126.66" />
        <Cost title="VAT:" value="$126.66" />
        <Cost title="Payment Method Surcharge:" value="$126.66" />
        <Cost title="Discount:" value={`- ${"$126.66"}`} />
        <TotalCost />
      </div>
    </div>
  );
};

type TotalCostProps = { total?: number };

export const TotalCost = ({ total }: TotalCostProps) => {
  return (
    <div className="mt-[10px] flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-end">
      <div className="flex flex-col gap-[5px]">
        <span className="label-lg">Total:</span>
        <span className="title-lg">${total}</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-[10px] md:items-center">
        <span className="body-md text-primary-100">
          Default Currency: <b>USD</b>
        </span>
        <ChangeCurrencyButton />
      </div>
    </div>
  );
};

const CostsSummary = () => {
  const { payNowAction } = useShopContext();

  if (!payNowAction) return;

  return (
    <div className="flex flex-col rounded-[20px] border border-primary-100">
      <Summary />
      <div className="flex flex-col items-center justify-center gap-[20px] p-[20px]">
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
        <div className="w-[168px]">
          <PayNowButton onClick={payNowAction.action} />
        </div>
      </div>
    </div>
  );
};

type PaymentMethodProps = {
  title: string;
  description?: string;
  expanded?: boolean;
  checked?: boolean;
  onChange?: () => void;
};

const PaymentMethod = ({
  title,
  description,
  expanded = false,
  checked,
  onChange = () => {
    return;
  },
}: PaymentMethodProps) => {
  const { open, toggle } = useAccordion(expanded);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[20px] py-[10px] md:gap-[34px]">
        <div className="col-span-full flex items-center gap-[10px] md:gap-[14px]">
          <input
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
            name="payment method"
            type="radio"
            value={title}
            aria-label={title}
            checked={checked}
            onChange={onChange}
          />
          <h4 className="title-md md:title-sm font-medium text-black">
            {title}
          </h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <span className="body-md pl-[10px] text-neutral-700">
            {description}
          </span>
        )}
      </div>
    </SectionContentLayout>
  );
};

type SubSectionTitleProps = { title: string | JSX.Element };

export const SubSectionTitle = ({ title }: SubSectionTitleProps) => {
  return <h4 className="title-md md:title-lg text-gray-700">{title}</h4>;
};

const Totals = () => {
  return (
    <tfoot className="grid h-[170px] grid-cols-4 grid-rows-2 items-end gap-y-[20px] rounded-b-[20px] border border-t-0 border-gray-200 bg-neutral-50 px-[30px] py-[10px] [&>tr>td]:border-0 [&>tr>td]:p-0">
      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">Total number of items:</td>
        <td className="title-lg text-neutral-900">6</td>
      </tr>
      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">Total Gross weight:</td>
        <td className="title-lg text-neutral-900">30lbs</td>
      </tr>
      <tr className="col-span-2 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">Total Items Cost from Store:</td>
        <td className="title-lg text-neutral-900">$345.00</td>
      </tr>

      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">Processing fee:</td>
        <td className="title-lg text-neutral-900">$345.00</td>
      </tr>
      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">Urgent Purchase fee:</td>
        <td className="title-lg text-neutral-900">$0.00</td>
      </tr>
      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="body-md text-gray-700">
          Total Shipping to Origin Warehouse Cost:
        </td>
        <td className="title-lg text-neutral-900">$0.00</td>
      </tr>
      <tr className="col-span-1 row-span-1 flex flex-col gap-[5px]">
        <td className="title-lg text-gray-700">Total Shop For Me Cost:</td>
        <td className="title-lg text-neutral-900">$0.00</td>
      </tr>
    </tfoot>
  );
};

const PackageTableBody = () => {
  const limitChars = (text: string, limit: number) => {
    return `${text.slice(0, limit - 3)}...`;
  };

  const fakeData = {
    image: "https://placehold.co/500x500/cac4d0/1d192b?text=Image",
    name: "SteelSeries Rival 5 Gaming Laptop with PrismSync RGB...",
    url: "htttp/jjnkkukja.jhgyja...",
    costFromStore: "$88.99",
    urgentPurchase: "$88.99",
    quantity: "3",
    totalValue: "$112.49",
  };

  return (
    <tbody className="flex flex-col border-x border-gray-200 bg-white px-[20px] [&>tr]:border-b-[0.5px] [&>tr]:border-gray-500">
      {Array<typeof fakeData>(2)
        .fill(fakeData)
        .map(
          (
            {
              image,
              name,
              url,
              costFromStore,
              urgentPurchase,
              quantity,
              totalValue,
            },
            i,
          ) => {
            return (
              <tr
                key={i}
                className="label-lg grid grid-cols-8 items-center font-medium [&>td]:border-0 [&>td]:px-0 [&>td]:py-[20px]"
              >
                <td className="col-span-2 flex gap-[10px]">
                  <div className="w-[62px] items-center overflow-hidden rounded-[10px]">
                    <img src={image} alt="item image" />
                  </div>
                  <div className="max-w-[160px] text-secondary-900">
                    {limitChars(name, 80)}
                  </div>
                </td>
                <td className="col-span-2 text-primary-600 underline">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    {limitChars(url, 25)}
                  </a>
                </td>
                <td className="col-span-1">{costFromStore}</td>
                <td className="col-span-1">{urgentPurchase}9</td>
                <td className="col-span-1">{quantity}</td>
                <td className="col-span-1">{totalValue}</td>
              </tr>
            );
          },
        )}
    </tbody>
  );
};

export type PackageTableHeadProps = { th: string[] };

export const PackageTableHead = ({ th }: PackageTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-8 gap-[20px] rounded-t-[20px] border border-b-0 border-gray-200 bg-neutral-50 p-[30px] font-medium text-secondary-900">
      {th.map((title, i) => {
        return (
          <tr key={title} className={`${(i === 0 || i === 1) && "col-span-2"}`}>
            <th className="max-w-[150px] border-0 p-0">
              <span className="label-lg">{title}</span>
            </th>
          </tr>
        );
      })}
    </thead>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <CongratulationImage text="You have just successfully placed a shop for me order by paying for your shop for me cost." />
      <SuccessImportantNotice />
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
                  the Tracking ID above or{" "}
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

export const AndLastly = () => {
  return (
    <div className="flex flex-col">
      <SectionHeader title="And lastly..." />
      <div className="flex flex-col gap-[10px] px-[10px] py-[10px] md:px-[34px]">
        <p className="body-md">
          We have sent you details about your Order to your email address{" "}
          <span className="text-primary-900">rexofforex@gmail.com</span>
        </p>
        <div className="w-max">
          <button
            aria-label="View Receipt"
            className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
          >
            <Receipt2 size={18} className="text-primary-900" />
            <span className="body-lg whitespace-nowrap text-primary-600">
              View Receipt
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

type StepIndexProps = { currentIndex: number; length: number; title: string };

export const StepIndex = ({ currentIndex, length, title }: StepIndexProps) => {
  return (
    <>
      <div className="hidden gap-[39px] md:flex">
        {Array(length)
          .fill(null)
          .map((_, i) => {
            if (currentIndex + 1 === length && i === currentIndex) {
              return (
                <div
                  key={`checkout-step-${i}`}
                  className="flex items-center gap-[10px]"
                >
                  <span className="title-lg h-full rounded-[20px] bg-primary-900 px-[10px] py-[12px] text-white">
                    <TickCircle size="24" variant="Bold" />
                  </span>
                  <span className="headline-md">{title}</span>
                </div>
              );
            }

            if (i + 1 === length) {
              return (
                <div
                  key={`checkout-step-${i}`}
                  className="flex items-center gap-[10px] rounded-[20px] bg-gray-200 px-[10px] py-[12px]"
                >
                  <TickCircle size="24" color="white" variant="Bold" />
                </div>
              );
            }

            if (i === currentIndex) {
              return (
                <div
                  key={`checkout-step-${i}`}
                  className="flex items-center gap-[10px]"
                >
                  <span className="title-lg rounded-[20px] bg-primary-900 p-[10px] text-white">
                    {currentIndex + 1}
                  </span>
                  <span className="headline-md">{title}</span>
                </div>
              );
            }

            if (i !== currentIndex) {
              return (
                <div
                  key={`checkout-step-${i}`}
                  className="flex items-center gap-[10px]"
                >
                  <span className="title-lg rounded-[20px] bg-gray-200 p-[10px] text-white">
                    {i + 1}
                  </span>
                </div>
              );
            }
          })}
      </div>

      {/* for mobile screen */}
      <div className="flex flex-col gap-[10px] md:hidden">
        <div className="flex justify-between">
          {Array(length)
            .fill(null)
            .map((_, i) => {
              if (currentIndex + 1 === length && i === currentIndex) {
                return (
                  <div
                    key={`checkout-step-${i}`}
                    className="flex items-center gap-[10px]"
                  >
                    <TickCircle
                      size="24"
                      variant="Bold"
                      className="title-lg h-full rounded-[20px] bg-primary-900 px-[10px] py-[12px] text-white"
                    />
                  </div>
                );
              }

              if (i + 1 === length) {
                return (
                  <div
                    key={`checkout-step-${i}`}
                    className="flex items-center gap-[10px] rounded-[20px] bg-gray-200 px-[10px] py-[12px]"
                  >
                    <TickCircle size="24" color="white" variant="Bold" />
                  </div>
                );
              }

              if (i === currentIndex) {
                return (
                  <div
                    key={`checkout-step-${i}`}
                    className="flex items-center gap-[10px]"
                  >
                    <span className="title-lg rounded-[20px] bg-primary-900 p-[10px] text-white">
                      {currentIndex + 1}
                    </span>
                  </div>
                );
              }

              if (i !== currentIndex) {
                return (
                  <div
                    key={`checkout-step-${i}`}
                    className="flex items-center gap-[10px]"
                  >
                    <span className="title-lg rounded-[20px] bg-gray-200 p-[10px] text-white">
                      {i + 1}
                    </span>
                  </div>
                );
              }
            })}
        </div>
        <span className="title-lg md:title-lg">{title}</span>
      </div>
    </>
  );
};

export default RequestCheckout;
