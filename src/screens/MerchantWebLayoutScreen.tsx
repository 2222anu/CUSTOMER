import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Landmark,
  Download,
  Plus,
  X,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { formatCurrency } from '../utils/formatters';
import { AlphPayLogo } from '../components/AlphPayLogo';
import { ZatcaLogo } from '../components/ZatcaLogo';
import { SamaLogo } from '../components/SamaLogo';
import { PrimaryButton } from '../components/PrimaryButton';

export const MerchantWebLayoutScreen: React.FC = () => {
  const {
    merchantInfo,
    merchantCollections,
    cashiers,
    addCashier,
    toggleCashierStatus,
    navigateTo,
    setUserRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'cashiers' | 'zatca' | 'settlement'>('overview');
  const [isAddCashierOpen, setIsAddCashierOpen] = useState(false);
  const [newCashierName, setNewCashierName] = useState('');
  const [newCashierRole, setNewCashierRole] = useState<'Cashier' | 'Supervisor' | 'Manager'>('Cashier');
  const [newCashierPin, setNewCashierPin] = useState('');
  const [newCashierTerminal] = useState('Terminal 04 (Counter A)');
  const [exportSuccess, setExportSuccess] = useState(false);

  const totalRevenue = merchantCollections.reduce((acc, c) => acc + (c.status === 'settled' ? c.amount : 0), 0) + 125000;
  const totalVat = Number((totalRevenue - totalRevenue / 1.15).toFixed(2));
  const softPosCount = merchantCollections.filter((c) => c.paymentMethod.startsWith('softpos')).length + 842;

  const handleAddCashierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCashierName.trim() || newCashierPin.length < 4) return;
    addCashier({
      name: newCashierName,
      role: newCashierRole,
      pin: newCashierPin,
      terminal: newCashierTerminal,
      active: true,
    });
    setNewCashierName('');
    setNewCashierPin('');
    setIsAddCashierOpen(false);
  };

  const handleExportZatcaCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "InvoiceID,OrderRef,AmountSAR,VATAmountSAR,NetAmountSAR,Method,Timestamp,Status\n"
      + merchantCollections.map(c => `${c.id},${c.orderRef},${c.amount},${c.vatAmount},${c.netAmount},${c.paymentMethod},${c.timestamp.toISOString()},${c.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ZATCA_Tax_Report_${merchantInfo.crNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      {/* Top Web Portal Master Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#151524',
          borderBottom: '1px solid #2C2C44',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AlphPayLogo variant="horizontal" size={24} themeMode="dark" />
          <div style={{ height: '20px', width: '1px', backgroundColor: '#2C2C44' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
              {merchantInfo.businessName}
            </span>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#7FE87F', backgroundColor: 'rgba(127, 232, 127, 0.12)', padding: '2px 8px', borderRadius: '10px' }}>
              Web Admin Portal
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => navigateTo('MERCHANT_HOME')}
            className="interactive-tap"
            style={{
              backgroundColor: '#1E1E32',
              border: '1px solid #2C2C44',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Smartphone size={14} color="#7FE87F" /> Mobile POS View
          </button>

          <button
            onClick={() => {
              setUserRole('customer');
              navigateTo('HOME');
            }}
            className="interactive-tap"
            style={{
              backgroundColor: '#7FE87F',
              color: '#000000',
              border: 'none',
              borderRadius: '10px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Switch to Personal
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 70px)' }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: '240px',
            backgroundColor: '#0B0B14',
            borderRight: '1px solid #2C2C44',
            padding: '20px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
              { id: 'cashiers', label: 'Cashiers & Terminals', icon: <Users size={18} /> },
              { id: 'zatca', label: 'ZATCA Tax E-Invoicing', icon: <FileText size={18} /> },
              { id: 'settlement', label: 'Sarie Payouts', icon: <Landmark size={18} /> },
            ].map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className="interactive-tap"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'rgba(127, 232, 127, 0.12)' : 'transparent',
                    border: isSelected ? '1px solid rgba(127, 232, 127, 0.3)' : '1px solid transparent',
                    color: isSelected ? '#7FE87F' : '#A2A2BA',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ padding: '14px', backgroundColor: '#151524', borderRadius: '14px', border: '1px solid #2C2C44' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>
              Settlement Rail
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
              {merchantInfo.settlementBank}
            </div>
            <div style={{ fontSize: '10.5px', color: '#7FE87F', marginTop: '2px', fontFamily: 'monospace' }}>
              {merchantInfo.settlementIban.substring(0, 14)}•••
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '24px', boxSizing: 'border-box', overflowY: 'auto' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#FFFFFF' }}>
                    Revenue & Collections Overview
                  </h2>
                  <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
                    Real-time consolidated analytics across all store POS terminals
                  </p>
                </div>

                <button
                  onClick={handleExportZatcaCsv}
                  className="interactive-tap"
                  style={{
                    backgroundColor: '#1E1E32',
                    border: '1px solid #2C2C44',
                    color: '#7FE87F',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={15} /> Export Audit CSV
                </button>
              </div>

              {exportSuccess && (
                <div style={{ backgroundColor: 'rgba(127, 232, 127, 0.15)', border: '1px solid #7FE87F', borderRadius: '12px', padding: '12px 16px', color: '#7FE87F', fontWeight: 700, fontSize: '13px' }}>
                  ✓ ZATCA E-Invoicing CSV Tax Report successfully downloaded for CR #{merchantInfo.crNumber}.
                </div>
              )}

              {/* KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '18px', padding: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>
                    Total Store Sales
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', marginTop: '6px' }}>
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#7FE87F', marginTop: '6px', fontWeight: 700 }}>
                    +14.8% vs last month
                  </div>
                </div>

                <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '18px', padding: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>
                    ZATCA 15% VAT Collected
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#7FE87F', marginTop: '6px' }}>
                    SAR {totalVat.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#A2A2BA', marginTop: '6px' }}>
                    Auto Tax Provisioned
                  </div>
                </div>

                <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '18px', padding: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>
                    mada SoftPOS Transactions
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', marginTop: '6px' }}>
                    {softPosCount}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#7FE87F', marginTop: '6px' }}>
                    72% of total sales
                  </div>
                </div>

                <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '18px', padding: '18px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>
                    Active Terminals
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '24px', fontWeight: 900, color: '#FFFFFF', marginTop: '6px' }}>
                    {cashiers.filter(c => c.active).length} / {cashiers.length}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#7FE87F', marginTop: '6px' }}>
                    100% SAMA Uptime
                  </div>
                </div>
              </div>

              {/* Collections Bar Chart Visualization */}
              <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '20px', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 2px 0', color: '#FFFFFF' }}>
                      Weekly Collections Trend (SAR)
                    </h3>
                    <span style={{ fontSize: '12px', color: '#A2A2BA' }}>Sarie and mada Contactless Settlements</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#7FE87F' }}>
                    Week 38 &bull; 2026
                  </span>
                </div>

                {/* SVG Visual Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '180px', paddingTop: '20px' }}>
                  {[
                    { day: 'Sun', sar: 14200, height: '65%' },
                    { day: 'Mon', sar: 18900, height: '80%' },
                    { day: 'Tue', sar: 21500, height: '92%' },
                    { day: 'Wed', sar: 16800, height: '72%' },
                    { day: 'Thu', sar: 24300, height: '100%' },
                    { day: 'Fri', sar: 19800, height: '85%' },
                    { day: 'Sat', sar: 22100, height: '95%' },
                  ].map((d) => (
                    <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '48px' }}>
                      <div style={{ fontSize: '11px', color: '#A2A2BA', fontWeight: 700 }}>
                        {d.sar >= 1000 ? `${(d.sar / 1000).toFixed(1)}k` : d.sar}
                      </div>
                      <div
                        style={{
                          width: '32px',
                          height: d.height,
                          background: 'linear-gradient(180deg, #7FE87F 0%, rgba(127, 232, 127, 0.2) 100%)',
                          borderRadius: '8px 8px 3px 3px',
                          transition: 'height 0.4s ease',
                        }}
                      />
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFFFFF' }}>{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CASHIERS & TERMINALS */}
          {activeTab === 'cashiers' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#FFFFFF' }}>
                    Cashiers & POS Terminals
                  </h2>
                  <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
                    Manage cashier permissions, sub-terminals, and SoftPOS PIN overrides
                  </p>
                </div>

                <PrimaryButton onClick={() => setIsAddCashierOpen(true)}>
                  <Plus size={16} /> Add New Cashier
                </PrimaryButton>
              </div>

              {/* Cashiers Table */}
              <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #2C2C44', color: '#A2A2BA', backgroundColor: '#10101C' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Cashier Name</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Role</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Assigned Terminal</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800 }}>Status</th>
                      <th style={{ padding: '14px 18px', fontWeight: 800, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashiers.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #2C2C44' }}>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#FFFFFF' }}>{c.name}</td>
                        <td style={{ padding: '14px 18px', color: '#7FE87F', fontWeight: 700 }}>{c.role}</td>
                        <td style={{ padding: '14px 18px', color: '#A2A2BA' }}>{c.terminal}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span
                            style={{
                              backgroundColor: c.active ? 'rgba(127, 232, 127, 0.15)' : 'rgba(255, 107, 107, 0.15)',
                              color: c.active ? '#7FE87F' : '#FF6B6B',
                              padding: '3px 8px',
                              borderRadius: '8px',
                              fontWeight: 800,
                              fontSize: '11px',
                            }}
                          >
                            {c.active ? 'ACTIVE' : 'SUSPENDED'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleCashierStatus(c.id)}
                            style={{
                              backgroundColor: '#1E1E32',
                              border: '1px solid #2C2C44',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              padding: '5px 10px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {c.active ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ZATCA TAX E-INVOICING */}
          {activeTab === 'zatca' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(56, 171, 195, 0.12)',
                      border: '1px solid rgba(56, 171, 195, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ZatcaLogo variant="icon" size={28} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#FFFFFF' }}>
                      ZATCA Phase 2 E-Invoicing Ledger
                    </h2>
                    <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
                      Mandatory cryptographic compliance with ZATCA (Fatoora platform)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleExportZatcaCsv}
                  className="interactive-tap"
                  style={{
                    backgroundColor: '#7FE87F',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 18px',
                    fontSize: '13px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={16} /> Export ZATCA XML / CSV Audit
                </button>
              </div>

              {/* Tax Information Card */}
              <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '20px', padding: '22px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>Tax Identification (VAT ID)</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px', fontFamily: 'monospace' }}>{merchantInfo.vatNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>Commercial Registration (CR)</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>{merchantInfo.crNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>ZATCA Platform Status</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#7FE87F', marginTop: '4px' }}>✓ Phase 2 Enrolled & Verified</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SARIE PAYOUTS */}
          {activeTab === 'settlement' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#FFFFFF' }}>
                    Sarie Bank Settlements
                  </h2>
                  <p style={{ fontSize: '13px', color: '#A2A2BA', margin: 0 }}>
                    Automated daily payouts directly to registered Saudi Corporate IBAN
                  </p>
                </div>
                <SamaLogo height={22} themeMode="green" />
              </div>

              <div style={{ backgroundColor: '#151524', border: '1px solid #2C2C44', borderRadius: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase' }}>Primary Settlement Bank</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>{merchantInfo.settlementBank}</div>
                    <div style={{ fontSize: '13px', color: '#7FE87F', marginTop: '2px', fontFamily: 'monospace' }}>{merchantInfo.settlementIban}</div>
                  </div>
                  <span style={{ backgroundColor: 'rgba(127, 232, 127, 0.15)', color: '#7FE87F', border: '1px solid #7FE87F', padding: '6px 14px', borderRadius: '10px', fontWeight: 800, fontSize: '12px' }}>
                    Sarie Active
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #2C2C44', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#A2A2BA' }}>Next Batch Payout: Tonight at 12:00 AM (Estimated SAR {totalRevenue.toLocaleString()})</span>
                  <button
                    onClick={() => alert('Manual instant Sarie payout initiated to ' + merchantInfo.settlementBank)}
                    style={{
                      backgroundColor: '#7FE87F',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Trigger Instant Payout Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Cashier Modal */}
      {isAddCashierOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setIsAddCashierOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#151524',
              border: '1px solid #2C2C44',
              borderRadius: '22px',
              padding: '24px 22px',
              boxSizing: 'border-box',
              color: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>Add New Cashier</h3>
              <button
                onClick={() => setIsAddCashierOpen(false)}
                style={{ background: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A2A2BA', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddCashierSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={newCashierName}
                  onChange={(e) => setNewCashierName(e.target.value)}
                  placeholder="e.g. Faisal Al-Otaibi"
                  required
                  style={{ backgroundColor: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '12px', padding: '12px', color: '#FFFFFF', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Role Permission
                </label>
                <select
                  value={newCashierRole}
                  onChange={(e) => setNewCashierRole(e.target.value as any)}
                  style={{ backgroundColor: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '12px', padding: '12px', color: '#FFFFFF', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none' }}
                >
                  <option value="Cashier">Cashier (POS Sales Only)</option>
                  <option value="Supervisor">Supervisor (Sales + Refunds)</option>
                  <option value="Manager">Manager (Full Terminal Admin)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#A2A2BA', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  4-Digit Terminal Login PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={newCashierPin}
                  onChange={(e) => setNewCashierPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  required
                  style={{ backgroundColor: '#1E1E32', border: '1px solid #2C2C44', borderRadius: '12px', padding: '12px', color: '#FFFFFF', fontSize: '16px', width: '100%', boxSizing: 'border-box', outline: 'none', letterSpacing: '0.2em' }}
                />
              </div>

              <div style={{ marginTop: '8px' }}>
                <PrimaryButton type="submit" disabled={!newCashierName.trim() || newCashierPin.length < 4}>
                  Create Cashier Account
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
