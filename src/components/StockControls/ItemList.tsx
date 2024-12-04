import React, { useState, useEffect } from "react";
import { getAllItems } from "../../api/auth";

const ItemList = ({ onEdit,searchQuerry }: any) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchQuerry ? searchQuerry : "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch items from the API
  const fetchItems = async (page = 1,search="") => {
    setLoading(true);
    try {
      const response = await getAllItems(page, 10,search);
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
      <h2 className="text-lg font-bold mb-4">Items</h2>

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
                <th className="border border-gray-300 px-4 py-2">Item No</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  R. Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2">Cost Price</th>
                <th className="border border-gray-300 px-4 py-2">
                  Retail Price
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Wholesale Price
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index) => (
                <tr key={item.itemNo} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.itemNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item?.englishDescription} {"("} {item?.arabicDescription} {")"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.reservedQuantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.costPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.retailPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.wholesalePrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                     {searchQuerry ? 'Select' :'Edit'  }
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

export default ItemList;
