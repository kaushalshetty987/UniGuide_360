import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, Smartphone, Landmark } from 'lucide-react';
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

    if (isPaid) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl shadow-sm border border-green-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 mb-8">Transaction ID: TXN88392019 • ₹50,000</p>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
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
            <h1 className="text-2xl font-bold text-gray-900">Tuition Fee Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Payment Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Payment Breakdown</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Tuition Fee (Sem 1)</span>
                                <span>₹1,20,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Library Fee</span>
                                <span>₹5,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Lab Fee</span>
                                <span>₹15,000</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Development Fee</span>
                                <span>₹10,000</span>
                            </div>
                            <div className="h-px bg-gray-200 my-2"></div>
                            <div className="flex justify-between font-bold text-lg text-gray-900">
                                <span>Total Amount</span>
                                <span>₹1,50,000</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-semibold text-blue-900 mb-2">Installment Plan Selected</h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-blue-700">2nd Installment Due</p>
                                    <p className="text-xl font-bold text-blue-900">₹50,000</p>
                                </div>
                                <span className="text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                                    Due: 28 Feb
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
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
                                ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'}
                            `}
                        >
                            {isProcessing ? 'Processing Payment...' : 'Pay ₹50,000 Securely'}
                        </button>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Payment History</h2>
                        <div className="space-y-4">
                            {studentData.fees.history.map(txn => (
                                <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900">₹{txn.amount.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{txn.date}</p>
                                    </div>
                                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                                        <Download size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
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
            ${selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}
        `}
    >
        <Icon size={24} className="mb-2" />
        <span className="font-medium text-sm">{title}</span>
    </button>
);

export default FeePayment;
