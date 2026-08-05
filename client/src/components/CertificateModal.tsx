import React, { useRef } from 'react';
import { Award, Download, CheckCircle, X, ShieldCheck } from 'lucide-react';
import { CertificateItem } from '../services/api';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!certificate) return null;

  const handleDownload = () => {
    // Generate simple printable view window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate_${certificate.certificate_number}</title>
          <style>
            body { font-family: 'Georgia', serif; text-align: center; padding: 40px; background: #fff; color: #1e293b; }
            .cert-box { border: 12px double #4f46e5; padding: 40px; max-width: 800px; margin: 0 auto; background: #fafafa; }
            h1 { font-size: 36px; color: #4338ca; letter-spacing: 2px; }
            .name { font-size: 32px; font-weight: bold; color: #0f172a; margin: 20px 0; border-bottom: 2px solid #6366f1; display: inline-block; padding-bottom: 6px; }
            .event { font-size: 24px; color: #4f46e5; margin: 15px 0; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <h1>CERTIFICATE OF PARTICIPATION</h1>
            <p>This is proudly presented to</p>
            <div class="name">${certificate.student_name || 'Liam Chen'}</div>
            <p>for successfully attending & completing the academic event</p>
            <div class="event">${certificate.event_title || 'AI Summit 2026'}</div>
            <p>Organized by Department of ${certificate.department_name || 'Computer Science & Engineering'}</p>
            <div class="footer">
              <div>
                <strong>Verification ID:</strong> ${certificate.certificate_number}<br/>
                <strong>Issued Date:</strong> ${new Date(certificate.issue_date).toLocaleDateString()}
              </div>
              <div>
                <strong>Authorized Signatory:</strong><br/>
                Dr. Sarah Jenkins (Dean of Student Affairs)
              </div>
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="#6366f1" />
            <h3 style={{ fontSize: '18px' }}>Official Certificate Preview</h3>
          </div>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '6px 12px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Certificate Printable Canvas View */}
        <div
          ref={certRef}
          style={{
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
            border: '8px double #6366f1',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            color: '#0f172a',
            position: 'relative',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '12px', fontWeight: 700 }}>
            <ShieldCheck size={18} />
            VERIFIED CREDENTIAL
          </div>

          <Award size={54} color="#4f46e5" style={{ marginBottom: '12px' }} />
          <h2 style={{ fontSize: '28px', color: '#4338ca', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Certificate of Participation
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>This certificate is proudly awarded to</p>

          <h1 style={{ fontSize: '32px', color: '#0f172a', margin: '16px 0', borderBottom: '2px solid #818cf8', display: 'inline-block', paddingBottom: '4px' }}>
            {certificate.student_name || 'Liam Chen'}
          </h1>

          <p style={{ fontSize: '14px', color: '#475569', maxWidth: '520px', margin: '0 auto 16px' }}>
            for active attendance and completion of the event <strong>"{certificate.event_title || 'Campus Event'}"</strong> organized by the college department.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '36px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1', textAlign: 'left', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#64748b' }}>Certificate Serial:</span>
              <div style={{ fontWeight: 700, color: '#4f46e5' }}>{certificate.certificate_number}</div>
              <span style={{ color: '#64748b' }}>Issue Date:</span>
              <div style={{ fontWeight: 600 }}>{new Date(certificate.issue_date).toLocaleDateString()}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Dancing Script, cursive, serif', fontSize: '20px', fontWeight: 700, color: '#334155' }}>
                Dr. Sarah Jenkins
              </div>
              <div style={{ fontWeight: 600, color: '#64748b' }}>Dean of Student Affairs</div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={18} />
            Download Printable Certificate (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
