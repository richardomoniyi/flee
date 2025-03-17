import React, { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { saveDriver } from "./DriverData";
import { fetchDriver,Driver} from "./DriverData";

interface AddDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editFlag:boolean;
}

const AddDriver: React.FC<AddDataProps> = ({ slug, isOpen, setIsOpen,editFlag}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);

  // add driver
  const [formDriverIsEmpty, setFormDriverIsEmpty] = React.useState(true);
  const [formData, setFormData] = React.useState<Driver | null>(null);
  
 
  React.useEffect(() => {
    if (editFlag)
    {
    const getDriverData = async () => {
      try {
        const driver = await fetchDriver(1);
        setFormData(driver);
      } catch (error) {
        console.log(error)
        //setError("Failed to load data");
      }
    
    };
    getDriverData();
  }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const driver = JSON.stringify(formData);
    console.log(driver);
    saveDriver(driver);
    toast("Driver Saved!", { icon: "😛" });
    setShowModal(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const isFormValid = formData?.firstname && formData?.lastname && formData?.email && formData.phone && formData.nextKinFullname && formData.nextKinAddress  && formData.nextKinPhone;
  setFormDriverIsEmpty(!isFormValid);

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
              value={formData?.firstname} onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
              name="lastname"
              id="lastname"
              value={formData?.lastname} onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
              id="email"
              value={formData?.email} onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone"
              className="input input-bordered w-full"
              name="phone"
              id="phone"
              value={formData?.phone} onChange={handleChange}
            />
            <textarea
              placeholder="Address"
              className="input input-bordered w-full"
              name="address"
              id="address"
              value={formData?.address}
            />
            <div>
              <span className="text-xl font-bold">Next of Kin</span>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                name="nextkinname"
                id="nextkinname"
                value={formData?.nextKinFullname} onChange={handleChange}
              />
              <textarea
                placeholder="Address"
                className="input input-bordered w-full"
                name="nextkinaddress"
                id="nextkinaddress"
                value={formData?.nextKinAddress}
              />
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full"
                name="nextkinphne"
                id="nextkinphne"
                value={formData?.nextKinPhone} onChange={handleChange}
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
