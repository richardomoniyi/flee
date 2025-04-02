import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { fetchOrder, savePayment } from "./PaymentData";
import { getUserProfile } from "../../commons/Utility";
import AutoTextBox from "../../components/AutoTextBox";
import { searchCustomerUrl } from "../Order/OrderData";
import { Option } from "../../components/AutoTextBox";

interface AddDataProps {
  id: string;
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag: boolean;
}

const SimplePay: React.FC<AddDataProps> = ({
  id,
  slug,
  isOpen,
  setIsOpen,
  editFlag,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  // add driver
  const [orderId, setOrderId] = React.useState("");
  const [paid, setPaid] = React.useState("0");
  const [amount, setAmount] = React.useState("");
  const [, setOrderDate] = React.useState("");
  const [customerId, setCustomerId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [paymentDate, setPaymentDate] = React.useState<Dayjs | null>(dayjs());
  const [formDriverIsEmpty, setFormDriverIsEmpty] = React.useState(true);
  const [, setPostedBy] = React.useState(-1);

  const getOrderData = async () => {
    try {
      const order = await fetchOrder(id);
      console.log("getOrderData", order);
      setCustomerId(order.customerId);
      setAmount("" + order.amount);
      setOrderId("000-000-000-000");
      setOrderDate(order.orderDate);
      setPaid(order.paid);
      setPostedBy(order.postedBy);
    } catch (error) {
      console.log(error);
      //setError("Failed to load data");
    }
  };

  React.useEffect(() => {
    if (editFlag) {
      getOrderData();
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postedBy = parseInt(getUserProfile()?.user || "-1");
    const formData = {
      orderId: 1,
      paymentDate,
      customerId,
      amount,
      postedBy
    };
    const pay = JSON.stringify(formData);
    console.log(pay);
    //setPaymentDate(dipatch);

    const resp = savePayment(pay);
    console.log("Resp:", resp);
    toast("Payment Made!", { icon: "😛" });
    setShowModal(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (amount === "" || amount === "0" || paid === "1") {
      setFormDriverIsEmpty(true);
    }
    if (amount !== "" && amount !== "0" && paid !== "1") {
      setFormDriverIsEmpty(false);
    }
  }, [orderId, amount, customerId, paymentDate]);
  console.log("payment", slug);
  if (slug === "payment") {

    const handleCustomerSelect = (selectedOption: Option) => {
      console.log("customer:",selectedOption.name);
      setCustomerId(selectedOption.id);
      setPostedBy(parseInt(getUserProfile()?.user || "-1"));
    };

    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Payment</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
           
            <AutoTextBox
              value={customerId}
              apiUrl={searchCustomerUrl} // Replace with your actual API URL
              placeholder="Customer Name"
              onSelect={handleCustomerSelect} // Pass external event handler
            />
            <div>
              <div className="label">
                <b>Date:</b>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={paymentDate}
                    onChange={(paymentDateDate) =>
                      setPaymentDate(paymentDateDate)
                    }
                  />
                </LocalizationProvider>
              </div>
            </div>
            <input
              type="text"
              placeholder="description"
              className="input input-bordered w-full"
              name="description"
              id="description"
              value={description}
              onChange={(element) => setDescription(element.target.value)}
            />
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full"
              name="amount"
              id="amount"
              value={amount}
              onChange={(element) => setAmount(element.target.value)}
            />
            <button
              className={`mt-5 btn ${
                formDriverIsEmpty ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default SimplePay;
