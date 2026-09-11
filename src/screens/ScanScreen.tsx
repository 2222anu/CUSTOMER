import React, { useState, useEffect, useRef } from 'react';
import { X, Flashlight, Image as ImageIcon, CheckCircle, Zap, Store, Coffee, Train } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { designSystem } from '../design-system';

export const ScanScreen: React.FC = () => {
  const { isScanModalOpen, setIsScanModalOpen, contacts, navigateTo } = useApp();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanSuccessContact, setScanSuccessContact] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Play scanner confirmation beep using Web Audio API
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Start real camera stream
  useEffect(() => {
    if (!isScanModalOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    let isMounted = true;
    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (isMounted) setHasCameraPermission(false);
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setHasCameraPermission(true);
      } catch {
        if (isMounted) setHasCameraPermission(false);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isScanModalOpen]);

  // Toggle Torch/Flashlight
  const toggleFlash = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track) {
      const capabilities = (track.getCapabilities ? track.getCapabilities() : {}) as any;
      if (capabilities.torch) {
        try {
          const nextState = !isFlashOn;
          await (track as any).applyConstraints({ advanced: [{ torch: nextState }] });
          setIsFlashOn(nextState);
        } catch {
          // Torch not supported on this device
        }
      } else {
        setIsFlashOn(!isFlashOn);
      }
    }
  };

  // Trigger successful scan transition
  const handleScanSuccess = (contact: any, amount?: number) => {
    setIsScanning(false);
    setScanSuccessContact(contact);
    playBeep();
    if (navigator.vibrate) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {}
    }

    setTimeout(() => {
      setIsScanModalOpen(false);
      setIsScanning(true);
      setScanSuccessContact(null);
      navigateTo('SEND_AMOUNT', { contact, defaultAmount: amount });
    }, 600);
  };

  // Image upload gallery handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate instant decoding of selected QR image
    const selectedContact = contacts[0] || {
      id: 'merchant-qr-1',
      name: 'Star Supermarket',
      upiId: 'starsupermarket@icici',
      avatarInitials: 'SS',
    };
    handleScanSuccess(selectedContact, 350);
  };

  if (!isScanModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR Code Payment Scanner"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0f1d',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: designSystem.typography.fontFamily,
      }}
    >
      {/* Hidden file input for gallery upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          zIndex: 20,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)',
        }}
      >
        <button
          onClick={() => setIsScanModalOpen(false)}
          aria-label="Close Scanner"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: designSystem.radii.full,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: '700', margin: 0 }}>
            Scan Any UPI QR
          </h2>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
            QtPay Instant Scanner
          </span>
        </div>

        <button
          onClick={toggleFlash}
          aria-label="Toggle Flashlight"
          style={{
            backgroundColor: isFlashOn ? designSystem.colors.primary : 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: designSystem.radii.full,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background-color 0.2s',
          }}
        >
          <Flashlight size={20} />
        </button>
      </div>

      {/* Viewfinder Center Camera Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 20px',
        }}
      >
        {/* Real Live Camera Stream View */}
        {hasCameraPermission && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />
        )}

        {/* Viewfinder Target Box with Corner Reticles */}
        <div
          style={{
            width: '270px',
            height: '270px',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 0 0 4000px rgba(10, 15, 29, 0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: scanSuccessContact
              ? `3px solid ${designSystem.colors.success}`
              : `1.5px solid rgba(46, 131, 255, 0.35)`,
            transition: 'border 0.3s ease',
          }}
        >
          {/* Corner Guides (QtPay Electric Blue) */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              width: 32,
              height: 32,
              borderTop: `4px solid ${designSystem.colors.primary}`,
              borderLeft: `4px solid ${designSystem.colors.primary}`,
              borderTopLeftRadius: '10px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              borderTop: `4px solid ${designSystem.colors.primary}`,
              borderRight: `4px solid ${designSystem.colors.primary}`,
              borderTopRightRadius: '10px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              width: 32,
              height: 32,
              borderBottom: `4px solid ${designSystem.colors.primary}`,
              borderLeft: `4px solid ${designSystem.colors.primary}`,
              borderBottomLeftRadius: '10px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              width: 32,
              height: 32,
              borderBottom: `4px solid ${designSystem.colors.primary}`,
              borderRight: `4px solid ${designSystem.colors.primary}`,
              borderBottomRightRadius: '10px',
            }}
          />

          {/* Animated Laser Scanning Beam */}
          {isScanning && (
            <div
              className="scanner-laser"
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: designSystem.colors.primary,
                position: 'absolute',
                boxShadow: `0 0 12px ${designSystem.colors.primary}, 0 0 4px #ffffff`,
                animation: 'scanLaser 2.2s infinite ease-in-out alternate',
              }}
            />
          )}

          {/* Scan Success Overlay */}
          {scanSuccessContact && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(16, 185, 129, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)',
              }}
            >
              <CheckCircle size={48} color={designSystem.colors.success} />
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>
                QR Verified!
              </span>
            </div>
          )}
        </div>

        {/* Status Guide Text */}
        <p
          style={{
            color: '#e2e8f0',
            fontSize: '13px',
            marginTop: '20px',
            fontWeight: '600',
            zIndex: 10,
            textAlign: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            padding: '6px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
          }}
        >
          {hasCameraPermission === false
            ? 'Camera preview unavailable. Tap any sample merchant below:'
            : 'Point camera at any QR code to pay instantly'}
        </p>

        {/* Quick Sample Merchant Presets for Instant Demo Scanning */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            zIndex: 10,
            overflowX: 'auto',
            maxWidth: '100%',
            padding: '4px',
          }}
        >
          <button
            onClick={() =>
              handleScanSuccess(
                { id: 'm-1', name: 'Star Supermarket', upiId: 'star@hdfc', avatarInitials: 'SS' },
                280
              )
            }
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: designSystem.radii.sm,
              padding: '6px 12px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Store size={13} color={designSystem.colors.primary} /> Star Supermarket
          </button>

          <button
            onClick={() =>
              handleScanSuccess(
                { id: 'm-2', name: 'Third Wave Coffee', upiId: 'thirdwave@icici', avatarInitials: 'TC' },
                180
              )
            }
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: designSystem.radii.sm,
              padding: '6px 12px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Coffee size={13} color="#f59e0b" /> Coffee House
          </button>

          <button
            onClick={() =>
              handleScanSuccess(
                { id: 'm-3', name: 'Metro Recharge', upiId: 'metro@sbi', avatarInitials: 'MR' },
                100
              )
            }
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: designSystem.radii.sm,
              padding: '6px 12px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Train size={13} color="#10b981" /> Metro Card
          </button>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: designSystem.radii.md,
              padding: '12px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <ImageIcon size={16} /> Upload Image
          </button>

          <button
            onClick={() => handleScanSuccess(contacts[0] || { name: 'Priya Menon', upiId: 'priya@paytm' })}
            style={{
              backgroundColor: designSystem.colors.primary,
              border: 'none',
              borderRadius: designSystem.radii.md,
              padding: '12px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: designSystem.shadows.none,
            }}
          >
            <Zap size={16} /> Demo Pay
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scanLaser {
          0% { top: 6%; }
          100% { top: 94%; }
        }
      `}</style>
    </div>
  );
};
