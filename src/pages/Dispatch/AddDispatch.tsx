import React, { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { saveDispatch } from "./DispatchData";
import { fetchDriver,fetchDispatch, Dispatch } from "./DispatchData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AutoTextBox from "../../components/AutoTextBox";
import { searchDriverUrl,fetchOrder } from "./DispatchData";
import { Option } from "../../components/AutoTextBox";

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
  const [orderId, setOrderId] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [statusId, setStatusId] = React.useState(0);
  const [driverName, setDriverName] = React.useState("");

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
    const [amount, setAmount] = React.useState("0");
    const [carrierId, setCarrierId] = React.useState("1");
    const [carrierRate, setCarrierRate] = React.useState("0");
    const [discount, setDiscount] = React.useState("");
    const [orderItem, setOrderItem] = React.useState("");
    const [orderDate, setOrderDate] = React.useState("");
    const [formOrderIsEmpty, setFormOrderIsEmpty] = React.useState(true);
    const [pickupCity, setPickupCity] = React.useState("");
    const [pickupState, setPickupState] = React.useState("");
    const [pickupCountry, setPickupCountry] = React.useState("");
    const [dropoffCity, setDropoffCity] = React.useState("");
    const [dropoffState, setDropoffState] = React.useState("");
    const [dropoffCountry, setDropoffCountry] = React.useState("");


  const [dispatchDate, setDispatchDate] = React.useState<Dayjs | null>(dayjs());
  const [formDriverIsEmpty, setFormDriverIsEmpty] = React.useState(true);

  const getOrderData = async () => {
    try {
      //const dispatch = await fetchDispatch(id);
      //console.log(dispatch);
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
           setOrderDate(order.orderDate);

           const driver = await fetchDriver(""+order.driverId);
           setDriverName(driver.firstname+' '+driver.lastname)

    } catch (error) {
      console.log(error);
      //setError("Failed to load data");
    }
    
    
  };

  React.useEffect(() => {
    if (editFlag) {
      getOrderData();
    }
  }, []);

  const formatDateISO = (): string => {
    return new Date().toISOString(); // Outputs: "2025-02-23T23:59:59.123Z"
  };
  const handleSenderNameSelect = (selectedOption: Option) => {
    //console.log("Selected option:", selectedOption.name);
    setDriverName(selectedOption.name);
    setDriverId(selectedOption.id);
    // You can handle the selected option further here, such as storing it in state, etc.
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      orderId:id,
      dispatchDate,
      statusId,
      driverId,
    };
    const dipatch = JSON.stringify(formData);
    //console.log(driver);
    saveDispatch(dipatch);
    toast("Dispatch Completed!", { icon: "😛" });
    setShowModal(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (driverId === "") {
      setFormDriverIsEmpty(true);
    }
    if (driverId !== "") {
      setFormDriverIsEmpty(false);
    }
  }, [orderId,statusId, driverId, dispatchDate]);
  console.log("dispatch", slug);
  if (slug === "dispatch") {
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
            <span className="text-2xl font-bold">Dispatch New Order</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <div>
              <div className="label">
              <b>Dispatch Date:</b>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dispatchDate}
                    onChange={(dispatchDate) => setDispatchDate(dispatchDate)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="label"><b>Order Date:</b>{orderDate}</div>
            <div className="label"><b>PickUp Name:</b>{pickupName}</div>
            <div className="label"><b>PickUp Street:</b>{pickupStreet}</div>
            <div className="label"><b>PickUp City:</b>{pickupCity}</div>
            <div className="label"><b>PickUp State:</b>{pickupState}</div>
            <div className="label"><b>PickUp Country:</b>{pickupCountry}</div>
            <div className="label"><b>DropOff Name:</b>{dropoffName}</div>
            <div className="label"><b>DropOff Street:</b>{dropoffStreet}</div>
            <div className="label"><b>DropOff City:</b>{dropoffCity}</div>
            <div className="label"><b>DropOff State:</b>{dropoffState}</div>
            <div className="label"><b>DropOff Country:</b>{dropoffCountry}</div>
            <div className="label"><b>Assigned Driver:</b>{driverName == "" ? "None":driverName}</div>
            <AutoTextBox
              value={driverId}
              apiUrl={searchDriverUrl} // Replace with your actual API URL
              placeholder={driverId === "" ? "Search for a Driver" : driverId}
              onSelect={handleSenderNameSelect} // Pass external event handler
            />
            <button
              className={`mt-5 btn ${
                formDriverIsEmpty ? "btn-disabled" : "btn-primary"
              } btn-block col-span-full font-semibold`}
            >
              Assign
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default AddDispatch;
