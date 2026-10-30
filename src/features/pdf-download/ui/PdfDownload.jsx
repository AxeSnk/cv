import {pdfSrc} from '../../../shared/assets/photo';

export function PdfDownload({label}) {
  return (
    <a className="pdf-btn" href={pdfSrc} download="Aksenov_Alexander_CV.pdf">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </a>
  );
}
