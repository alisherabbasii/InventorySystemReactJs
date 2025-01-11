import { useState } from "react";
import { SalesInvoice } from "./SalesInvoice";
import { SalesReturn } from "./SalesReturn";
import { Quotation } from "./Quotation";
import { Purchasing } from "./Purchasing";
import { PurchaseReturn } from "./PurchaseReturn";

export const SalesNPurchases = () => {
  // States for input fields

  const [activeTab, setActiveTab] = useState("quotation");

  // State for table data
  const [items, setItems] = useState([
    {
      id: 1,
      itemNo: "112489",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 2,
      total: 2,
    },
    {
      id: 2,
      itemNo: "110284",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 10,
      total: 10,
    },
    {
      id: 3,
      itemNo: "114578",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 10,
      total: 10,
    },
    {
      id: 4,
      itemNo: "24869",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 4,
      total: 4,
    },
    {
      id: 5,
      itemNo: "21457",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 5,
      total: 5,
    },
    {
      id: 6,
      itemNo: "23641",
      desc: "Hand Shower 2'5",
      store: 1,
      unit: "Piece",
      qty: 1,
      unitPrice: 1.75,
      total: 1.75,
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#217AA6] font-bold mb-2">
        Sales and Purchase
      </h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-1">
      <button
          onClick={() => setActiveTab("quotation")}
          className={
            "px-4 py-1 rounded " +
            (activeTab === "quotation"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 text-black")
          }
        >
          Quotation
        </button>
        <button
          onClick={() => setActiveTab("invoice")}
          className={
            "px-4 py-1 rounded " +
            (activeTab === "invoice"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 text-black")
          }
        >
          Sales Invoice
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={
            "px-4 py-1 rounded " +
            (activeTab === "return"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 text-black")
          }
        >
          Sales Return
        </button>
      

        <div className="flex space-x-2" style={{marginLeft:'6rem'}}>
        <button
          onClick={() => setActiveTab("purchasing")}
          className={
            "px-4 py-1 rounded " +
            (activeTab === "purchasing"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 text-black")
          }
        >
          Purchasing
        </button>
        <button
          onClick={() => setActiveTab("purchaseReturn")}
          className={
            "px-4 py-1 rounded " +
            (activeTab === "purchaseReturn"
              ? "bg-blue-500 text-white"
              : "bg-zinc-100 text-black")
          }
        >
          Purchase Return
        </button>
        </div>
      </div>

     
      {/* Table */}
      {activeTab === "invoice" && <SalesInvoice items={items} />}
      {activeTab === "return" && <SalesReturn items={items} />}
      {activeTab === "quotation" && <Quotation items={items} />}
      {activeTab === "purchasing" && <Purchasing items={items} />}
      {activeTab === "purchaseReturn" && <PurchaseReturn items={items} />}




    </div>
  );
};
