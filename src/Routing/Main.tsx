import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "../layout/DefaultLayout";
import Errorpage from "../pages/Authentication/Errorpage";
import Forgetpass from "../pages/Authentication/Forgetpass";
// import SignUp from "../pages/Authentication/SignUp";
import SignIn from "../pages/Authentication/SignIn";
import PageTitle from "../components/PageTitle";
import { CustomerNSuppliers } from "../components/CustomerNSuppliers";
import { SalesNPurchases } from "../components/SalesNPurchase";
import { Exit } from "../components/Exit";
import StockManagementForm from "../components/StockControls";
import PaymentVouchers from "../components/PaymentNReceipt";
import { AdminLogin } from "../components/Admin/Login";
import AdminManagement from "../components/Admin/AddUser";
import GeneralAccounts from "../components/GeneralAccounts";



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
          <PaymentVouchers />
        </>
      }
    />

    <Route
      path="/stockcontrols"
      element={
        <>
          <PageTitle title="Stock Controls" />
          <StockManagementForm   />
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

    {1==1 && <Route
      path="/exit"
      element={
        <>
          <PageTitle title="Exit" />
          <Exit />
        </>
      }
    />
  }
    <Route path="*" element={<Navigate to="/customerAndSuppliers" replace />} />
  </>
);

const renderAdminRoutes = () => (
  <>
  <Route
      path="/addUser"
      element={
        <>
          <PageTitle title="Add User" />
          <AdminManagement />
        </>
      }
    />

    {/* <Route
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
          <PaymentVouchers />
        </>
      }
    />

    <Route
      path="/stockcontrols"
      element={
        <>
          <PageTitle title="Stock Controls" />
          <StockManagementForm   />
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
    /> */}

  <Route
      path="/exit"
      element={
        <>
          <PageTitle title="Exit" />
          <Exit />
        </>
      }
    />
    <Route path="*" element={<Navigate to="/addUser" replace />} />
  </>
);

const MainRouting = () => {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  const userType = useSelector((state: any) => state.auth.userType);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoggedIn) {
    return (
      <DefaultLayout>
        <Routes>{userType=='admin' ? renderAdminRoutes() : renderGeneralRoutes()}</Routes>
      </DefaultLayout>
    );
  }

  // Routes for non-authenticated users
  return (
    <Routes>
      <Route path="/" element={<><SignIn /> <PageTitle title="Sign In" /></>} />
      {/* <Route path="/auth/signup" element={<SignUp />} /> */}
      <Route path="/auth/admin" element={<AdminLogin />} />
      <Route path="/auth/error" element={<Errorpage />} />
      <Route path="/auth/forgetpass" element={<Forgetpass />} />
    </Routes>
  );
};

export default MainRouting;
