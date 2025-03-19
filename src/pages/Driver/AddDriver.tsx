import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { saveDriver } from "./DriverData";
import { fetchDriver } from "./DriverData";

interface AddDataProps {
  id:string;
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag:boolean;
}

const AddDriver: React.FC<AddDataProps> = ({id, slug, isOpen, setIsOpen,editFlag}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);

 
  // add driver
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [nextFullname, setNextFullname] = React.useState("");
  const [nextPhone, setNextPhone] = React.useState("");
  const [nextAddress, setNextAddress] = React.useState("");
  const [formDriverIsEmpty, setFormDriverIsEmpty] = React.useState(true);
   
  const getDriverData = async () => {
    try {
      const driver = await fetchDriver(id);
      console.log(driver);
      //setFormData(driver);
      setFirstName(driver.firstname);
      setLastName(driver.lastname);
      setAddress(driver.address);
      setEmail(driver.email);
      setPhone(driver.phone);
      setNextFullname(driver.nextFullname);
      setNextAddress(driver.nextAddress);
      setNextPhone(driver.nextPhone);
    } catch (error) {
      console.log(error)
      //setError("Failed to load data");
    }
  };
 
  React.useEffect(() => {
    if (editFlag){
      getDriverData();
    }else{
      setFirstName("");
      setLastName("");
      setAddress("");
      setEmail("");
      setPhone("");
      setNextFullname("");
      setNextAddress("");
      setNextPhone("");
    }

  }, []);

  const formatDateISO = (): string => {
    return new Date().toISOString(); // Outputs: "2025-02-23T23:59:59.123Z"
};
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      phone,
      address,
      nextFullname,
      nextAddress,
      nextPhone,
      created:formatDateISO()
    };
    const driver = JSON.stringify(formData);
    //console.log(driver);
    saveDriver(driver);
    toast("Driver Saved!", { icon: "😛" });
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
      address === "" ||
      nextFullname === "" ||
      nextPhone === "" ||
      nextAddress === ""
    ) {
      setFormDriverIsEmpty(true);
    }
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      phone !== "" &&
      address !== "" &&
      nextFullname !== "" &&
      nextPhone !== "" &&
      nextAddress !== ""
    ) {
      setFormDriverIsEmpty(false);
    }
  }, [
    firstname,
    lastname,
    email,
    phone,
    address,
    nextFullname,
    nextPhone,
    nextAddress,
  ]);


  if (slug === "driver") {
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
              placeholder="Phone"
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
            <div>
              <span className="text-xl font-bold">Next of Kin</span>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                name="nextkinname"
                id="nextkinname"
                value={nextFullname}
                onChange={(element) => setNextFullname(element.target.value)}
              />
              <textarea
                placeholder="Address"
                className="input input-bordered w-full"
                name="nextkinaddress"
                id="nextkinaddress"
                value={nextAddress}
                onChange={(element) => setNextAddress(element.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full"
                name="nextkinphone"
                id="nextkinphone"
                value={nextPhone}
                onChange={(element) => setNextPhone(element.target.value)}
              />
            </div>
            <button
              className={`mt-5 btn ${
                formDriverIsEmpty ? "btn-disabled" : "btn-primary"
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

export default AddDriver;
