import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { Answer, saveCustomer } from "./CustomerData";
import { fetchCustomer } from "./CustomerData";
import {formatToNaira} from "../../commons/Utility";

interface AddDataProps {
  id: string;
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag: boolean;
}

const AddCustomer: React.FC<AddDataProps> = ({
  id,
  slug,
  isOpen,
  setIsOpen,
  editFlag,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);

  // add driver
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [category, setCategory] = React.useState("0");
  const [discountId, setDiscountId] = React.useState("0");
  const [balance, setBalance] = React.useState(0);
  const [formCustomerIsEmpty, setFormCustomerIsEmpty] = React.useState(true);
  
  
  const getCustomerData = async () => {
    try {
      const customer = await fetchCustomer(id);
      console.log(customer);
      setFirstName(customer.firstname);
      setLastName(customer.lastname);
      setBusinessName(customer.businessName);
      setAddress(customer.address);
      setEmail(customer.email);
      setPhone(customer.phone);
      setCategory(customer.category);
      setDiscountId(customer.discountId);
      setBalance(customer.balance);
    } catch (error) {
      console.log(error);
      //setError("Failed to load data");
    }
  };

  React.useEffect(() => {
    if (editFlag) {
      getCustomerData();
    }
  }, []);

  const formatDateISO = (): string => {
    return new Date().toISOString(); // Outputs: "2025-02-23T23:59:59.123Z"
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      phone,
      address,
      businessName,
      category,
      discountId,
      balance,
      created: formatDateISO(),
    };
    const customer = JSON.stringify(formData);
    //console.log(driver);
    const result =  await saveCustomer(customer) as Answer;
    toast(result.message, { icon: "😛" });
    setShowModal(false);
    setIsOpen(false);
  };
 

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      phone === "" ||
      phone.length !== 13 ||
      address === "" ||
      businessName === "" ||
      category === "0" ||
      discountId === "0"
    ) {
      setFormCustomerIsEmpty(true);
    }
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      phone !== "" &&
      phone.length === 13 &&
      address !== "" &&
      businessName !== "" &&
      category !== "0" &&
      discountId !== "0"
    ) {
      setFormCustomerIsEmpty(false);
    }
  }, [
    firstname,
    lastname,
    email,
    phone,
    address,
    businessName,
    category,
    discountId,
  ]);

  if (slug === "customer") {
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
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Business Name"
              className="input input-bordered w-full"
              name="businessname"
              id="businessname"
              value={businessName}
              onChange={(element) => setBusinessName(element.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={(element) => setFirstName(element.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={(element) => setLastName(element.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
              id="email"
              value={email}
              onChange={(element) => setEmail(element.target.value)}
            />
            <input
              type="text"
              placeholder="Phone e.g 2348030000000"
              className="input input-bordered w-full"
              name="phone"
              id="phone"
              value={phone}
              onChange={(element) => setPhone(element.target.value)}
            />
            <textarea
              placeholder="Address"
              className="input input-bordered w-full"
              name="address"
              id="address"
              value={address}
              onChange={(element) => setAddress(element.target.value)}
            />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                className="select select-bordered"
                name="category"
                id="category"
                value={category}
                onChange={(element) => setCategory(element.target.value)}
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="0">Default</option>
                <option value="1">Basic</option>
                <option value="2">HighNet</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Discount Level</span>
              </div>
              <select
                className="select select-bordered"
                name="discount"
                id="discount"
                value={discountId}
                onChange={(element) => setDiscountId(element.target.value)}
              >
                <option disabled selected>
                  Select one
                </option>
                <option value="1">Default</option>
                <option value="2">Standard</option>
                <option value="3">Specialized</option>
              </select>
            </label>
            <label className="form-control w-full">
              Balance: 
            <span style={{ color: balance < 0 ? "red" : "green", fontWeight: "bold" }}>
                  {formatToNaira(balance)}
                </span>
            </label>
            <button
              className={`mt-5 btn ${
                formCustomerIsEmpty ? "btn-disabled" : "btn-primary"
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

export default AddCustomer;
