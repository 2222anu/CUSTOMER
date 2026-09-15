import React, { useState } from 'react';
import {
  Zap,
  Droplets,
  Flame,
  Smartphone,
  PhoneCall,
  Globe,
  Tv,
  CreditCard,
  ShieldCheck,
  Building,
  Plane,
  Car,
  Gift,
  FileText,
  Check,
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ServiceCard } from '../components/ServiceCard';
import { Modal } from '../components/Modal';
import { PrimaryButton } from '../components/PrimaryButton';
import { useApp } from '../state/AppContext';
import type { Transaction } from '../types';

export const AllServicesScreen: React.FC = () => {
  const { navigateTo, openPinModal, completePayment } = useApp();

  const [selectedService, setSelectedService] = useState<{
    title: string;
    subTitle: string;
    defaultAmount: number;
    placeholder: string;
    icon: React.ReactNode;
  } | null>(null);

  const [accountNumber, setAccountNumber] = useState<string>('9876543210');
  const [amount, setAmount] = useState<string>('');

  const handleOpenService = (
    title: string,
    subTitle: string,
    defaultAmount: number,
    placeholder: string,
    icon: React.ReactNode
  ) => {
    setSelectedService({ title, subTitle, defaultAmount, placeholder, icon });
    setAmount(defaultAmount.toString());
  };

  const handleProceedPayment = () => {
    if (!selectedService) return;
    const payAmt = parseFloat(amount) || selectedService.defaultAmount;
    const serviceTitle = selectedService.title;
    const serviceSubTitle = `${selectedService.subTitle} (${accountNumber})`;

    const modalTitle = serviceTitle;
    const modalSubTitle = serviceSubTitle;

    setSelectedService(null);

    openPinModal({
      title: modalTitle,
      amount: payAmt,
      subTitle: modalSubTitle,
      onSuccess: () => {
        completePayment({
          title: serviceTitle,
          subTitle: serviceSubTitle,
          amount: payAmt,
          category: 'Bill Payment',
        }).then((txn: Transaction) => {
          navigateTo('PAYMENT_SUCCESS', { transaction: txn });
        });
      },
    });
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#0B0B14', minHeight: '100%', paddingBottom: '24px', color: '#FFFFFF' }}>
      <AppHeader title="All Services" showBack showSettings />

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Bill Payments Grid */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Recharge & Utilities (SADAD)
          </div>
          <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '16px', boxShadow: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <ServiceCard label="Electricity" icon={<Zap size={20} />} onClick={() => navigateTo('ELECTRICITY')} />
              <ServiceCard
                label="Water"
                icon={<Droplets size={20} />}
                onClick={() => handleOpenService('Water Bill', 'National Water Company (NWC)', 220, 'NWC Account No', <Droplets size={20} />)}
              />
              <ServiceCard
                label="Gas"
                icon={<Flame size={20} />}
                onClick={() => handleOpenService('Gas Cylinder', 'National Gas (GASCO)', 45, 'Customer ID', <Flame size={20} />)}
              />
              <ServiceCard
                label="STC"
                icon={<Smartphone size={20} />}
                onClick={() => handleOpenService('STC Sawa Recharge', 'STC Prepaid 5G', 115, '05X XXX XXXX', <Smartphone size={20} />)}
              />
              <ServiceCard
                label="Mobily"
                icon={<PhoneCall size={20} />}
                onClick={() => handleOpenService('Mobily Postpaid', 'Mobily Mawaheb', 172, '05X XXX XXXX', <PhoneCall size={20} />)}
              />
              <ServiceCard
                label="Zain 5G"
                icon={<Globe size={20} />}
                onClick={() => handleOpenService('Zain Fiber & 5G', 'Zain KSA', 287, 'Account Number', <Globe size={20} />)}
              />
              <ServiceCard
                label="Shahid VIP"
                icon={<Tv size={20} />}
                onClick={() => handleOpenService('Shahid / OSN', 'Shahid VIP Subscription', 49, 'Mobile or Email', <Tv size={20} />)}
              />
              <ServiceCard
                label="Balady"
                icon={<FileText size={20} />}
                onClick={() => handleOpenService('Balady Services', 'Municipal License & Fines', 450, 'Balady Invoice No', <FileText size={20} />)}
              />
            </div>
          </div>
        </div>

        {/* Financial Services */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Banking & Finance (SAMA)
          </div>
          <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '16px', boxShadow: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <ServiceCard label="mada Cards" icon={<CreditCard size={20} />} onClick={() => navigateTo('PAYMENT_METHODS')} />
              <ServiceCard
                label="Insurance"
                icon={<ShieldCheck size={20} />}
                onClick={() => handleOpenService('Tawuniya Insurance', 'Motor & Health', 1250, 'Policy / National ID', <ShieldCheck size={20} />)}
              />
              <ServiceCard
                label="Finance EMI"
                icon={<Building size={20} />}
                onClick={() => handleOpenService('Finance Installment', 'Al Rajhi / SNB Finance', 2150, 'Contract / IBAN No', <Building size={20} />)}
              />
              <ServiceCard
                label="Mawgif"
                icon={<Car size={20} />}
                onClick={() => handleOpenService('Mawgif Parking', 'Riyadh & Jeddah Parking', 50, 'Plate / Mobile No', <Car size={20} />)}
              />
            </div>
          </div>
        </div>

        {/* Travel & Bookings */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#6E6E85', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginLeft: '4px' }}>
            Travel & Lifestyle
          </div>
          <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '16px', padding: '16px', boxShadow: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <ServiceCard
                label="Saudia"
                icon={<Plane size={20} />}
                onClick={() => handleOpenService('Flight Booking', 'Saudia RUH ➔ JED', 650, 'Passenger PNR', <Plane size={20} />)}
              />
              <ServiceCard
                label="Jarir"
                icon={<Gift size={20} />}
                onClick={() => handleOpenService('Jarir Gift Card', 'Jarir Bookstore Digital Voucher', 200, 'Mobile / Email', <Gift size={20} />)}
              />
              <ServiceCard
                label="Absher"
                icon={<FileText size={20} />}
                onClick={() => handleOpenService('Traffic Fines (Absher)', 'Traffic Violations Settlement', 300, 'National ID / Iqama', <FileText size={20} />)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bill Payment Input Modal */}
      {selectedService && (
        <Modal
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
        >
          <div style={{ padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(127, 232, 127, 0.15)',
                  color: '#7FE87F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(127, 232, 127, 0.3)',
                }}
              >
                {selectedService.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{selectedService.title}</h3>
                <p style={{ fontSize: '12px', color: '#A2A2BA', margin: '2px 0 0 0' }}>{selectedService.subTitle}</p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="modal-acc-input" style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                Account / Consumer Number
              </label>
              <input
                id="modal-acc-input"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={selectedService.placeholder}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1px solid #2C2C44',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="modal-amt-input" style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>
                Amount (SAR)
              </label>
              <input
                id="modal-amt-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#1E1E32',
                  border: '1.5px solid #7FE87F',
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#7FE87F',
                  outline: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
            </div>

            <PrimaryButton onClick={handleProceedPayment}>
              Pay Now <Check size={18} />
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
};
