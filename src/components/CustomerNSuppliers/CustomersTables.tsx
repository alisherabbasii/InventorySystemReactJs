import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/auth";
import { formatDate } from "../Generic/FormatDate";

const CustomersTable = (props: any) => {
  const {onlyShowSuppliers,onlyShowVendors} = props;
  const [customers, setCustomers] = useState([]);
  const [customerNo, setCustomerNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.data) {
        //type (supplier,vendor)
        console.log("users areee:::::",response.data);
        if(onlyShowSuppliers){ 
          const filteredUsers = response.data.filter((user: any) => user.type === "supplier");
          setCustomers(filteredUsers);
          setAllCustomers(filteredUsers);
        }else if(onlyShowVendors){
          const filteredUsers = response.data.filter((user: any) => user.type === "vendor");
          setCustomers(filteredUsers);
          setAllCustomers(filteredUsers);
        }else{
          setCustomers(response.data);
          setAllCustomers(response.data);
        }
       
      }
    } catch (error) {
      console.error("error in fetching party:", error);
    }
  };

  const handleEdit = (customer: any) => {
    props.onEdit(customer);
  };

  const searchByAccountNo = () => {
    const filteredCustomers = allCustomers.filter((customer: any) =>
      customer.party_no.toString().includes(customerNo)
    );
    setCustomers(filteredCustomers);
  };

  const searchByAccountName = () => {
    const filteredCustomers = allCustomers.filter((customer: any) =>
      customer.name.toLowerCase().includes(customerName.toLowerCase())
    );
    setCustomers(filteredCustomers);
  };

  // Reset Filters
  const resetFilters = () => {
    setCustomerNo("");
    setCustomerName("");
    setCustomers(allCustomers); // Reset to original list
  };

  return (
    <div className="p-4 ">
      {/* <h2 className="text-2xl font-bold mb-4">Customers</h2> */}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Customer Account no</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Account No"
              className="border border-[#c1c5cd] rounded-l px-3 py-1 flex-1"
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
            />
            <button
              onClick={() => {
                searchByAccountNo();
              }}
              className="bg-blue-500 border-[#c1c5cd] text-white px-4 py-1 rounded-r"
            >
              🔍
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Customer Name</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter the Name"
              className="border border-[#c1c5cd] rounded-l px-3 py-1 flex-1"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <button
              onClick={() => {
                searchByAccountName();
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded-r"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={resetFilters}
          className="bg-sky-500 text-white px-4 py-1 rounded"
        >
          Reset
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse ">
          <thead className="bg-blue-100">
            <tr>
              <th className="border-r border-[#c1c5cd] px-4 py-2">
                Customer Acc no
              </th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">
                Customer Name
              </th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">
                Bank Account no
              </th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Type</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Balance</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Address</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Phone No</th>
              <th className="border-r border-[#c1c5cd] px-4 py-2">Date</th>
              <th className=" px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((customer: any) => (
                <tr key={customer.id} className="text-center bg-slate-50">
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.party_no || "N/A"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.name || "N/A"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.commercial_record || "N/A"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.type =='vendor' ? "Customer" : "Supplier"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.balance || "0"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.address || "N/A"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {customer?.tax_number || "N/A"}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    {formatDate(customer.createdAt)}
                  </td>
                  <td className="border-b border-[#EAECF0] px-4 py-2">
                    <button
                      onClick={() => {
                        handleEdit(customer);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                     {props.otherComp ?"Select" : "Edit"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span>Total {customers.length} items</span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from(
            { length: Math.ceil(customers.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={
              currentPage === Math.ceil(customers.length / itemsPerPage)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(customers.length / itemsPerPage))
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => console.log("Items per page:", e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
        </select>
      </div>
    </div>
  );
};

export default CustomersTable;
