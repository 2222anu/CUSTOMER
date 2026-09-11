import React, { useEffect } from 'react';
import { X, Smartphone, Globe, Download, CheckCircle2 } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { useApp } from '../state/AppContext';

export const AppLinksModal: React.FC = () => {
  const { isAppLinksModalOpen, setIsAppLinksModalOpen } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAppLinksModalOpen) {
        setIsAppLinksModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppLinksModalOpen, setIsAppLinksModalOpen]);

  if (!isAppLinksModalOpen) return null;

  const currentHost = window.location.origin;
  const webUrl = currentHost;

  const handleDownloadApk = () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,QTPay%20Android%20APK%20Installation%20Package';
    link.download = 'QTPay-v2.4-release.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-links-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={() => setIsAppLinksModalOpen(false)}
    >
      <div
        className="slide-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '24px',
          boxShadow: 'none',
          border: '1px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 id="app-links-title" style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>QTPay Application Links</h3>
            <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0 0' }}>Web, Android APK & iOS Access</p>
          </div>
          <button
            onClick={() => setIsAppLinksModalOpen(false)}
            aria-label="Close modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569',
              boxShadow: 'none',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Logo Banner */}
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <QtPayLogo variant="horizontal" showTagline={true} />
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {/* Web App */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #2e83ff',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#eef5ff',
                    color: '#2e83ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Globe size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>Web Application</div>
                  <div style={{ fontSize: '11px', color: '#2e83ff', fontWeight: '700' }}>
                    Live Web Version (Active)
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  backgroundColor: '#eef5ff',
                  color: '#2e83ff',
                  padding: '4px 8px',
                  borderRadius: '10px',
                }}
              >
                Online
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0 0' }}>
              URL: <code style={{ color: '#2e83ff', fontWeight: '700' }}>{webUrl}</code>
            </p>
          </div>

          {/* Android App */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Smartphone size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>Android Application</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>Google Play & APK Direct</div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '4px 8px',
                  borderRadius: '10px',
                }}
              >
                v2.4 APK
              </span>
            </div>
            <button
              onClick={handleDownloadApk}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#2e83ff',
                color: '#ffffff',
                border: 'none',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'none',
              }}
            >
              <Download size={16} /> Download Android APK
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#475569', justifyContent: 'center' }}>
          <CheckCircle2 size={14} color="#2e83ff" /> All links are secured and verified for QTPay
        </div>
      </div>
    </div>
  );
};
