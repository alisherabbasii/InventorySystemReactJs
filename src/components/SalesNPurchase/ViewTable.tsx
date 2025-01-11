import  { useState, useEffect } from "react";
import { getAllPurchaseInvoiceItems, getAllPurchaseReturnItems, getAllQItems, getAllSalesInvoiceItems, getAllSalesReturnItems } from "../../api/auth";
import { formatDate } from "../Generic/FormatDate";

const SalesNPurchaseTable = ({ onView,searchQuerry,from }: any) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchQuerry ? searchQuerry : "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch quotation items from the API
  const fetchQItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllQItems(page, 10,search);
      console.log("quotation items:", response.data);
      const { data, totalPages } = response.data;
      setItems(data);
      setTotalPages(totalPages);
      if (!search) {setCurrentPage(page);}
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
//fetch sales invoice items
  const fetchSalesInvoiceItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllSalesInvoiceItems(page, 10,search);
      console.log("sales invoice items:", response.data);
      const { data, totalPages } = response.data;
      setItems(data);
      setTotalPages(totalPages);
      if (!search) {setCurrentPage(page);}
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesReturnItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllSalesReturnItems(page, 10,search);
      console.log("sales return items:", response.data);
      const { data, totalPages } = response.data;
      setItems(data);
      setTotalPages(totalPages);
      if (!search) {setCurrentPage(page);}
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseInvoiceItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllPurchaseInvoiceItems(page, 10,search);
      console.log("purchase invoice items:", response.data);
      const { data, totalPages } = response.data;
      setItems(data);
      setTotalPages(totalPages);
      if (!search) {setCurrentPage(page);}
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseReturnItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllPurchaseReturnItems(page, 10,search);
      console.log("purchase return items:", response.data);
      const { data, totalPages } = response.data;
      setItems(data);
      setTotalPages(totalPages);
      if (!search) {setCurrentPage(page);}
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchItems = async (currentPage=1,search="") =>{
    if(from === "quotation"){
      fetchQItems(currentPage,search);
    }else if(from === "salesInvoice"){
      fetchSalesInvoiceItems(currentPage,search);
    }else if(from === "purchaseInvoice"){
      fetchPurchaseInvoiceItems(currentPage,search);
    }else if(from === "salesReturn"){
      fetchSalesReturnItems(currentPage,search);
    }else if(from === "purchaseReturn"){
      fetchPurchaseReturnItems(currentPage,search)
    }
  }

  // Fetch items on component mount and page change
  useEffect(() => {
    fetchItems(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e:any) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Fetch all data for the search
    if (query) {
      fetchItems(1, query); // Fetch from first page for new search
    } else {
      fetchItems(1); // Reset to normal pagination if search is cleared
    }
  };

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="px-4 overflow-y-auto h-96">
      <h2 className="text-lg font-bold mb-4">Previous Quotations</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Item"
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Items Table */}
          <table className="table-auto w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Q.Invoice No</th>
                <th className="border border-gray-300 px-4 py-2">
                  Payment Terms
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Amount
                </th>
                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index) => (
                <tr onDoubleClick={() => onView(item)} key={item.itemNo} className="text-center cursor-pointer">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.invoiceNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item?.paymentTerms}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.totalAmount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item?.Party?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item?.Party?.address}
                  </td>
                    <td>
                    {formatDate(item.date)}
                    </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => onView(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                     View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {!searchQuery && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesNPurchaseTable;
