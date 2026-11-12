import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

const startMarker = '.mobile-menu-overlay {';
const endMarker = '/* ================================================================\r\n   RESPONSIVE - below 900px';
const endMarkerLF = '/* ================================================================\n   RESPONSIVE - below 900px';

const startIndex = css.indexOf(startMarker);
let endIndex = css.indexOf(endMarker);
if (endIndex === -1) endIndex = css.indexOf(endMarkerLF);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found in style.css', { startIndex, endIndex });
  process.exit(1);
}

const newCss = `/* ================================================================
   MOBILE SIDE NAVIGATION DRAWER (Simple Side Navbar)
================================================================ */
.mobile-side-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background-color: rgba(11, 31, 58, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}

.mobile-side-overlay--open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.mobile-side-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(300px, 82vw);
  height: 100vh;
  height: 100dvh;
  background-color: #FFFFFF;
  z-index: 9999;
  box-shadow: -8px 0 28px rgba(11, 31, 58, 0.16);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  padding: 20px 18px 24px;
}

.mobile-side-drawer--open {
  transform: translateX(0);
}

.mobile-side-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4px;
}

.mobile-side-drawer__logo-img {
  width: 130px;
  height: auto;
  max-height: 44px;
  object-fit: contain;
}

.mobile-side-drawer__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background-color: #f1f5f9;
  color: #0B1F3A;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.mobile-side-drawer__close-btn:hover {
  background-color: #e2e8f0;
  transform: rotate(90deg);
}

.mobile-side-drawer__divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 14px 0 16px;
}

.mobile-side-drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-side-drawer__item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-side-drawer__link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 10px;
  color: #0B1F3A;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.mobile-side-drawer__link:hover {
  background-color: #f1f5f9;
  color: #1746CE;
}

.mobile-side-drawer__link--active {
  background-color: #eff6ff;
  color: #1746CE;
  font-weight: 700;
}

.mobile-side-drawer__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1746CE;
  flex-shrink: 0;
}

.mobile-side-drawer__icon svg {
  width: 20px;
  height: 20px;
}

.mobile-side-drawer__footer {
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-side-drawer__whatsapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  background-color: #25D366;
  color: #FFFFFF !important;
  font-size: var(--fs-sm);
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
}

.mobile-side-drawer__call-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  background-color: #1746CE;
  color: #FFFFFF !important;
  font-size: var(--fs-sm);
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none;
}

.mobile-side-drawer__shop-info {
  font-size: 0.72rem;
  color: #64748B;
  text-align: center;
  margin-top: 4px;
  line-height: 1.3;
}

@media (min-width: 900px) {
  .mobile-side-overlay,
  .mobile-side-drawer {
    display: none !important;
  }
}

`;

const updatedCss = css.slice(0, startIndex) + newCss + css.slice(endIndex);
fs.writeFileSync('frontend/style.css', updatedCss, 'utf8');
console.log('Successfully updated style.css with mobile side drawer styles');

