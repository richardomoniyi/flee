import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { saveOrder } from "./OrderData";
import { fetchOrder } from "./OrderData";
import { searchCustomerUrl } from "./OrderData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AutoTextBox from "../../components/AutoTextBox";
import { Option } from "../../components/AutoTextBox";
import CityDropDown from "./CityDropDown";
import StateDropDown from "./StateDropDown";
//import {formatCurrency, removeFormatting} from "../../commons/Utility";

interface AddDataProps {
  id: string;
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag: boolean;
}

const AddOrder: React.FC<AddDataProps> = ({
  id,
  slug,
  isOpen,
  setIsOpen,
  editFlag,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  const [pickupName, setPickupName] = React.useState("");
  const [pickupStreet, setPickupStreet] = React.useState("");
  const [pickupPhone, setPickupPhone] = React.useState("");
  const [pickupDate, setPickupDate] = React.useState<Dayjs | null>(dayjs());
  const [dropoffName, setDropoffName] = React.useState("");
  const [dropoffStreet, setDropoffStreet] = React.useState("");
  const [dropoffPhone, setDropoffPhone] = React.useState("");
  const [dropoffDate, setDropoffDate] = React.useState<Dayjs | null>(dayjs());
  const [instruction, setInstruction] = React.useState("OK");
  const [customerId, setCustomer] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [carrierId, setCarrierId] = React.useState("1");
  const [carrierRate, setCarrierRate] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [orderItem, setOrderItem] = React.useState("");
  const [orderDate, setOrderDate] = React.useState<Dayjs | null>(dayjs());
  const [formOrderIsEmpty, setFormOrderIsEmpty] = React.useState(true);
  //const [formData2, setFormData2] = React.useState<Order | null>(null);
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupCountry, setPickupCountry] = useState("");
  const [dropoffCity, setDropoffCity] = useState("");
  const [dropoffState, setDropoffState] = useState("");
  const [dropoffCountry, setDropoffCountry] = useState("");
  const [paid] = useState("0");

  const getOrderData = async () => {
    try {
      const order = await fetchOrder(id);
      console.log("getOrderData", order);
      setPickupName(order.pickupName);
      setPickupStreet(order.pickupStreet);
      setPickupCity(order.pickupCity);
      setPickupState(order.pickupState);
      setPickupCountry(order.pickupCountry);
      setPickupPhone(order.pickupPhone);
      setPickupDate(dayjs(order.pickupDate));
      setDropoffName(order.dropoffName);
      setDropoffStreet(order.dropoffStreet);
      setDropoffCity(order.dropoffCity);
      setDropoffCountry(order.dropoffCountry);
      setDropoffState(order.dropoffState);
      setDropoffDate(dayjs(order.dropoffDate));
      setDropoffPhone(order.dropoffPhone);
      setInstruction(order.instruction);
      setCustomer(order.customerId);
      setAmount(""+order.amount);
      setDiscount("" + order.discount);
      setCarrierId(""+order.carrierId.id);
      setCarrierRate("" + order.carrierRate);
      setOrderId(order.orderId);
      setOrderItem(order.orderItem);
      setOrderDate(dayjs(order.orderDate));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (editFlag) {
      getOrderData();
    }
  }, []);

  const handlePickUpStateChange = (selectedState: string) => {
    //setFormData((prev) => ({ ...prev, state: selectedState, city: "" })); // Reset city on state change
    setPickupState(selectedState);
  };

  const handlePickUpCityChange = (selectedCity: string) => {
    //setFormData((prev) => ({ ...prev, city: selectedCity }));
    setPickupCity(selectedCity);
  };
  const handleSenderNameSelect = (selectedOption: Option) => {
    //console.log("Selected option:", selectedOption.name);
    setPickupName(selectedOption.name);
    setCustomer(selectedOption.id);
    // You can handle the selected option further here, such as storing it in state, etc.
  };
  function handleDropOffStateChange(state: string): void {
    setDropoffState(state);
  }
  function handleDropOffCityChange(city: string): void {
    setDropoffCity(city);
  }

  const formatDateISO = (): string => {
    return new Date().toISOString(); // Outputs: "2025-02-23T23:59:59.123Z"
  };
  //const selectUrl = "https://jsonplaceholder.typicode.com/users";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      pickupName,
      pickupStreet,
      pickupCity,
      pickupState,
      pickupCountry,
      pickupPhone,
      pickupDate,
      dropoffName,
      dropoffStreet,
      dropoffCity,
      dropoffState,
      dropoffCountry,
      dropoffPhone,
      dropoffDate,
      instruction,
      customerId,
      amount,//:removeFormatting(discount),
      carrierId,
      carrierRate,//:removeFormatting(discount),
      discount,//:removeFormatting(discount),
      orderId,
      orderItem,
      orderDate: formatDateISO(),
      paid
    };
    const order = JSON.stringify(formData);
    //console.log(order);
    const result =  saveOrder(order);
    const jsonResult = JSON.parse(JSON.stringify(result));
    toast("Order Saved!", { icon: "😛" });
    //toast("Order Saved! "+jsonResult.message);
    setShowModal(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      pickupName === "" ||
      pickupStreet === "" ||
      pickupCity === "" ||
      pickupState === "" ||
      pickupCountry === "" ||
      pickupPhone === "" ||
      pickupDate === null ||
      dropoffName === "" ||
      dropoffStreet === "" ||
      dropoffCity === "" ||
      dropoffState === "" ||
      dropoffCountry === "" ||
      dropoffPhone === "" ||
      dropoffDate === null ||
      instruction === "" ||
      //customerId === "" ||
      amount === "" ||
      carrierId === "" ||
      //carrierRate === "" ||
      //discount === "" ||
      //orderId === "" ||
      orderItem === "" ||
      orderDate === null
    ) {
      setFormOrderIsEmpty(true);
    }
    if (
      pickupName !== "" &&
      pickupStreet !== "" &&
      pickupCity !== "" &&
      pickupState !== "" &&
      pickupCountry !== "" &&
      pickupPhone !== "" &&
      pickupDate !== null &&
      dropoffName !== "" &&
      dropoffStreet !== "" &&
      dropoffState !== "" &&
      dropoffCountry !== "" &&
      dropoffPhone !== "" &&
      dropoffDate !== null &&
      //instruction !== "" &&
      //customerId !== "" &&
      amount !== "" &&
      carrierId !== "" &&
      //carrierRate !== "" &&
      //discount !== "" &&
      //orderId !== "" &&
      orderItem !== "" &&
      orderDate !== null
    ) {
      setFormOrderIsEmpty(false);
    }
  }, [
    pickupName,
    pickupStreet,
    pickupCity,
    pickupState,
    pickupCountry,
    pickupPhone,
    pickupDate,
    dropoffName,
    dropoffStreet,
    dropoffCity,
    dropoffState,
    dropoffCountry,
    dropoffPhone,
    dropoffDate,
    instruction,
    customerId,
    amount,
    carrierId,
    carrierRate,
    discount,
    orderId,
    orderItem,
    orderDate,
  ]);
  console.log("Order ID",orderId);
  console.log("PickupCity:",pickupCity);
  console.log("PickupStreet:",pickupStreet);
  console.log("PickupState:",pickupState);
  console.log("PickupCountry:",pickupCountry);
  console.log("DropOffCity:",dropoffCity);
  console.log("DropOffStreet:",dropoffStreet);
  console.log("DropOffState:",dropoffState);
  console.log("DropOffCountry:",dropoffCountry);

  //console.log("Carrier", carrierId);
  //<SearchDropdown apiUrl={selectUrl} label="Search for a user" onSelect={handleSelection} />
  if (slug === "order") {
    //console.log("form status", formOrderIsEmpty);
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]" >
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`} style={{ maxHeight: `80vh`, overflowY: `auto`} }
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
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Generated Order ID"
              className="input input-bordered w-full"
              name="orderId"
              id="orderId"
              disabled
              value={orderId}
              onChange={(element) => setOrderId(element.target.value)}
            />
            <input
              type="text"
              placeholder="Order Description"
              className="input input-bordered w-full"
              name="orderItem"
              id="orderItem"
              value={orderItem}
              onChange={(element) => setOrderItem(element.target.value)}
            />
            <AutoTextBox
              value={pickupName}
              apiUrl={searchCustomerUrl} // Replace with your actual API URL
              placeholder={
                pickupName.trim() === "" ? "Sender Name" : pickupName
              }
              onSelect={handleSenderNameSelect} // Pass external event handler
            />
            <input
              type="text"
              placeholder="Sender Phone"
              className="input input-bordered w-full"
              name="pickupPhone"
              id="pickupPhone"
              value={pickupPhone}
              onChange={(element) => setPickupPhone(element.target.value)}
            />
            <textarea
              placeholder="Sender Address"
              className="input input-bordered w-full"
              name="pickupStreet"
              id="pickupStreet"
              value={pickupStreet}
              onChange={(element) => setPickupStreet(element.target.value)}
            />
            <label className="form-control w-full">
              <select
                id="pickupCountry"
                name="pickupCountry"
                value={pickupCountry}
                onChange={(e) => setPickupCountry(e.target.value)}
                className="border p-2 rounded"
              >
                <option disabled selected value="">
                  -- Country --
                </option>
                <option value="Nigeria">Nigeria</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </label>
            <StateDropDown
              country={pickupCountry}
              name="pickupState"
              value={pickupState}
              onChange={handlePickUpStateChange}
            />
            {pickupState && (
              <CityDropDown
                name="pickupCity"
                selectedState={pickupState}
                onChange={handlePickUpCityChange}
                value={pickupCity}
              />
            )}
            <div>
              <div className="label">
                PickUp Date:
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={pickupDate}
                    onChange={(pickupDate) => setPickupDate(pickupDate)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <input
              type="text"
              placeholder="Receiver Name"
              className="input input-bordered w-full"
              name="receivername"
              id="receivername"
              value={dropoffName}
              onChange={(element) => setDropoffName(element.target.value)}
            />
            <input
              type="text"
              placeholder="Receiver Phone"
              className="input input-bordered w-full"
              name="dropoffPhone"
              id="dropoffPhone"
              value={dropoffPhone}
              onChange={(element) => setDropoffPhone(element.target.value)}
            />
            <textarea
              placeholder="Receiver Address"
              className="input input-bordered w-full"
              name="dropoffAddress"
              id="dropoffAddress"
              value={dropoffStreet}
              onChange={(element) => setDropoffStreet(element.target.value)}
            />

            <label className="form-control w-full">
              <select
                id="dropoffCountry"
                name="dropoffCountry"
                value={dropoffCountry}
                onChange={(e) => setDropoffCountry(e.target.value)}
                className="border p-2 rounded"
              >
                <option disabled selected value="">
                  -- Destination --
                </option>
                <option value="Nigeria">Nigeria</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </label>
            <StateDropDown
             country={dropoffCountry}
              name="dropoffState"
              value={dropoffState}
              onChange={handleDropOffStateChange}
            />
            {dropoffState && (
              <CityDropDown
                name="dropoffCity"
                selectedState={dropoffState}
                onChange={handleDropOffCityChange}
                value={dropoffCity}
              />
            )}
            <div>
              <div className="label">
                DropOff Date:
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dropoffDate}
                    onChange={(dropoffDate) => setDropoffDate(dropoffDate)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <textarea
              placeholder="Delivery instruction"
              className="input input-bordered w-full"
              name="instruction"
              id="instruction"
              value={instruction}
              onChange={(element) => setInstruction(element.target.value)}
            />
            <div>
              <div className="label">
                Order Date:
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={orderDate}
                    onChange={(orderdate) => setOrderDate(orderdate)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <label className="form-control w-full">
              <select
                value={carrierId}
                className="select select-bordered"
                name="carrierId"
                id="carrierId"
                onChange={(element) => setCarrierId(element.target.value)}
              >
                <option disabled selected>
                  -- Carrier --
                </option>
                <option value="1">OWNL</option>
                <option value="2">DHL</option>
                <option value="3">PARK</option>
                <option value="4">TERMINAL AFRICA</option>
                <option value="5">PARK</option>
                <option value="6">OTHERS</option>
              </select>
            </label>
            <label className="form-control w-full">
              <select
                value={discount}
                className="select select-bordered"
                name="discount"
                id="discount"
                onChange={(element) => setDiscount(element.target.value)}
              >
                <option disabled selected>
                  -- Discount--
                </option>
                <option value="0">Basic</option>
                <option value="1">Standard</option>
              </select>
            </label>
            <input
              type="text"
              placeholder="Carrier Rate"
              className="input input-bordered w-full"
              name="carrierRate"
              id="carrierRate"
              value={carrierRate}
              onChange={(element) => setCarrierRate(element.target.value)}
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
                formOrderIsEmpty ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

export default AddOrder;
