import React, { useState, useEffect } from 'react';
import { X, User as UserIcon, Phone, Mail, AtSign, CheckCircle2 } from 'lucide-react';
import { useApp } from '../state/AppContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useApp();

  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [upiId, setUpiId] = useState(user.upiId);
  const [email, setEmail] = useState(user.email);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setMobile(user.mobile);
      setUpiId(user.upiId);
      setEmail(user.email);
      setSuccessMsg(false);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      mobile,
      upiId,
      email,
    });
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1200);
  };

  return (
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
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '24px',
          boxShadow: '0 -10px 40px rgba(17, 17, 68, 0.2)',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>Edit Profile</h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '4px 0 0 0' }}>Update your personal & UPI details</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F4F1EC',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#5C564D',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {successMsg ? (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="#F98513" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111144', margin: 0 }}>Profile Updated Successfully!</h4>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#F98513' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #DAD1C8',
                    backgroundColor: '#F4F1EC',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#111144',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '6px' }}>
                Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#F98513' }} />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #DAD1C8',
                    backgroundColor: '#F4F1EC',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#111144',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* UPI ID */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '6px' }}>
                UPI ID
              </label>
              <div style={{ position: 'relative' }}>
                <AtSign size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#F98513' }} />
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #DAD1C8',
                    backgroundColor: '#F4F1EC',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#111144',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#5C564D', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#F98513' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #DAD1C8',
                    backgroundColor: '#F4F1EC',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#111144',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1.5px solid #DAD1C8',
                  backgroundColor: '#F4F1EC',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#5C564D',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: '#F98513',
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 133, 19, 0.35)',
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
