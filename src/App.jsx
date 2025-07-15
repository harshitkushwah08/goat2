import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLoader } from './components/ui/loader';
import { Toaster } from "react-hot-toast";

// Lazy load components for better performance
const Notifications = React.lazy(() => import('./pages/Notifications'));
const RecentlyDownloaded = React.lazy(() => import('./pages/RecentlyDownloaded'));
// Lazy load components for better performance
const DashboardPage = React.lazy(() => import('./pages/sales/dashboard')); 
const TemplatePage = React.lazy(() => import('./pages/custom/templates'));
const CustomFormsPage = React.lazy(() => import('./pages/custom/forms'));
const FormPage = React.lazy(() => import('./pages/sales/form').then(module => ({ default: module.FormPage })));
const FormView = React.lazy(() => import('./pages/custom/FormView'));
const PaymentsReceipts = React.lazy(() => import('./pages/sales/PaymentsReceipts').then(module => ({ default: module.PaymentsReceipts })));
const ProformaInvoice = React.lazy(() => import('./pages/sales/ProformaInvoice').then(module => ({ default: module.ProformaInvoice })));
const DeliveryChallans = React.lazy(() => import('./pages/sales/DeliveryChallans').then(module => ({ default: module.DeliveryChallans })));

const Purchase = React.lazy(() => import('./pages/purchases/Purchase').then(module => ({ default: module.Purchase })));
const PaymentsMade = React.lazy(() => import('./pages/purchases/PaymentsMade').then(module => ({ default: module.PaymentsMade })));
const DebitNote = React.lazy(() => import('./pages/purchases/DebitNote').then(module => ({ default: module.DebitNote })));
const PurchaseOrder = React.lazy(() => import('./pages/purchases/PurchaseOrder').then(module => ({ default: module.PurchaseOrder })));

const ExpenseTracker = React.lazy(() => import('./pages/apps/ExpenseTracker').then(module => ({ default: module.ExpenseTracker })));

const RecentlyDeleted = React.lazy(() => import('./pages/RecentlyDeleted').then(module => ({ default: module.RecentlyDeleted })));
const EWayBill = React.lazy(() => import('./pages/EWayBill').then(module => ({ default: module.EWayBill })));
const Reports = React.lazy(() => import('./pages/Reports').then(module => ({ default: module.Reports })));
const Ledger = React.lazy(() => import('./pages/Ledger').then(module => ({ default: module.Ledger })));

const Customer = React.lazy(() => import('./pages/masters/Customer').then(module => ({ default: module.Customer })));
const Vendors = React.lazy(() => import('./pages/masters/Vendors').then(module => ({ default: module.Vendors })));
const Products = React.lazy(() => import('./pages/masters/Products').then(module => ({ default: module.Products })));

const TrashPage = React.lazy(() => import('./pages/trash').then(module => ({ default: module.TrashPage })));
const IndexPage = React.lazy(() => import('./pages/index').then(module => ({ default: module.IndexPage })));
const FinancialDash = React.lazy(() => import('./pages/FinancialDash').then(module => ({ default: module.FinancialDash })));
const Ai = React.lazy(() => import('./pages/ai').then(module => ({ default: module.Ai })));
const NotFoundPage = React.lazy(() => import('./err/NotFound'));
const InfoPage = React.lazy(() => import('./pages/about').then(module => ({ default: module.InfoPage })));
const CategoriesInventory = React.lazy(() => import('./pages/inventory/Categories').then(module => ({ default: module.CategoriesInventory })));
const StockManagement = React.lazy(() => import('./pages/inventory/StockManagement').then(module => ({ default: module.StockManagement })));
const ToDoList = React.lazy(() => import('./pages/apps/todo').then(module => ({ default: module.ToDoList })));
const HSNFinder = React.lazy(() => import('./pages/apps/HSNFinder').then(module => ({ default: module.HSNFinder })));
const Notes = React.lazy(() => import('./pages/apps/Notes').then(module => ({ default: module.Notes })));
const GSTCalc = React.lazy(() => import('./pages/apps/gstcalc').then(module => ({ default: module.GSTCalc })));
const InvoiceDashboard = React.lazy(() => import('./pages/sales/invoice-dash').then(module => ({ default: module.InvoiceDashboard })));
const InvoiceList = React.lazy(() => import('./pages/sales/invoice-list').then(module => ({ default: module.InvoiceList })));
const CreateInvoice = React.lazy(() => import('./pages/sales/CreateInvoice').then(module => ({ default: module.CreateInvoice })));
const RetailInvoice = React.lazy(() => import('./pages/sales/RetailInvoice').then(module => ({ default: module.RetailInvoice })));
const SettingsPage = React.lazy(() => import('./pages/settings'));
const InventoryDashboard = React.lazy(() => import('./pages/inventory/dashboard'));
const InventoryItems = React.lazy(() => import('./pages/inventory/items'));

const ContactPage = React.lazy(() => import('./pages/contact').then(module => ({ default: module.ContactPage })));

const LoginPage = React.lazy(() => import('./pages/LoginPage')); 
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const TwoFactorPage = React.lazy(() => import('./components/security/twoFactor'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));

const LayoutWrapper = React.lazy(() => import('./components/LayoutWrapper').then(module => ({ default: module.LayoutWrapper })));

function App() {
  return (
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/notifications" element={<LayoutWrapper><Notifications /></LayoutWrapper>} />
            <Route path="/recently-downloaded" element={<LayoutWrapper><RecentlyDownloaded /></LayoutWrapper>} />
            <Route path="/login/two-factor" element={<TwoFactorPage />} />  
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />  

            <Route path="/dashboard" element={<LayoutWrapper><FinancialDash /></LayoutWrapper>} />
            <Route path="/info" element={<LayoutWrapper><InfoPage /></LayoutWrapper>} />
            <Route path="/form-gen" element={<LayoutWrapper><DashboardPage /></LayoutWrapper>} />
            <Route path="/forms/templates" element={<LayoutWrapper><TemplatePage /></LayoutWrapper>} />
            <Route path="/forms/custom" element={<LayoutWrapper><CustomFormsPage /></LayoutWrapper>} />
            <Route path="/forms/view/:id" element={<LayoutWrapper><FormView /></LayoutWrapper>} />
            <Route path="/forms/edit/:id" element={<LayoutWrapper><FormView /></LayoutWrapper>} />
            <Route path="/form" element={<LayoutWrapper><FormPage /></LayoutWrapper>} />
            <Route path="/trash" element={<LayoutWrapper><TrashPage /></LayoutWrapper>} />
            <Route path="/ai" element={<LayoutWrapper><Ai /></LayoutWrapper>} />
            <Route path="/apps/hsn" element={<LayoutWrapper><HSNFinder /></LayoutWrapper>} />
            <Route path="/apps/notes" element={<LayoutWrapper><Notes /></LayoutWrapper>} />
            <Route path="/apps/gst" element={<LayoutWrapper><GSTCalc /></LayoutWrapper>} />
            <Route path="/apps/todo" element={<LayoutWrapper><ToDoList /></LayoutWrapper>} />
            <Route path="/settings" element={<LayoutWrapper><SettingsPage /></LayoutWrapper>} />
            <Route path="/sales/invoice-dashboard" element={<LayoutWrapper><InvoiceDashboard /></LayoutWrapper>} />
            <Route path="/sales/invoice-list" element={<LayoutWrapper><InvoiceList /></LayoutWrapper>} />
            <Route path="/sales/create-invoice" element={<LayoutWrapper><CreateInvoice /></LayoutWrapper>} />
            <Route path="/sales/retail-invoice" element={<LayoutWrapper><RetailInvoice /></LayoutWrapper>} />
            <Route path="/sales/payments-receipts" element={<LayoutWrapper><PaymentsReceipts /></LayoutWrapper>} />
            <Route path="/sales/proforma-invoice" element={<LayoutWrapper><ProformaInvoice /></LayoutWrapper>} />
            <Route path="/sales/delivery-challans" element={<LayoutWrapper><DeliveryChallans /></LayoutWrapper>} />
            
            <Route path="/purchases/purchase" element={<LayoutWrapper><Purchase /></LayoutWrapper>} />
            <Route path="/purchases/payments-made" element={<LayoutWrapper><PaymentsMade /></LayoutWrapper>} />
            <Route path="/purchases/debit-note" element={<LayoutWrapper><DebitNote /></LayoutWrapper>} />
            <Route path="/purchases/purchase-order" element={<LayoutWrapper><PurchaseOrder /></LayoutWrapper>} />
            
            <Route path="/apps/expense" element={<LayoutWrapper><ExpenseTracker /></LayoutWrapper>} />
            
            <Route path="/recently-deleted" element={<LayoutWrapper><RecentlyDeleted /></LayoutWrapper>} />
            <Route path="/e-waybill" element={<LayoutWrapper><EWayBill /></LayoutWrapper>} />
            <Route path="/reports" element={<LayoutWrapper><Reports /></LayoutWrapper>} />
            <Route path="/ledger" element={<LayoutWrapper><Ledger /></LayoutWrapper>} />
            
            <Route path="/masters/customer" element={<LayoutWrapper><Customer /></LayoutWrapper>} />
            <Route path="/masters/vendors" element={<LayoutWrapper><Vendors /></LayoutWrapper>} />
            <Route path="/masters/products" element={<LayoutWrapper><Products /></LayoutWrapper>} />
            
            <Route path="/inventory/dashboard" element={<LayoutWrapper><InventoryDashboard /></LayoutWrapper>} />
            <Route path="/inventory/items" element={<LayoutWrapper><InventoryItems /></LayoutWrapper>} />
            <Route path="/inventory/categories" element={<LayoutWrapper><CategoriesInventory /></LayoutWrapper>} />
            <Route path="/inventory/stock" element={<LayoutWrapper><StockManagement /></LayoutWrapper>} />
            <Route path="/contact" element={<LayoutWrapper><ContactPage /></LayoutWrapper>} />
          </Routes>
        </Suspense>
              <Toaster position="top-center" />
        
      </Router>
  );
}

export default App;