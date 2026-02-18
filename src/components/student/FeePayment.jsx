import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, Smartphone, Landmark, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FeePayment = () => {
    const { studentData } = useApp();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 2000);
    };

    // Safe access to fee data
    const fees = studentData?.fees || {};
    const feeHistory = fees.history || [];
    const totalAmount = fees.total || 150000;
    const dueAmount = fees.due || 50000;
    const dueDate = fees.dueDate || '28 Feb';

    if (isPaid) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-green-100 dark:border-green-900">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Transaction ID: TXN88392019 • ₹{dueAmount.toLocaleString()}</p>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        Download Receipt
                    </button>
                    <button onClick={() => setIsPaid(false)} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tuition Fee Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Payment Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Payment Breakdown</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tuition Fee (Sem 1)</span>
                                <span>₹1,20,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Library Fee</span>
                                <span>₹5,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Lab Fee</span>
                                <span>₹15,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Development Fee</span>
                                <span>₹10,000</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Installment Plan Selected</h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">2nd Installment Due</p>
                                    <p className="text-xl font-bold text-blue-900 dark:text-blue-200">₹{dueAmount.toLocaleString()}</p>
                                </div>
                                <span className="text-xs font-bold bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                                    Due: {dueDate}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Select Payment Method</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <PaymentOption
                                icon={Smartphone}
                                title="UPI"
                                selected={paymentMethod === 'upi'}
                                onSelect={() => setPaymentMethod('upi')}
                            />
                            <PaymentOption
                                icon={CreditCard}
                                title="Card"
                                selected={paymentMethod === 'card'}
                                onSelect={() => setPaymentMethod('card')}
                            />
                            <PaymentOption
                                icon={Landmark}
                                title="NetBanking"
                                selected={paymentMethod === 'netbanking'}
                                onSelect={() => setPaymentMethod('netbanking')}
                            />
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className={`
                                w-full mt-8 py-4 rounded-xl font-bold text-white text-lg transition-all
                                ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30'}
                            `}
                        >
                            {isProcessing ? 'Processing Payment...' : `Pay ₹${dueAmount.toLocaleString()} Securely`}
                        </button>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Payment History</h2>
                        {feeHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                <AlertCircle className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">No payment history yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {feeHistory.map((txn, index) => (
                                    <div key={txn.id || index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">₹{(txn.amount || 0).toLocaleString()}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{txn.date || 'N/A'}</p>
                                        </div>
                                        <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentOption = ({ icon: Icon, title, selected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`
            flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
            ${selected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'}
        `}
    >
        <Icon size={24} className="mb-2" />
        <span className="font-medium text-sm">{title}</span>
    </button>
);

export default FeePayment;
