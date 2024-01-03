/* eslint-disable @next/next/no-img-element */
import { ArrowRight3, ExportCircle } from "iconsax-react";
import { useEffect } from "react";
import { BackButton } from "~/components/Buttons/BackButton";
import { PayNowButton } from "~/components/Buttons/PayNowButton";
import CongratulationImage from "~/components/CongratulationImage";
import AccordionButton from "~/components/Forms/AccordionButton";
import LabelId from "~/components/LabelId";
import OrderTrackingId from "~/components/OrderTrackingId";
import { AddressDetail } from "~/components/Shop/Orders/ClearPackage";
import {
  DefaultBillingAddress,
  type OrderItemProps,
  type ShippingMethodProps,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  AndLastly,
  Cost,
  ImportantNotice,
  NextButton,
  PaymentMethods,
  StepIndex,
  SubSectionTitle,
  TotalCost,
  type PackageTableHeadProps,
  type stepsContentType,
} from "~/components/Shop/Requests/RequestCheckout";
import {
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import useMultiStepForm from "~/hooks/useMultistepForm";
import {
  DestinationAddressDetails,
  OrderItemDetails,
  PackageOrigin,
} from "../Requests/RequestOrder";

const InitiateShipping = () => {
  const { handlePayNowAction } = useAutoImportContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const steps: [stepsContentType, ...stepsContentType[]] = [
    { title: "Package Confirmation", content: <Step1 /> },
    {
      title: "Shipping & Billing Details Confirmation",
      content: <Step2 />,
    },
    { title: "Place Order", content: <Step3 /> },
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
        <CongratulationImage text="Your Package have arrived its Origin warehouse. Proceed to initiate shipping" />
      )}
      <StepIndex
        currentIndex={currentStepIndex}
        length={steps.length}
        title={currentTitle}
      />

      {!isLastStep && (
        <div className="w-full md:w-max">
          <LabelId label="Request ID" id="R78667" />
        </div>
      )}
      {isLastStep && (
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>
      )}

      {isLastStep && (
        <CongratulationImage text="You have just successfully placed an Auto-Import order." />
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
            Car - <span className="text-primary-600">#{index + 1}</span>
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && <OrderItemDetails />}
        {index % 2 === 0 && (
          <>
            <hr className="block w-full border-gray-500" />
            <PickUpDetails />
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const PickUpDetails = () => {
  return (
    <>
      <span className="title-md md:title-lg text-gray-700">Pickup Details</span>
      <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-10 [&>div>span:first-child]:text-gray-500 [&>div>span:nth-child(2)]:text-neutral-900">
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

const Step2 = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Confirm your Shipping Details" />
      <DestinationAddressDetails />
      <SectionHeader title="Confirm your Billing Information" />
      <DefaultBillingAddress />
    </div>
  );
};

const Step3 = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <SectionHeader title="Package details Summary" />
      <PackageTable />

      <SectionHeader title="Shipping Methods" />
      <div className="pl-[14px]">
        <SubSectionTitle title="Select The Shipping Method That Suites Your Need" />
      </div>
      <ShippingMethod checked disabled expanded />

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
        <Cost title="Pickup Cost:" value="$126.66" />
        <Cost title="Shipping Cost:" value="$126.66" />
        <Cost title="Other Charges:" value="$126.66" />
        <Cost title="Storage Charge:" value="$126.66" />
        <Cost title="Insurance: " value="$126.66" />
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
            <ArrowRight3 className="text-error-600" variant="Bold" />
            <span className="label-md w-fit font-medium text-secondary-900">
              The total you are paying now includes Shipping fees but excludes
              port handling and clearing fees (would be paid upon arrival of
              car(s) to the Port in Nigeria)
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

const ShippingMethod = ({
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
          <h4 className="title-md md:title-lg text-black">Custom</h4>
          <div className="flex flex-grow justify-end">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-[10px] pl-[10px]">
            <div className="label-lg grid w-full grid-cols-2 gap-[20px] font-medium text-neutral-900 md:w-max">
              <span className="col-span-1">Shipping Cost:</span>
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
              <p className="text-error-900">
                The cost paid here only covers shipping to the Port in Nigeria.
                Additional clearing cost has to be paid to get it out of the
                ports. You can call us on +234 700 700 6000 or +1 888 567 8765
                to get a clearance estimate
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionContentLayout>
  );
};

export const PackageTable = () => {
  const th = ["Items", "Car(s) color", "Car(s) value", "Pick up Cost"];

  return (
    <div className="overflow-x-auto ">
      <table className="relative min-w-max table-auto text-left">
        <PackageTableHead th={th} />
        <PackageTableBody />
        <Totals />
      </table>
    </div>
  );
};

const PackageTableHead = ({ th }: PackageTableHeadProps) => {
  return (
    <thead className="title-sm sticky top-0 z-10 grid grid-cols-4 gap-[20px] rounded-t-[20px] border border-b-0 border-gray-200 bg-neutral-50 p-[30px] font-medium text-secondary-900">
      {th.map((title) => {
        return (
          <tr key={title}>
            <th className="max-w-[150px] border-0 p-0">
              <span className="label-lg">{title}</span>
            </th>
          </tr>
        );
      })}
    </thead>
  );
};

const Totals = () => {
  return (
    <tfoot className="grid grid-cols-4 gap-y-[20px] rounded-b-[20px] border border-t-0 border-gray-200 bg-neutral-50 px-[30px] py-[10px] [&>tr>td]:border-0 [&>tr>td]:p-0">
      <tr className="col-span-1 col-start-3 flex w-[100px] flex-col items-end gap-[5px]">
        <td className="body-md text-end text-gray-700">
          Total Declared value:
        </td>
        <td className="title-lg text-neutral-900">$345.00</td>
      </tr>
      <tr className="col-span-1 flex w-[100px] flex-col items-end gap-[5px]">
        <td className="body-md text-end text-gray-700">Total pick up cost:</td>
        <td className="title-lg text-neutral-900">$340.00</td>
      </tr>
    </tfoot>
  );
};

const PackageTableBody = () => {
  const limitChars = (text: string, limit: number) => {
    return text.length < 20 ? text : `${text.slice(0, limit - 3)}...`;
  };

  const fakeData = {
    image: "https://placehold.co/500x500/cac4d0/1d192b?text=Image",
    name: "Benz s10",
    color: "Blue",
    value: "$88.99",
    pickUpCost: "$22.00",
  };

  return (
    <tbody className="flex flex-col border-x border-gray-200 bg-white px-[20px] [&>tr]:border-b-[0.5px] [&>tr]:border-gray-500">
      {Array<typeof fakeData>(2)
        .fill(fakeData)
        .map(({ image, name, color, value, pickUpCost }, i) => {
          return (
            <tr
              key={i}
              className="label-lg grid grid-cols-4 items-center gap-[20px] font-medium [&>td]:border-0 [&>td]:px-0 [&>td]:py-[20px]"
            >
              <td className="col-span-1 flex items-center gap-[10px]">
                <div className="w-[62px] overflow-hidden rounded-[10px]">
                  <img src={image} alt="item image" />
                </div>
                <div className="max-w-[160px] text-secondary-900">
                  {limitChars(name, 80)}
                </div>
              </td>
              <td className="col-span-1">{color}</td>
              <td className="col-span-1">{value}</td>
              <td className="col-span-1">{pickUpCost}</td>
            </tr>
          );
        })}
    </tbody>
  );
};

const Step4 = () => {
  return (
    <div className="flex flex-col gap-[30px]">
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

const SuccessImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="title-lg font-bold text-primary-900">
        IMPORTANT NOTICE:
      </span>
      <p className="title-lg text-gray-700">
        The cost paid here only covers shipping to the Port in Nigeria.
        Additional clearing cost has to be paid to get it out of the ports. You
        can call us on +234 700 700 6000{" "}
        <span className="title-lg">
          or +1 888 567 8765 to get a clearance estimate or{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
              send us a dm
              <ExportCircle color="#292D32" size={18} />
            </span>
          </a>
        </span>
      </p>
    </div>
  );
};

export default InitiateShipping;
