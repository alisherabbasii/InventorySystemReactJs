import { useEffect, useState } from "react";
import { addItem, deleteItem, getLastItem, updateItem } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import { OpenModal } from "../Generic/OpenModal";
import ItemList from "./ItemList";
import { ConfirmationDialog } from "../Generic/ConfirmationDialog";

export const Form = () => {
  const [formData, setFormData] = useState({
    itemNo: "",
    date: "",
    arabicDescription: "",
    englishDescription: "",
    basicUnit: "box",
    costPrice: "",
    retailPrice: "",
    wholesalePrice: 0,
    orderedQuantity: "",
    reservedQuantity: "",
    averageCost: 0,
  });
  const [itemNo, setItemNo] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  useEffect(() => {
    getItemNo();
  }, []);
  const getItemNo = async () => {
    try {
      const response = await getLastItem();
      if (response.data) {
        const newItemNo = response.data.itemNo
          ? String(Number(response.data.itemNo) + 1).padStart(5, "0")
          : "00001";
        setItemNo(newItemNo); // Set to state for display
      }
    } catch (error) {
      console.error("error in delete party:", error);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if(!isEditMode){
    try {
      const response = await addItem(formData);
      if (response.data) {
        toast.success("Item added successfully");
        clearFields();
        getItemNo();
      } else if (response.status == 400) {
        toast.info("please fill out all the fields");
      }
    } catch (error:any) {
      if(error?.response?.status==404){
        toast.info("please fill out all required fields");
      }
      console.error("error in adding party:", error);
      toast.error("Error adding item");
    }
  }
  };
  const clearFields = () => {
    setFormData({
      itemNo: "",
      date: "",
      arabicDescription: "",
      englishDescription: "",
      basicUnit: "box",
      costPrice: "",
      retailPrice: "",
      wholesalePrice: 0,
      orderedQuantity: "",
      reservedQuantity: "",
      averageCost: 0,
    });
    setItemId('');
  };

  function onHandleDelete() {
    setOpenDeleteModal(true);
  }

  const onHandleModify = async() => {
   
      //handle modify
      try {
        const response = await updateItem(formData,itemId);
        if (response.data) {
          toast.success("Item updated successfully");
          clearFields();
        } else if (response.status == 400) {
          toast.info("please fill out all the fields");
        }
      } catch (error) {
        console.error("error in update item:", error);
        toast.error("Error updating item");
      }

  }
  const onHandleEdit = (item: any) => {
    setItemId(item.id);
    setFormData(item);
  };

  const onDeleteRecord = async() =>{
    try {
      const response = await deleteItem(itemId);
      debugger;
      if (response.status==204) {
        toast.success("Data deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpenDeleteModal(false);
        clearFields();
      }
    } catch (error) {
      console.error("error in delete item:", error);
      toast.error("error in deleting item", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }



  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mt-6">
        <h2 className="text-xl font-semibold mb-6">Add Item</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Item No</label>
            <input
              type="text"
              name="itemNo"
              value={itemNo}
              disabled
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="YYYY-MM-DD"
              required
            />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Arabic Description </label>
            <input
              type="text"
              name="arabicDescription"
              value={formData.arabicDescription}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Enter Arabic Description"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">English Description *</label>
            <input
              type="text"
              name="englishDescription"
              value={formData.englishDescription}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Enter English Description"
              required
            />
          </div>
        </div>
        <div className="bg-blue-100 border border-zinc-300">
          <div className=" p-4 rounded-lg mb-6 mx-6">
            <h3 className="font-medium mb-4">Item Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Basic Unit *</label>
                {/* <input
                    type="text"
                    name="basicUnit"
                    value={formData.basicUnit}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                  /> */}
                <select
                  name="basicUnit"
                  value={formData.basicUnit}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full appearance-none bg-white"
                  required
                >
                  <option value="box">Box</option>
                  <option value="piece">Piece</option>
                  <option value="role">Role</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Cost Price *</label>
                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Cost Price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Retail Price *</label>
                <input
                  type="number"
                  name="retailPrice"
                  value={formData.retailPrice}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Retail Price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Wholesale Price</label>
                <input
                  type="number"
                  name="wholesalePrice"
                  value={formData.wholesalePrice}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Wholesale Price"
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg mb-6 mx-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Ordered Quantity</label>
                <input
                  type="number"
                  name="orderedQuantity"
                  value={formData.orderedQuantity}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Ordered Quantity"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Reserved Quantity</label>
                <input
                  type="number"
                  name="reservedQuantity"
                  value={formData.reservedQuantity}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Reserved Quantity"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Average Cost</label>
                <input
                  type="number"
                  name="averageCost"
                  value={formData.averageCost}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Average Cost"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className={
              isEditMode
                ? "text-black border border-blue-600 cursor-no-drop hover:bg-zinc-400 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center  me-2"
                : "text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            }
            disabled={isEditMode}
          >
            <img
              src="../../src/images/customersAndSuppliers/save.png"
              alt=""
              className="me-2 w-6 h-6"
            />
            Save
          </button>

          <button
            onClick={() => {
              onHandleModify();
            }}
            type="button"
            className={
              !isEditMode
                ? "text-black border border-blue-600 cursor-no-drop hover:bg-zinc-400 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center  me-2"
                : "text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            }
            disabled={!isEditMode}
          >
            <img
              src="../../src/images/customersAndSuppliers/modify.png"
              alt=""
              className="me-2 w-6 h-6"
            />
            Modify
          </button>

          <button
            onClick={() => {
              onHandleDelete();
            }}
            type="button"
            className={
              !isEditMode
                ? "text-black border border-blue-600 cursor-no-drop hover:bg-zinc-400 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center  me-2"
                : "text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
            }
            disabled={!isEditMode}
          >
            <img
              src="../../src/images/customersAndSuppliers/delete.png"
              alt=""
              className="me-2 w-6 h-6"
            />
            Cancel
          </button>

          <button
            onClick={() => {
              setOpenViewModal(true);
              clearFields();
              setIsEditMode(false);
            }}
            type="button"
            className="text-black border border-blue-600 hover:bg-sky-400 hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1.5 text-center  inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 "
          >
            <img
              src="../../src/images/customersAndSuppliers/view.png"
              alt=""
              className="me-2 w-6 h-6"
            />
            View
          </button>
        </div>
      </form>

      {openDeleteModal && (
        <ConfirmationDialog
          title={"Confirmation"}
          message={"Are you sure you want to delete an item?"}
          confirmText={"Yes"}
          closeDialog={() => {
            setOpenDeleteModal(false);
          }}
          handleConfirm={() => { onDeleteRecord()}}
        />
      )}
      

      {openViewModal && (
        <OpenModal
          handleClose={() => {
            setOpenViewModal(false);
          }}
          title=""
          modalWithinModal={true}
        >
          <ItemList
            onEdit={(item: any) => {
              onHandleEdit(item);
              setIsEditMode(true);
              setOpenViewModal(false);
            }}
          />
        </OpenModal>
      )}
    </div>
  );
};
