import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "../layout/DefaultLayout";
import Errorpage from "../pages/Authentication/Errorpage";
import Forgetpass from "../pages/Authentication/Forgetpass";
import SignUp from "../pages/Authentication/SignUp";
import SignIn from "../pages/Authentication/SignIn";
import PageTitle from "../components/PageTitle";
import { CustomerNSuppliers } from "../components/CustomerNSuppliers";
import { SalesNPurchases } from "../components/SalesNPurchase";
import { PaymentNReceipt } from "../components/PaymentNReceipt";
import { StockControls } from "../components/StockControls";
import { GeneralAccounts } from "../components/GeneralAccounts";
import { Exit } from "../components/Exit";

const renderGeneralRoutes = () => (
  <>
    <Route
      path="/customerAndSuppliers"
      element={
        <>
          <PageTitle title="Customers & Suppliers" />
          <CustomerNSuppliers />
        </>
      }
    />

    <Route
      path="/salesAndPurchases"
      element={
        <>
          <PageTitle title="Sales & Purchases" />
          <SalesNPurchases />
        </>
      }
    />

    <Route
      path="/paymentAndReceipt"
      element={
        <>
          <PageTitle title="Payment & Receipt" />
          <PaymentNReceipt />
        </>
      }
    />

    <Route
      path="/stockcontrols"
      element={
        <>
          <PageTitle title="Stock Controls" />
          <StockControls />
        </>
      }
    />

    <Route
      path="/generalAccount"
      element={
        <>
          <PageTitle title="General Account" />
          <GeneralAccounts />
        </>
      }
    />

    <Route
      path="/exit"
      element={
        <>
          <PageTitle title="Exit" />
          <Exit />
        </>
      }
    />
    <Route path="*" element={<Navigate to="/customerAndSuppliers" replace />} />
  </>
);

const MainRouting = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoggedIn) {
    return (
      <DefaultLayout>
        <Routes>{renderGeneralRoutes()}</Routes>
      </DefaultLayout>
    );
  }

  // Routes for non-authenticated users
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/error" element={<Errorpage />} />
      <Route path="/auth/forgetpass" element={<Forgetpass />} />
    </Routes>
  );
};

export default MainRouting;
