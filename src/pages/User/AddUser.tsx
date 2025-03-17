import React, { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { saveUser } from "./UserData";
import { fetchUser, User } from "./UserData";

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
  const [enabled, setEnabled] = React.useState(true);
  const [category, setCategory] = React.useState(0);
  const [verify, setVerify] = React.useState(false);
  const [formCustomerIsEmpty, setFormCustomerIsEmpty] = React.useState(true);
  const [formData2, setFormData2] = React.useState<User | null>(null);
  const [message,setMessage] = React.useState("");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const getCustomerData = async () => {
    try {
      const user = await fetchUser(id);
      console.log(user);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
      setPhone(user.phone);
      setEnabled(user.enabled);
      setCategory(user.category);
      setVerify(user.verify)
    } catch (error) {
      console.log(error);
      //setError("Failed to load data");
    }
  };

  React.useEffect(() => {
    if (editFlag) {
      getCustomerData();
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setEnabled(false);
      setCategory(0)
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData2) {
      setFormData2({ ...formData2, [e.target.name]: e.target.value });
    }
  };
  function formatDateToUTC(): string {
    const now = new Date();
    
    // Get the date in ISO format (YYYY-MM-DDTHH:mm:ssZ)
    const isoString = now.toISOString(); // Example: 2025-02-28T12:44:39.123Z

    // Remove milliseconds and append [UTC]
    //return `${isoString.replace(/\.\d{3}Z/, 'Z')}[UTC]`;
    return `${isoString.replace(/\.\d{3}Z/, 'Z')}`;
}
  function handleEnabledChange(event: ChangeEvent<HTMLInputElement>): void {
    console.log("handleEnabledChange::",event);
    setEnabled(!enabled);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      secret:"0000000",
      email,
      phone,
      enabled,
      category,
      verify,
      logindate: formatDateToUTC(),
      created: formatDateToUTC(),
    };
    const user = JSON.stringify(formData);
    //console.log("JSON::",user);
    if (!emailPattern.test(email)) 
    {
      setMessage("Invalid email format");
      return;
    }
    saveUser(user);
    toast("User Saved!", { icon: "😛" });
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
      phone === ""
      //enabled === false
      //role === "0"
    ) {
      setFormCustomerIsEmpty(true);
    }
    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      phone !== "" 
      //enabled !== false
      //role === ""
      //!emailPattern.test(email)
    ) {
      setFormCustomerIsEmpty(false);
    }
  }, [firstname, lastname, email, phone, category,enabled]);

  if (slug === "user") {
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
          <div>
          {message.trim() &&  (
                <p style={{ color: "red" }}>{message}</p>
              )}
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
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Role</span>
              </div>
              <select 
                value = {category}
                className="select select-bordered"
                name="category"
                id="category"
                onChange={(element) => setCategory(parseInt(element.target.value))}
              >
                <option disabled selected>
                  Select Role
                </option>
                <option value="0">Support</option>
                <option value="1">Authoriser</option>
                <option value="2">Finance</option>
                <option value="3">Administrator</option>
              </select>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={handleEnabledChange}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-lg">
                {enabled ? "Enabled" : "Disabled"}
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
