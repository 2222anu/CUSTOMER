import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { TransactionRow } from '../components/TransactionRow';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

type FilterType = 'all' | 'sent' | 'received' | 'pending';

export const HistoryScreen: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'sent'
        ? t.type === 'sent'
        : filter === 'received'
        ? t.type === 'received'
        : t.type === 'pending';

    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subTitle && t.subTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.utr.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const groupedByDate: Record<string, typeof transactions> = {};
  filteredTransactions.forEach((t) => {
    const key = t.date || 'TODAY';
    if (!groupedByDate[key]) groupedByDate[key] = [];
    groupedByDate[key].push(t);
  });

  return (
    <div className="fade-in">
      <AppHeader
        title="Transactions"
        showSearch
        onSearchClick={() => setShowSearchInput(!showSearchInput)}
        showSettings
      />

      {showSearchInput && (
        <div style={{ padding: '0 20px', marginBottom: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: designSystem.colors.surface,
              border: `1px solid ${designSystem.colors.borderHairline}`,
              borderRadius: designSystem.radii.sm,
              padding: '10px 14px',
            }}
          >
            <Search size={16} color={designSystem.colors.textSecondary} />
            <input
              type="text"
              placeholder="Search by payee or UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '13px',
                width: '100%',
              }}
            />
          </div>
        </div>
      )}

      {/* Filter Tabs / Chips */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '0 20px',
          marginBottom: '20px',
          overflowX: 'auto',
        }}
      >
        {(['all', 'sent', 'received', 'pending'] as FilterType[]).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                backgroundColor: isActive ? designSystem.colors.primary : designSystem.colors.surface,
                border: isActive ? `1px solid ${designSystem.colors.primary}` : `1px solid ${designSystem.colors.borderHairline}`,
                color: isActive ? designSystem.colors.textOnPrimary : designSystem.colors.textPrimary,
                borderRadius: designSystem.radii.sm,
                padding: '7px 16px',
                fontSize: '13px',
                fontWeight: designSystem.typography.weights.bold,
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: designSystem.shadows.none,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grouped Transaction Lists */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        {Object.keys(groupedByDate).length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0' }}>
            No transactions found.
          </div>
        ) : (
          Object.entries(groupedByDate).map(([dateLabel, items]) => (
            <div key={dateLabel} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {dateLabel}
              </div>
              {items.map((txn) => (
                <TransactionRow key={txn.id} transaction={txn} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
