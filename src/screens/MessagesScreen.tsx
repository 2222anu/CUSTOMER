import React, { useState } from 'react';
import { Send, X, Shield, CheckCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

interface ChatThread {
  id: string;
  name: string;
  avatarInitials: string;
  isSupport?: boolean;
  messages: { sender: 'me' | 'them'; text: string; time: string }[];
  time: string;
  unread: boolean;
}

export const MessagesScreen: React.FC = () => {
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 'chat-1',
      name: 'QTPay Support Bot',
      avatarInitials: 'QT',
      isSupport: true,
      time: '10:42 AM',
      unread: true,
      messages: [
        { sender: 'them', text: 'Hello Anu! Welcome to QTPay 24/7 Support.', time: '10:40 AM' },
        { sender: 'them', text: 'Your electricity bill payment of ₹2,620.14 was successful. UTR: 948201849204', time: '10:42 AM' },
      ],
    },
    {
      id: 'chat-2',
      name: 'ICICI Bank Official',
      avatarInitials: 'IC',
      isSupport: true,
      time: '10:41 AM',
      unread: false,
      messages: [
        { sender: 'them', text: 'Alert: A/c ****3616 debited by ₹2,620.14 on 10-Sep-26. Info: QTPay Electricity.', time: '10:41 AM' },
      ],
    },
    {
      id: 'chat-3',
      name: 'Rahul Sharma',
      avatarInitials: 'RS',
      time: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'me', text: 'Sent you ₹500 for dinner split!', time: 'Yesterday 8:30 PM' },
        { sender: 'them', text: 'Thanks for the quick transfer Anu! Got it.', time: 'Yesterday 8:32 PM' },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);
  const [inputText, setInputText] = useState('');

  const handleOpenChat = (thread: ChatThread) => {
    setActiveChat(thread);
    // Mark as read
    setThreads((prev) =>
      prev.map((t) => (t.id === thread.id ? { ...t, unread: false } : t))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const newMsg = {
      sender: 'me' as const,
      text: inputText.trim(),
      time: 'Just now',
    };

    const updatedMessages = [...activeChat.messages, newMsg];
    setActiveChat({ ...activeChat, messages: updatedMessages });

    setThreads((prev) =>
      prev.map((t) => (t.id === activeChat.id ? { ...t, messages: updatedMessages, time: 'Just now' } : t))
    );

    setInputText('');

    // Simulated Auto-Reply if Support
    if (activeChat.isSupport) {
      setTimeout(() => {
        const replyMsg = {
          sender: 'them' as const,
          text: 'Thank you for your message! Our automated support system has logged your query.',
          time: 'Just now',
        };
        setActiveChat((curr) => (curr && curr.id === activeChat.id ? { ...curr, messages: [...curr.messages, replyMsg] } : curr));
      }, 1000);
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: '#F4F1EC', minHeight: '100%', paddingBottom: '30px' }}>
      <AppHeader title="Messages & Alerts" showBack showSettings={false} />

      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#5C564D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', marginLeft: '4px' }}>
          Conversations & System Alerts
        </div>

        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => handleOpenChat(thread)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              border: thread.unread ? '1.5px solid #F98513' : '1.5px solid #DAD1C8',
              borderRadius: '20px',
              marginBottom: '12px',
              cursor: 'pointer',
              boxShadow: thread.unread ? '0 4px 14px rgba(249, 133, 19, 0.15)' : '0 4px 10px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: thread.isSupport ? '#111144' : '#F98513',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                {thread.avatarInitials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>{thread.name}</span>
                  {thread.isSupport && <Shield size={14} color="#F98513" />}
                </div>
                <div style={{ fontSize: '12px', color: '#5C564D', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {thread.messages[thread.messages.length - 1]?.text}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: thread.unread ? '#F98513' : '#5C564D', marginLeft: '10px' }}>
              {thread.time}
            </div>
          </div>
        ))}
      </div>

      {/* Live Interactive Chat Modal Window */}
      {activeChat && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17, 17, 68, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setActiveChat(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              height: '85vh',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px rgba(17, 17, 68, 0.2)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Window Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #DAD1C8',
                backgroundColor: '#111144',
                color: '#FFFFFF',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F98513',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {activeChat.avatarInitials}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>{activeChat.name}</div>
                  <div style={{ fontSize: '11px', color: '#A4BCEE' }}>Online • QTPay Messaging</div>
                </div>
              </div>
              <button
                onClick={() => setActiveChat(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#F4F1EC' }}>
              {activeChat.messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    backgroundColor: msg.sender === 'me' ? '#F98513' : '#FFFFFF',
                    color: msg.sender === 'me' ? '#FFFFFF' : '#111144',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'me' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.4' }}>{msg.text}</div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: msg.sender === 'me' ? 'rgba(255,255,255,0.8)' : '#5C564D',
                      textAlign: 'right',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '4px',
                    }}
                  >
                    {msg.time}
                    {msg.sender === 'me' && <CheckCheck size={12} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Send Input Box */}
            <form onSubmit={handleSendMessage} style={{ padding: '14px 16px', borderTop: '1px solid #DAD1C8', backgroundColor: '#FFFFFF', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '20px',
                  border: '1.5px solid #DAD1C8',
                  backgroundColor: '#F4F1EC',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111144',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#F98513',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(249, 133, 19, 0.35)',
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
