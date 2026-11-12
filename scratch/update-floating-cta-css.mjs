import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

const startIndex = css.indexOf('@media (max-width: 768px) {\r\n  .back-to-top {') !== -1 
  ? css.indexOf('@media (max-width: 768px) {\r\n  .back-to-top {')
  : css.indexOf('@media (max-width: 768px) {\n  .back-to-top {');

const endMarker = '/* ================================================================\n   STAGE D:';
const endMarkerCRLF = '/* ================================================================\r\n   STAGE D:';

let endIndex = css.indexOf(endMarkerCRLF);
if (endIndex === -1) {
  endIndex = css.indexOf(endMarker);
}

if (startIndex === -1 || endIndex === -1) {
  console.error('Indices not found!', { startIndex, endIndex });
  process.exit(1);
}

const replacement = `/* ── BACK TO TOP (Positioned above corner WhatsApp button) ── */
.back-to-top {
  bottom: 92px;
  right: 24px;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: calc(78px + env(safe-area-inset-bottom, 0px));
    right: 20px;
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 769px) {
  @media (hover: hover) {
    .back-to-top:hover {
      background-color: #1746CE;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 24px rgba(23, 70, 206, 0.35);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress-bar {
    display: none !important;
  }
  .back-to-top {
    transition: none !important;
  }
}

/* ── CORNER WHATSAPP FLOATING ACTION BUTTON ── */
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #25D366;
  color: #FFFFFF !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.42), 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.2s ease,
              box-shadow 0.25s ease;
  cursor: pointer;
  animation: whatsappPulse 5s infinite cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes whatsappPulse {
  0%, 75%, 100% {
    box-shadow: 0 4px 18px rgba(37, 211, 102, 0.42), 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  15% {
    box-shadow: 0 0 0 8px rgba(37, 211, 102, 0.35), 0 4px 18px rgba(37, 211, 102, 0.42);
  }
  30% {
    box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 4px 18px rgba(37, 211, 102, 0.42);
  }
}

.whatsapp-float:hover {
  background-color: #1EBE5D;
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 8px 26px rgba(37, 211, 102, 0.55), 0 2px 8px rgba(0, 0, 0, 0.2);
  animation-play-state: paused;
}

.whatsapp-float:focus-visible {
  outline: 3px solid #101B3D;
  outline-offset: 3px;
}

@media (max-width: 768px) {
  .whatsapp-float {
    bottom: calc(18px + env(safe-area-inset-bottom, 0px));
    right: 16px;
    width: 52px;
    height: 52px;
  }
  .whatsapp-float svg {
    width: 28px;
    height: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-float {
    animation: none !important;
    transition: none !important;
  }
}

`;

const before = css.slice(0, startIndex);
const after = css.slice(endIndex);

css = before + replacement + after;
fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Successfully replaced floating-cta with corner whatsapp-float in style.css');
