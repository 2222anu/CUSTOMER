import React, { useState, useEffect, useRef } from 'react';
import { X, User as UserIcon, Phone, Mail, AtSign, Check, AlertCircle, Camera } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

interface EditProfileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const COLOR_PRESETS = [
  { name: 'Lime Green', color: '#7FE87F' },
  { name: 'Light Mint', color: '#9FEE9F' },
  { name: 'Forest Green', color: '#3F963F' },
  { name: 'Deep Navy', color: '#1A1A2E' },
  { name: 'Card Surface', color: '#2A2A3E' },
  { name: 'Slate Accent', color: '#3A3A52' },
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const { user, updateUser, isEditProfileModalOpen, setIsEditProfileModalOpen } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOpen = propIsOpen !== undefined ? propIsOpen : isEditProfileModalOpen;
  const handleClose = () => {
    if (propOnClose) propOnClose();
    setIsEditProfileModalOpen(false);
  };

  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [upiId, setUpiId] = useState(user.upiId);
  const [email, setEmail] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [avatarBgColor, setAvatarBgColor] = useState(user.avatarBgColor || '#7FE87F');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setMobile(user.mobile);
      setUpiId(user.upiId);
      setEmail(user.email);
      setAvatarUrl(user.avatarUrl || '');
      setAvatarBgColor(user.avatarBgColor || '#7FE87F');
      setErrorMsg('');
      setSuccessMsg(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, user]);

  if (!isOpen) return null;

  const previewInitials = name
    .trim()
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'AP';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!mobile.trim() || mobile.trim().length < 10) {
      setErrorMsg('Please enter a valid mobile number');
      return;
    }
    if (!upiId.trim() || !upiId.includes('@')) {
      setErrorMsg('Please enter a valid UPI ID (e.g. name@alphpay)');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    updateUser({
      name: name.trim(),
      mobile: mobile.trim(),
      upiId: upiId.trim(),
      email: email.trim(),
      avatarUrl: avatarUrl || undefined,
      avatarBgColor,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      handleClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 15, 26, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#2A2A3E',
          border: '1px solid #4D4D6B',
          borderRadius: designSystem.radii.lg,
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 id="edit-profile-title" style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
            Edit Profile Details
          </h3>
          <button
            onClick={handleClose}
            aria-label="Close edit profile modal"
            style={{
              backgroundColor: '#3A3A52',
              border: 'none',
              color: '#B3B3C2',
              width: '32px',
              height: '32px',
              borderRadius: designSystem.radii.full,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Profile Header Preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px',
            backgroundColor: '#1A1A2E',
            borderRadius: designSystem.radii.md,
            marginBottom: '20px',
            border: '1px solid #4D4D6B',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: designSystem.radii.full,
                backgroundColor: avatarBgColor,
                color: '#000000',
                fontWeight: 900,
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '2px solid #2A2A3E',
              }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                previewInitials
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '24px',
                height: '24px',
                borderRadius: designSystem.radii.full,
                backgroundColor: '#7FE87F',
                color: '#000000',
                border: '2px solid #2A2A3E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Upload Profile Picture"
            >
              <Camera size={12} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {name || 'Your Name'}
            </div>
            <div style={{ fontSize: '12px', color: '#7FE87F', fontWeight: 700, marginTop: '2px' }}>
              {upiId || 'upi@alphpay'} &bull; {mobile || '+91...'}
            </div>
          </div>
        </div>

        {/* Color Presets */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#B3B3C2', display: 'block', marginBottom: '8px' }}>
            Choose Avatar Color Theme
          </span>
          <div role="radiogroup" aria-label="Avatar Color Presets" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.color}
                type="button"
                role="radio"
                aria-checked={avatarBgColor === preset.color && !avatarUrl}
                aria-label={preset.name}
                onClick={() => {
                  setAvatarBgColor(preset.color);
                  setAvatarUrl('');
                }}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: designSystem.radii.full,
                  backgroundColor: preset.color,
                  border: avatarBgColor === preset.color && !avatarUrl ? '3px solid #FFFFFF' : '2px solid #2A2A3E',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                  transform: avatarBgColor === preset.color && !avatarUrl ? 'scale(1.15)' : 'scale(1)',
                }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {errorMsg && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: designSystem.radii.md,
              backgroundColor: 'rgba(255, 71, 87, 0.15)',
              border: '1px solid #FF4757',
              color: '#FF4757',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        {successMsg ? (
          <div style={{ padding: '30px 0', textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(127, 232, 127, 0.15)',
                color: '#7FE87F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Check size={28} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Profile Updated Successfully!</h4>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Name */}
            <div>
              <label htmlFor="edit-name-input" style={{ fontSize: '12px', fontWeight: 700, color: '#B3B3C2', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#7FE87F' }} />
                <input
                  id="edit-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: designSystem.radii.md,
                    border: '1px solid #4D4D6B',
                    backgroundColor: '#1A1A2E',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="edit-mobile-input" style={{ fontSize: '12px', fontWeight: 700, color: '#B3B3C2', display: 'block', marginBottom: '6px' }}>
                Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#7FE87F' }} />
                <input
                  id="edit-mobile-input"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: designSystem.radii.md,
                    border: '1px solid #4D4D6B',
                    backgroundColor: '#1A1A2E',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* UPI ID */}
            <div>
              <label htmlFor="edit-upi-input" style={{ fontSize: '12px', fontWeight: 700, color: '#B3B3C2', display: 'block', marginBottom: '6px' }}>
                Primary UPI ID
              </label>
              <div style={{ position: 'relative' }}>
                <AtSign size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#7FE87F' }} />
                <input
                  id="edit-upi-input"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@alphpay"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: designSystem.radii.md,
                    border: '1px solid #4D4D6B',
                    backgroundColor: '#1A1A2E',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="edit-email-input" style={{ fontSize: '12px', fontWeight: 700, color: '#B3B3C2', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#7FE87F' }} />
                <input
                  id="edit-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: designSystem.radii.md,
                    border: '1px solid #4D4D6B',
                    backgroundColor: '#1A1A2E',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Save Action Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#7FE87F',
                color: '#000000',
                border: 'none',
                borderRadius: designSystem.radii.md,
                padding: '14px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Save Profile Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
