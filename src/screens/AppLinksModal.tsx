import React from 'react';
import { X, Smartphone, Globe, Download, CheckCircle2 } from 'lucide-react';
import { QtPayLogo } from '../components/QtPayLogo';
import { useApp } from '../state/AppContext';

export const AppLinksModal: React.FC = () => {
  const { isAppLinksModalOpen, setIsAppLinksModalOpen } = useApp();

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
      onClick={() => setIsAppLinksModalOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
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
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111144', margin: 0 }}>QTPay Application Links</h3>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '4px 0 0 0' }}>Web, Android APK & iOS Access</p>
          </div>
          <button
            onClick={() => setIsAppLinksModalOpen(false)}
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

        {/* Logo Banner */}
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#F4F1EC', borderRadius: '16px', marginBottom: '20px', border: '1.5px solid #DAD1C8' }}>
          <QtPayLogo variant="horizontal" showTagline={true} />
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {/* Web App */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #F98513',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(249, 133, 19, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#FDE8D7',
                    color: '#F98513',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Globe size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>Web Application</div>
                  <div style={{ fontSize: '11px', color: '#F98513', fontWeight: '700' }}>
                    Live Web Version (Active)
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  backgroundColor: '#FDE8D7',
                  color: '#F98513',
                  padding: '4px 8px',
                  borderRadius: '10px',
                }}
              >
                Online
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#5C564D', margin: '4px 0 0 0' }}>
              URL: <code style={{ color: '#F98513', fontWeight: '700' }}>{webUrl}</code>
            </p>
          </div>

          {/* Android App */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#F0F4FD',
                    color: '#7B96D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Smartphone size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>Android Application</div>
                  <div style={{ fontSize: '11px', color: '#5C564D' }}>Google Play & APK Direct</div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  backgroundColor: '#F0F4FD',
                  color: '#7B96D4',
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
                backgroundColor: '#F98513',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(249, 133, 19, 0.3)',
              }}
            >
              <Download size={16} /> Download Android APK
            </button>
          </div>

          {/* iOS App */}
          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #DAD1C8',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#F4F1EC',
                    color: '#111144',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Smartphone size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#111144' }}>iOS Application</div>
                  <div style={{ fontSize: '11px', color: '#5C564D' }}>Apple App Store & TestFlight</div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  backgroundColor: '#F4F1EC',
                  color: '#111144',
                  padding: '4px 8px',
                  borderRadius: '10px',
                }}
              >
                iOS Ready
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#5C564D', justifyContent: 'center' }}>
          <CheckCircle2 size={14} color="#F98513" /> All links are secured and verified for QTPay
        </div>
      </div>
    </div>
  );
};
