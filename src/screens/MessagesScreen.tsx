import React from 'react';
import { MessageSquare } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

export const MessagesScreen: React.FC = () => {
  const chats = [
    { name: 'QTPay Support', message: 'Your electricity bill payment of ₹2,620.14 was successful.', time: '10:42 AM', unread: true },
    { name: 'ICICI Bank Alerts', message: 'A/c ****3616 debited by ₹2,620.14 on 10-Sep-26.', time: '10:41 AM', unread: false },
    { name: 'Rahul Sharma', message: 'Thanks for the quick transfer!', time: 'Yesterday', unread: false },
  ];

  return (
    <div className="fade-in">
      <AppHeader title="Messages & Chat" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        {chats.map((chat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: 'var(--card-bg)',
              border: chat.unread ? '1px solid var(--neon-primary)' : '1px solid var(--card-border)',
              borderRadius: '16px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(158, 240, 26, 0.15)',
                  color: 'var(--neon-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                }}
              >
                <MessageSquare size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{chat.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chat.message}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
