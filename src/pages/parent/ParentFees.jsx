import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Download, CheckCircle, Smartphone, Landmark, AlertTriangle, Clock, Receipt, IndianRupee } from 'lucide-react';

const ParentFees = () => {
    const { studentData } = useApp();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const fees = studentData?.fees || {};
    const feeHistory = fees.history || [];
    const totalAmount = fees.total || 150000;
    const paidAmount = fees.paid || 0;
    const pendingAmount = fees.pending || totalAmount - paidAmount;
    const dueAmount = fees.due || 50000;
    const nextDue = fees.nextDue || '28 Feb 2026';

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 2000);
    };

    if (isPaid) {
        return (
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-green-100 dark:border-green-900">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Transaction ID: TXN88392019 • ₹{dueAmount.toLocaleString()}</p>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        <Download size={16} className="inline mr-2" /> Download Receipt
                    </button>
                    <button onClick={() => setIsPaid(false)} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees & Payments</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Fee status for <span className="font-semibold text-gray-900 dark:text-white">{studentData?.name || 'Student'}</span>
                </p>
            </header>

            {/* Fee Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                            <IndianRupee size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Fee</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
                            <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Paid</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{paidAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-lg">
                            <Clock size={18} className="text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{pendingAmount.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Due Alert */}
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                <AlertTriangle size={20} className="text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-orange-900 dark:text-orange-300">Next Installment Due</h3>
                                <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
                                    <span className="font-bold text-lg">₹{dueAmount.toLocaleString()}</span> due by {nextDue}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pay Now</h3>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <PayOption icon={Smartphone} title="UPI" selected={paymentMethod === 'upi'} onSelect={() => setPaymentMethod('upi')} />
                            <PayOption icon={CreditCard} title="Card" selected={paymentMethod === 'card'} onSelect={() => setPaymentMethod('card')} />
                            <PayOption icon={Landmark} title="NetBanking" selected={paymentMethod === 'netbanking'} onSelect={() => setPaymentMethod('netbanking')} />
                        </div>
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                                }`}
                        >
                            {isProcessing ? 'Processing...' : `Pay ₹${dueAmount.toLocaleString()} Securely`}
                        </button>
                    </div>
                </div>

                {/* Payment History */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Receipt size={18} className="text-gray-500" /> Payment History
                    </h3>
                    {feeHistory.length === 0 ? (
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">No payments recorded yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {feeHistory.map((txn, i) => (
                                <div key={txn.id || i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">₹{(txn.amount || 0).toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{txn.date} • {txn.method}</p>
                                    </div>
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                                        {txn.status === 'success' ? '✓ Paid' : txn.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PayOption = ({ icon: Icon, title, selected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${selected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
            }`}
    >
        <Icon size={24} className="mb-2" />
        <span className="font-medium text-sm">{title}</span>
    </button>
);

export default ParentFees;
