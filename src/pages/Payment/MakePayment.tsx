import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { fetchOrder, savePayment } from "./PaymentData";
import {formatCurrency, getUserProfile} from "../../commons/Utility";

interface AddDataProps {
  id: string;
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag: boolean;
}

const AddDispatch: React.FC<AddDataProps> = ({
  id,
  slug,
  isOpen,
  setIsOpen,
  editFlag,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  // add driver
  const [orderId, setOrderId] = React.useState("");;
  const [, setPayAmount] = React.useState(0);
  const [paid, setPaid] = React.useState("0");
  const [pickupName, setPickupName] = React.useState("");
  const [dropoffName, setDropoffName] = React.useState("");
  const [amount, setAmount] = React.useState("0");
  const [orderDate, setOrderDate] = React.useState("");
  const[customerId, setCustomerId] = React.useState("");
  const [paymentDate, setPaymentDate] = React.useState<Dayjs | null>(dayjs());
  const [formDriverIsEmpty, setFormDriverIsEmpty] = React.useState(true);
  const [,setPostedBy] = React.useState(-1);

  const getOrderData = async () => {
    try {
      //const dispatch = await fetchDispatch(id);
      //console.log(dispatch);
      const order = await fetchOrder(id);
      console.log("getOrderData", order);
      setPickupName(order.pickupName);
      setCustomerId(order.customerId);
      setDropoffName(order.dropoffName);
      setAmount("" + order.amount);
      setPayAmount(order.amount);
      setOrderId(order.orderId);
      setOrderDate(order.orderDate);
      setPaid(order.paid);
      setPostedBy(order.postedBy)

      //const driver = await fetchDriver("" + order.driverId);
      //setDriverName(driver.firstname + " " + driver.lastname);
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
    setPostedBy(parseInt(getUserProfile()?.user || "-1"));
    const formData = {
      orderId: id,
      paymentDate,
      customerId,
      amount,
      postedBy:1,
    };
    const pay = JSON.stringify(formData);
    console.log(pay);
    //setPaymentDate(dipatch);
    
    
    const resp = savePayment(pay);
    console.log("Resp:",resp);
    toast("Payment Made!", { icon: "😛" });
    setShowModal(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (amount === "" ||
     amount === "0" ||
    paid === "1")
    {
      setFormDriverIsEmpty(true);
    }
    if (amount !== "" &&
      amount !== "0" &&
      paid !== "1"
    ) {
      setFormDriverIsEmpty(false);
    }
  }, [orderId, amount, customerId, paymentDate]);
  console.log("payment", slug);
  if (slug === "payment") {
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
            <span className="text-2xl font-bold">Order Payment</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <div className="label">
              <b>Order Date:</b>
              {orderId}
            </div>
            <div className="label">
              <b>Order Date:</b>
              {orderDate}
            </div>
            <div className="label">
              <b>PickUp Name:</b>
              {pickupName}
            </div>
            <div className="label">
              <b>DropOff Name:</b>
              {dropoffName}
            </div>
            <div>
              <div className="label">
                <b>Date:</b>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={paymentDate}
                    onChange={(paymentDateDate) => setPaymentDate(paymentDateDate)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="label">
              <b>Cost:</b>
              <span>
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="label">
              <b>Paid:</b>
              <span>
                {paid === '1' ? "Yes":"No"}
              </span>
            </div>
          
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

export default AddDispatch;
