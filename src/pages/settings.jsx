import  { useState,Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DropdownSelectMenu from '../components/ui/selectDropdown'; // adjust path if needed


import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Users,
  Save,
 Copy, RefreshCcw,
   Pencil,
   MessageCircle, 
   Plus,
   X,
   CheckCircle,
   Lock,
   Key,
   ShieldAlert,
   AlertTriangle,Trash2,Eye,EyeOff,
   DownloadIcon,
   Building,
   Store,
   Factory,
   ShoppingBag,
   Truck,
   FileText,
   BarChart,
   Scan,
   Package
} from 'lucide-react';
import { imgPath } from "../assets/imagesData";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Toggle } from '../components/ui/toggle';
import { Badge } from '../components/ui/badge';
import UpdateEmailDialog from '../components/ui/dialog/emailUpdateSetting';
import OtpDialog from '../components/ui/dialog/otpRe';
import toast from 'react-hot-toast';
import ExportAllDataDialog from '../components/ui/dialog/exportAllDataDialog';
import DeleteAccountDialog from '../components/ui/dialog/deleteAccountDialog';




export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showToken, setShowToken] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [showPasswordOtp, setShowPasswordOtp] = useState(false);
    const [showSecretOtp, setShowSecretOtp] = useState(false);
     const [exportOpen, setExportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleExport = () => toast.success('Data export started!');
  const handleDelete = () =>
    toast.success("Account Deletion Process Intiaited");



  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4567',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    invoiceReminders: true,
    stockAlerts: true,
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Appearance settings
    theme: 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    
    // Data settings
    autoBackup: true,
    dataRetention: '12',
  });

  const [businessSettings, setBusinessSettings] = useState({
    businessType: 'retail',
    autoSettlePayments: true,
    enableAdvancePayment: true,
    enableRoundOff: true,
    enableConsignor: false,
    autoGenerateEWayBill: false
  });

  const [inventorySettings, setInventorySettings] = useState({
    stockValueType: 'exclusive',
    priceSettingType: 'lastTransaction',
    stockValueCalculation: 'purchase',
    trackInventoryBy: 'invoice',
    enableWholesalePrice: false,
    enableBarcodeScan: false,
    enableSecondaryUnits: false,
    enableItemDescription: true,
    enableMRP: true,
    enableCESS: false,
    showCategory: true,
    useOldInventoryModule: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'data', label: 'Data & Privacy', icon: <Database size={18} /> },
    { id: 'business', label: 'Business Info', icon: <Building size={18} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={18} /> },
    { id: 'team', label: 'Team', icon: <Users size={18} /> },
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleBusinessSettingChange = (key, value) => {
    setBusinessSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleInventorySettingChange = (key, value) => {
    setInventorySettings(prev => ({ ...prev, [key]: value }));
  };

  const [currentToken, setCurrentToken] = useState('abcd1234efgh5678'); // example
  const [newToken, setNewToken] = useState('');
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentToken);
    alert('Token copied!');
  };

  const handleGenerate = () => {
    const random = Math.random().toString(36).substring(2, 18); // simple random
    setNewToken(random);
  };

  const backupCodes = [
    'ABCD-1234-EFGH-5678',
    'WXYZ-9876-MNOP-5432',
    'QRST-4567-UVWX-8901',
    'IJKL-2345-ABCD-6789',
    'EFGH-8765-WXYZ-4321',
    'MNOP-3456-QRST-7890',
    'UVWX-7654-IJKL-2109',
    'ABCD-5678-EFGH-9012'
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
       <div className="bg-boldWhite rounded-lg gap-5 p-5 items-center flex flex-col md:flex-row w-full">
        <div className="relative w-30 h-30 mb-5 md:mb-0 md:mr-6 rounded-full overflow-hidden border-3 p-3 border-primary-400 ring-5 ring-green-200">
          <img src={imgPath.imgLogoMobile} alt="Profile" className="w-full h-full object-cover" />
          <button className="absolute bottom-4 right-5 bg-boldWhite p-2 rounded-full shadow-lg hover:bg-bodyGray-900 hover:text-boldWhite transition duration-300">
            <Pencil className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex items-center gap-10 text-center md:text-left">
            <div className='flex flex-col items-center md:items-start gap-1'>
            <h2 className="text-lg font-semibold text-bodyGray-900">John Doe</h2>
          <p className="text-bodyGray-400 text-sm">johndoe@example.com</p>
          <p className="text-bodyGray-400 text-sm">+91 95958 78900</p>
        </div>
          
          
         <div className="relative">
            <button
              onClick={() => setShowGoogleDialog(true)}
              className="cursor-pointer text-bodyGray-900 border-2 border-primary-500 ring-3 active:scale-98 ring-primary-100 flex gap-2 items-center bg-boldWhite px-4 py-2 rounded-lg font-medium text-sm  transition"
            >
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-5">
                <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20
                C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
                <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
                <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
                <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
                C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
              </svg>
              Connected with Google
            </button>

            <Transition appear show={showGoogleDialog} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={() => setShowGoogleDialog(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/10 " />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Google Account Connection
                          </Dialog.Title>
                          <button
                            onClick={() => setShowGoogleDialog(false)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex justify-center mb-6">
                          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                            <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                            C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20
                            C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
                            <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                            C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
                            <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"></path>
                            <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
                            C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
                          </svg>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <p className="text-green-700 font-medium">Connected to Google</p>
                          </div>
                          <p className="text-green-600 text-sm mt-1">Your account is linked to john.doe@gmail.com</p>
                        </div>

                       

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none"
                            onClick={() => {
                              alert('Google account disconnected!');
                              setShowGoogleDialog(false);
                            }}
                          >
                            Disconnect Account
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>

      <div className="p-6 w-full">
  <h3 className="text-md font-semibold text-bodyGray-900">Update Email</h3>
  <p className="text-sm text-bodyGray-400">Change your registered email address</p>
  <div className="mt-8 flex flex-col gap-8">
    <input
      type="email"
      placeholder="Enter new email"
      className="p-2 border-b border-bodyGray-400 w-full focus:outline-none focus:border-primary-500 transition duration-200"
    />
    <div className="flex gap-3">
    <Button className="bg-primary-600 hover:bg-primary-700 cursor-pointer w-full" onClick={() => setShowDialog(true)}>
      <MessageCircle  className="w-5 h-5 mr-3" /> 
      <span className="text-base font-medium">OTP</span>
    </Button>
          <UpdateEmailDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />

         
    </div>
  </div>
</div>


      <div className=" p-6 w-full">
        <div className="bg-white rounded-lg shadow-sm border border-bodyGray-200 p-6">
          <h3 className="text-md font-semibold text-bodyGray-900">Update Password</h3>
          <p className="text-sm text-bodyGray-400">Change your account password</p>
          <div className="mt-8 flex flex-col gap-8">
            <input type="password" placeholder="Current password"       
            className="p-2 border-b border-bodyGray-400 w-full focus:outline-none focus:border-primary-500 transition duration-200"
            />
            <input type="password" placeholder="Enter new password"       
            className="p-2 border-b border-bodyGray-400 w-full focus:outline-none focus:border-primary-500 transition duration-200"
            />
            <input type="password" placeholder="Confirm new password"       
            className="p-2 border-b border-bodyGray-400 w-full focus:outline-none focus:border-primary-500 transition duration-200"
            />
            <Button className="bg-primary-600 hover:bg-primary-700 cursor-pointer" onClick={() => setShowPasswordOtp(true)}>
              <Save className='w-5 h-5 mr-3'/> Update Password
            </Button>
              <OtpDialog
        isOpen={showPasswordOtp}
        onClose={() => setShowPasswordOtp(false)}
        title="Verify OTP to Generate New Password"
        description="Enter the OTP sent to your mobile to update new account password."
        icon={<Key className="h-5 w-5 text-primary-600" />}
        onSubmit={(otp) => {
          toast.success('Account Password Updated!');
        }}
      />
          </div>
        </div>
      </div>

    <div className="p-6 w-full">
  <div className="bg-white rounded-lg shadow-sm border border-bodyGray-200 p-6">
    <h3 className="text-md font-semibold text-bodyGray-900">Account Secret</h3>
    <p className="text-sm text-bodyGray-400">Manage your account secret for secure access</p>

    <div className="mt-8 flex flex-col gap-6">
      <div className="relative bg-gray-50 border border-bodyGray-200 rounded-md p-4 flex items-center justify-between">
        <span className="text-lg font-mono text-bodyGray-900 break-all">
          {showToken ? currentToken : '••••••••••••••••••••••'}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowToken(!showToken)}
            className="text-bodyGray-500 hover:text-bodyGray-900 transition"
          >
            {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <button
            onClick={handleCopy}
            className="text-bodyGray-500 hover:text-bodyGray-900 transition"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
              <OtpDialog
        isOpen={showSecretOtp}
        onClose={() => setShowSecretOtp(false)}
        title="Verify OTP to Generate New Secret"
        description="Enter the OTP sent to your mobile to generate a new account secret."
        icon={<Key className="h-5 w-5 text-primary-600" />}
        onSubmit={(otp) => {
          toast.success('New account secret generated!');
          console.log('OTP entered for secret:', otp);
        }}
      />

      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)}
          placeholder="Enter new account secret"
          className="flex-1 p-2 border-b border-bodyGray-400 focus:outline-none focus:border-primary-500 transition duration-200 font-mono"
        />
        <button
          onClick={handleGenerate}
          
          className="flex items-center px-3 py-2 bg-primary-50 rounded hover:bg-primary-100 active:scale-96 transition"
        >
          <RefreshCcw className="w-4 h-4 mr-1" />
          <span className="text-sm">Generate</span>
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">Important Security Notice</p>
            <p className="mt-1">Your account secret provides full access to your account. Never share it with anyone and store it securely.</p>
          </div>
        </div>
      </div>

      <Button
        className="bg-primary-600 hover:bg-primary-700 cursor-pointer"
       onClick={() => setShowSecretOtp(true)} 
      >
        <Save className='w-5 h-5 mr-3'/> Save Secret
      </Button>
    </div>
  </div>
</div>

<div className="p-6 w-full">
      <div className="bg-white rounded-lg shadow-sm border border-bodyGray-200 p-6">
        <h3 className="text-md font-semibold text-bodyGray-900">Security Codes</h3>
        <p className="text-sm text-bodyGray-400">Manage your security verification codes</p>

        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center p-4 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Security Code</h4>
                <p className="text-sm text-bodyGray-500">For additional account verification</p>
              </div>
            </div>
            <Button
            className="text-primary-600 hover:bg-primary-50 transtion" 
              variant="outline" 
              onClick={() => setShowSecurityCode(!showSecurityCode)}
            >
              {showSecurityCode ? 'Hide' : 'View'}
              
            </Button>
          </div>

          <Transition
            show={showSecurityCode}
            enter="transition duration-300"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <div className="p-4 border border-blue-200 rounded-lg bg-bodyGray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Your Security Code:</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
                    setSecurityCode(code);
                  }}
                              className="text-primary-600 hover:bg-primary-50 transtion" 

                >
                  <RefreshCcw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
              <div className="bg-white p-3 rounded border border-bodyGray-300 font-mono text-lg text-center tracking-wider">
                {securityCode}
              </div>
              <p className="text-xs text-bodyGray-500 mt-2">
                This code can be used for account recovery and verification.
              </p>
            </div>
          </Transition>

          <div className="flex justify-between items-center p-4 border border-primary-400 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <ShieldAlert className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Backup Codes</h4>
                <p className="text-sm text-bodyGray-500">Use when you can't access your device</p>
              </div>
            </div>
            <Button 
              variant="outline" 
            className="text-primary-600 hover:bg-primary-50 transtion" 
              onClick={() => setShowBackupCodes(!showBackupCodes)}
            >
              {showBackupCodes ? 'Hide' : 'View'}
            </Button>
          </div>

          <Transition
            show={showBackupCodes}
            enter="transition duration-300"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <div className="p-4 border border-primary-400 rounded-lg bg-bodyGray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Your Backup Codes:</span>
                <Button 
                  variant="outline" 
                  size="sm"
                              className="active:scale-98 text-xs gap-2 border-bodyGray-400 hover:bg-primary-50 transtion" 

                  onClick={() => navigator.clipboard.writeText(backupCodes.join('\n'))}
                >
                  <Copy className="w-3 h-3  mr-1" />
                  Copy All
                </Button>
              </div>
              <div className="bg-white p-3 rounded border border-bodyGray-300 grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div key={index} className="font-mono text-sm p-2 border border-bodyGray-200 rounded bg-bodyGray-50">
                    {code}
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-600 p-4 bg-red-100 rounded mt-2">
                Each code can only be used once. Keep these codes in a safe place.
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
      
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <p className="text-sm text-bodyGray-400">Receive notifications via email</p>
          </div>
          <Toggle
            id="emailNotifications"
            checked={settings.emailNotifications}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <p className="text-sm  text-bodyGray-400">Receive browser push notifications</p>
          </div>
          <Toggle
            id="pushNotifications"
            checked={settings.pushNotifications}
            onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="invoiceReminders">Invoice Reminders</Label>
            <p className="text-sm text-bodyGray-400">Get reminded about overdue invoices</p>
          </div>
          <Toggle
            id="invoiceReminders"
            checked={settings.invoiceReminders}
            onChange={(e) => handleSettingChange('invoiceReminders', e.target.checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="stockAlerts">Stock Alerts</Label>
            <p className="text-sm text-bodyGray-400">Get notified when stock is low</p>
          </div>
          <Toggle
            id="stockAlerts"
            checked={settings.stockAlerts}
            onChange={(e) => handleSettingChange('stockAlerts', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorAuth" className="font-semibold">Two-Factor Authentication</Label>
              <p className="text-sm text-bodyGray-400">Add an extra layer of security to your account</p>
            </div>
            <Toggle
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            />
          </div>
          
          {settings.twoFactorAuth && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <h4 className="text-sm font-medium text-primary-700">Two-Factor Authentication is enabled</h4>
              <p className="text-xs text-primary-600 mt-1">Your account is protected with an additional layer of security.</p>
              <div className="mt-3 flex gap-2">
          
                <Button variant="outline" size="sm" className="text-xs text-primary-700 bg-boldWhite hover:bg-primary-50 active:scale-98 transition-all cursor-pointer active:bg-primary-700 active:text-boldWhite">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  Backup Codes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout" className="text-sm font-semibold">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              className="w-32 mt-2 ring-primary-200 focus:border-primary-400 border-bodyGray-300"
            />
            <p className="text-sm text-bodyGray-400">Automatically log out after this period of inactivity</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="text-md font-semibold mb-4">Login History</h3>
          <div className="space-y-3">
            <div className="p-3 border border-bodyGray-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-xs text-bodyGray-500">Chrome on Windows • IP: 192.168.1.1</p>
              </div>
              <Badge variant="success">Active Now</Badge>
            </div>
            <div className="p-3 border border-bodyGray-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Previous Login</p>
                <p className="text-xs text-bodyGray-500">Safari on macOS • IP: 192.168.1.2</p>
              </div>
              <span className="text-xs text-bodyGray-500">2 days ago</span>
            </div>
            <div className="p-3 border border-bodyGray-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Previous Login</p>
                <p className="text-xs text-bodyGray-500">Firefox on Android • IP: 192.168.1.3</p>
              </div>
              <span className="text-xs text-bodyGray-500">5 days ago</span>
            </div>
          </div>
                <Button variant="outline" size="sm" className="text-xs mt-5 text-primary-700 bg-boldWhite hover:bg-primary-50 active:scale-98 transition-all cursor-pointer active:bg-primary-700 active:text-boldWhite">
            View Full Login History
          </Button>
        </CardContent>
      </Card>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-md font-semibold text-red-800 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setExportOpen(true)} className="border-red-300 active:bg-red-600 active:text-boldWhite  text-red-600 hover:bg-red-100">
            <DownloadIcon className="w-4 h-4 mr-2"/>
            Export All Data
          </Button>
                        <Button onClick={() => setDeleteOpen(true)} variant="outline" className="border-red-300 text-boldWhite bg-red-600 cursor-pointer transition active:scale-98">

            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>

            <ExportAllDataDialog isOpen={exportOpen} onClose={() => setExportOpen(false)} onExport={handleExport} />
      <DeleteAccountDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullName="John Doe"
        onDelete={handleDelete}
      />
        </div>
      </div>
    </div>
  );

 const renderAppearanceSettings = () => (
  <div className="space-y-6">
    <div className="space-y-2 flex flex-col">
      <Label htmlFor="theme" className="text-sm font-medium text-bodyGray-400">Theme</Label>
      <DropdownSelectMenu
        id="theme"
        options={[
          { value: 'light', label: '🌤 Light' },
          { value: 'dark', label: '🌙 Dark' },
          { value: 'system', label: '🖥 System' },
        ]}
        selected={settings.theme}
        onChange={(value) => handleSettingChange('theme', value)}
      />
    </div>

    <div className="space-y-2 flex flex-col">
      <Label htmlFor="language" className="text-sm font-medium text-bodyGray-400">Language</Label>
      <DropdownSelectMenu
        id="language"
        options={[
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' },
          { value: 'de', label: 'German' },
        ]}
        selected={settings.language}
        onChange={(value) => handleSettingChange('language', value)}
      />
    </div>

    <div className="space-y-2 flex flex-col">
      <Label htmlFor="dateFormat" className="text-sm font-medium text-bodyGray-400">Date Format</Label>
      <DropdownSelectMenu
        id="dateFormat"
        options={[
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        ]}
        selected={settings.dateFormat}
        onChange={(value) => handleSettingChange('dateFormat', value)}
      />
    </div>

    <div className="space-y-2 flex flex-col">
      <Label htmlFor="currency" className="text-sm font-medium text-bodyGray-400">Default Currency</Label>
      <DropdownSelectMenu
        id="currency"
        options={[
          { value: 'USD', label: 'USD - US Dollar' },
          { value: 'EUR', label: 'EUR - Euro' },
          { value: 'GBP', label: 'GBP - British Pound' },
          { value: 'INR', label: 'INR - Indian Rupee' },
        ]}
        selected={settings.currency}
        onChange={(value) => handleSettingChange('currency', value)}
      />
    </div>
  </div> );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="autoBackup" className="font-semibold">Automatic Backup</Label>
          <p className="text-sm text-bodyGray-400">Automatically backup your data daily</p>
        </div>
        <Toggle
          id="autoBackup"
          checked={settings.autoBackup}
          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dataRetention" className="font-semibold">Data Retention (months)</Label>
        <Input
          id="dataRetention"
          type="number"
          value={settings.dataRetention}
          onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
          className="w-32 mt-2 ring-primary-200 focus:border-primary-400 border-bodyGray-300"
        />
        <p className="text-sm text-bodyGray-400">How long to keep deleted data before permanent removal</p>
      </div>
      
     
        
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Business Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'retail', label: 'Retail', icon: <Store className="h-6 w-6" /> },
              { id: 'wholesale', label: 'Wholesaler & Distributor', icon: <Truck className="h-6 w-6" /> },
              { id: 'manufacturing', label: 'Manufacturing', icon: <Factory className="h-6 w-6" /> },
              { id: 'trading', label: 'Trading', icon: <ShoppingBag className="h-6 w-6" /> }
            ].map(type => (
              <div 
                key={type.id}
                onClick={() => handleBusinessSettingChange('businessType', type.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  businessSettings.businessType === type.id 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-bodyGray-300 hover:border-primary-200'
                }`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className={`p-3 rounded-full ${
                    businessSettings.businessType === type.id 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-bodyGray-100 text-bodyGray-600'
                  }`}>
                    {type.icon}
                  </div>
                  <span className="font-medium">{type.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSettlePayments" className="font-semibold">Auto Settle Payments</Label>
                <p className="text-sm text-bodyGray-400">If there are advance payments, auto-settle them with the newly created invoice</p>
              </div>
              <Toggle
                id="autoSettlePayments"
                checked={businessSettings.autoSettlePayments}
                onChange={(e) => handleBusinessSettingChange('autoSettlePayments', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAdvancePayment" className="font-semibold">Enable Advance Payment</Label>
                <p className="text-sm text-bodyGray-400">Set this up to enable the advance payment option</p>
              </div>
              <Toggle
                id="enableAdvancePayment"
                checked={businessSettings.enableAdvancePayment}
                onChange={(e) => handleBusinessSettingChange('enableAdvancePayment', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableRoundOff" className="font-semibold">Enable Round Off</Label>
                <p className="text-sm text-bodyGray-400">Set this up to enable the Round Off option</p>
              </div>
              <Toggle
                id="enableRoundOff"
                checked={businessSettings.enableRoundOff}
                onChange={(e) => handleBusinessSettingChange('enableRoundOff', e.target.checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">E-Way Bill Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableConsignor" className="font-semibold">Enable Consignor [Dispatch address for E-Way-Bills]</Label>
                <p className="text-sm text-bodyGray-400">Consignor is the company sending a shipment to be delivered</p>
              </div>
              <Toggle
                id="enableConsignor"
                checked={businessSettings.enableConsignor}
                onChange={(e) => handleBusinessSettingChange('enableConsignor', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoGenerateEWayBill" className="font-semibold">AutoGenerate E-Way-Bill</Label>
                <p className="text-sm text-bodyGray-400">E-way bill will be generated and details will get printed on E-invoice</p>
              </div>
              <Toggle
                id="autoGenerateEWayBill"
                checked={businessSettings.autoGenerateEWayBill}
                onChange={(e) => handleBusinessSettingChange('autoGenerateEWayBill', e.target.checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInventorySettings = () => (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Stock Value Settings</h3>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold mb-2 block">Stock Value</Label>
              <p className="text-sm text-bodyGray-400 mb-3">The stock value that you see for each product, Do you want to see it inclusive of taxes or exclusive of taxes?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="stockValueType" 
                    value="inclusive" 
                    checked={inventorySettings.stockValueType === 'inclusive'} 
                    onChange={() => handleInventorySettingChange('stockValueType', 'inclusive')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Inclusive of Taxes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="stockValueType" 
                    value="exclusive" 
                    checked={inventorySettings.stockValueType === 'exclusive'} 
                    onChange={() => handleInventorySettingChange('stockValueType', 'exclusive')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Exclusive of Taxes</span>
                </label>
              </div>
            </div>
            
            <div>
              <Label className="font-semibold mb-2 block">Sale / Purchase Price Setting</Label>
              <p className="text-sm text-bodyGray-400 mb-3">Set the configuration that works for your business use-case.</p>
              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="priceSettingType" 
                    value="lastTransaction" 
                    checked={inventorySettings.priceSettingType === 'lastTransaction'} 
                    onChange={() => handleInventorySettingChange('priceSettingType', 'lastTransaction')}
                    className="text-primary-600 focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <span className="font-medium">Last Transaction Price</span>
                    <p className="text-sm text-bodyGray-400">It will show you the price as per the last transaction with that particular party.</p>
                  </div>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="priceSettingType" 
                    value="fixedPrice" 
                    checked={inventorySettings.priceSettingType === 'fixedPrice'} 
                    onChange={() => handleInventorySettingChange('priceSettingType', 'fixedPrice')}
                    className="text-primary-600 focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <span className="font-medium">Fixed Price</span>
                    <p className="text-sm text-bodyGray-400">This is suited if you want to have a fixed price for majority of your customers and if prices of your products don't change for months.</p>
                  </div>
                </label>
              </div>
            </div>
            
            <div>
              <Label className="font-semibold mb-2 block">Calculation of Stock Value</Label>
              <p className="text-sm text-bodyGray-400 mb-3">Do you want the Calculation of Stock value based on Purchase price or Sale Price?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="stockValueCalculation" 
                    value="purchase" 
                    checked={inventorySettings.stockValueCalculation === 'purchase'} 
                    onChange={() => handleInventorySettingChange('stockValueCalculation', 'purchase')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Purchase Price</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="stockValueCalculation" 
                    value="sale" 
                    checked={inventorySettings.stockValueCalculation === 'sale'} 
                    onChange={() => handleInventorySettingChange('stockValueCalculation', 'sale')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Sale Price</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Sales Inventory Setting</h3>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold mb-2 block">How do you want to track the Inventory?</Label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="trackInventoryBy" 
                    value="invoice" 
                    checked={inventorySettings.trackInventoryBy === 'invoice'} 
                    onChange={() => handleInventorySettingChange('trackInventoryBy', 'invoice')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Reduce stock from Inventory when I'm making a Invoice</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="trackInventoryBy" 
                    value="challan" 
                    checked={inventorySettings.trackInventoryBy === 'challan'} 
                    onChange={() => handleInventorySettingChange('trackInventoryBy', 'challan')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span>Reduce stock from Inventory when I'm making a delivery challan</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableWholesalePrice" className="font-semibold">Wholesale Price</Label>
                <p className="text-sm text-bodyGray-400">Enable this if you want to provide a wholesale price for bulk quantities</p>
              </div>
              <Toggle
                id="enableWholesalePrice"
                checked={inventorySettings.enableWholesalePrice}
                onChange={(e) => handleInventorySettingChange('enableWholesalePrice', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableBarcodeScan" className="font-semibold">Scan Barcode</Label>
                <p className="text-sm text-bodyGray-400">If you want to do the billing via barcode scanning, Enable this option</p>
              </div>
              <Toggle
                id="enableBarcodeScan"
                checked={inventorySettings.enableBarcodeScan}
                onChange={(e) => handleInventorySettingChange('enableBarcodeScan', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSecondaryUnits" className="font-semibold">Secondary Units</Label>
                <p className="text-sm text-bodyGray-400">Do you deal with multiple units for the same product in your business?</p>
              </div>
              <Toggle
                id="enableSecondaryUnits"
                checked={inventorySettings.enableSecondaryUnits}
                onChange={(e) => handleInventorySettingChange('enableSecondaryUnits', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableItemDescription" className="font-semibold">Item Description</Label>
                <p className="text-sm text-bodyGray-400">Do you want to show a small description in the document PDF?</p>
              </div>
              <Toggle
                id="enableItemDescription"
                checked={inventorySettings.enableItemDescription}
                onChange={(e) => handleInventorySettingChange('enableItemDescription', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableMRP" className="font-semibold">MRP</Label>
                <p className="text-sm text-bodyGray-400">Enable this if you wish to show MRP and Selling price separately</p>
              </div>
              <Toggle
                id="enableMRP"
                checked={inventorySettings.enableMRP}
                onChange={(e) => handleInventorySettingChange('enableMRP', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCESS" className="font-semibold">CESS</Label>
                <p className="text-sm text-bodyGray-400">Do you charge CESS from your customers?</p>
              </div>
              <Toggle
                id="enableCESS"
                checked={inventorySettings.enableCESS}
                onChange={(e) => handleInventorySettingChange('enableCESS', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showCategory" className="font-semibold">Show Category</Label>
                <p className="text-sm text-bodyGray-400">By using this feature you can categorize products</p>
              </div>
              <Toggle
                id="showCategory"
                checked={inventorySettings.showCategory}
                onChange={(e) => handleInventorySettingChange('showCategory', e.target.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="useOldInventoryModule" className="font-semibold">Select old Inventory Module</Label>
                <p className="text-sm text-bodyGray-400">Use the legacy inventory management system</p>
              </div>
              <Toggle
                id="useOldInventoryModule"
                checked={inventorySettings.useOldInventoryModule}
                onChange={(e) => handleInventorySettingChange('useOldInventoryModule', e.target.checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // const renderBillingSettings = () => (
  //   <div className="space-y-6">
  //     <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
  //       <h3 className="font-medium text-primary-700">Current Plan: Professional</h3>
  //       <p className="text-sm text-primary-600">$49/month - Billed monthly</p>
  //     </div>
      
  //     <div className="space-y-4">
  //       <h3 className="text-lg font-medium">Payment Method</h3>
  //       <div className="border rounded-lg p-4">
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center gap-3">
  //             <div className="w-8 h-5 bg-blue-600 rounded text-boldWhite text-xs flex items-center justify-center">
  //               VISA
  //             </div>
  //             <span>•••• •••• •••• 4242</span>
  //           </div>
  //           <Button variant="outline" size="sm">Update</Button>
  //         </div>
  //       </div>
  //     </div>
      
  //     <div className="space-y-4">
  //       <h3 className="text-lg font-medium">Billing History</h3>
  //       <div className="space-y-2">
  //         <div className="flex justify-between items-center py-2 border-b">
  //           <span>Dec 2024</span>
  //           <span>$49.00</span>
  //           <Button variant="ghost" size="sm">Download</Button>
  //         </div>
  //         <div className="flex justify-between items-center py-2 border-b">
  //           <span>Nov 2024</span>
  //           <span>$49.00</span>
  //           <Button variant="ghost" size="sm">Download</Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderTeamSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-primary-50 p-4 rounded-md">
        <h3 className="text-md font-medium text-primary-dark">Team Members</h3>
        <Button className="bg-primary-600 hover:bg-primary-700 flex flex-row items-center justify-center gap-px">Invite Member <Plus className='w- h-5 text-boldWhite' /></Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border-b-2 border-primary-500  rounded-lg">
          <div className="flex items-center gap-3">
            <img alt='Name' src={imgPath.testi2} className="w-10 h-10 rounded-full border-2 p-0.5 border-primary-600" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-bodyGray-500">john@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">Owner</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-200  rounded-lg">
          <div className="flex items-center gap-3">
            <img src={imgPath.testi1} className="w-10 h-10 rounded-full border-2 p-0.5 border-primary-600" />
            <div>
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-bodyGray-500">jane@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
            <Button variant="ghost" size="sm" className="bg-red-100 text-red-600 active:scale-98 transition cursor-pointer" >Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'data':
        return renderDataSettings();
      case 'business':
        return renderBusinessSettings();
      case 'inventory':
        return renderInventorySettings();
      case 'team':
        return renderTeamSettings();
      default:
        return renderProfileSettings();
    }
  };

  // Google connection dialog
  
  return (
    <div className="flex flex-col gap-6 bg-boldWhite p-8 min-h-screen">
 
            <div className="relative overflow-hidden rounded-2xl bg-boldWhite p-5 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-bodyGray-900">Setting</h3>
            <p className="text-sm text-bodyGray-500">Manage your account settings and preferences</p>
          </div>
          <div className="rounded-lg bg-boldWhite p-2">
            <SettingsIcon className="h-6 w-6 text-bodyGray-800" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
  <div className="w-64 space-y-2 sticky top-6 self-start">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-primary-50 border border-boldWhite ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700  border-primary-200'
                  : 'text-bodyGray-800 hover:bg-bodyGray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
<div className="flex-1">
  <Card className="p-3">
    <CardHeader>
      <CardTitle>
        {tabs.find(tab => tab.id === activeTab)?.label}
      </CardTitle>
      <CardDescription>
        {activeTab === 'profile' && 'Update your personal information and account details'}
        {activeTab === 'notifications' && 'Configure how you receive notifications'}
        {activeTab === 'security' && 'Manage your account security settings'}
        {activeTab === 'appearance' && 'Customize the look and feel of your dashboard'}
        {activeTab === 'data' && 'Control your data and privacy settings'}
        {activeTab === 'business' && 'Configure your business settings and preferences'}
        {activeTab === 'inventory' && 'Manage your inventory and stock settings'}
        {activeTab === 'team' && 'Manage team members and permissions'}
      </CardDescription>
    </CardHeader>
    <CardContent>
      {renderContent()}

    

      {activeTab !== 'profile' && (
        <Button 
          className="
            mt-5 w-full flex justify-center items-center gap-2
            bg-primary-dark active:scale-98 transition
          "
        >
          <Save className="w-5 h-5" /> Save Changes
        </Button>
      )}
    </CardContent>
  </Card>
</div>


      </div>
    </div>
  );
};

export default SettingsPage;