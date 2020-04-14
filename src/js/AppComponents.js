// UI Components ============================================================
import Modal from './components/Modal';
import MediaPlayer from './components/MediaPlayer';
import PressYearNav from './nav/PressYearNav';
import Accordion from './ui/Accordion';
import MobileNav from './nav/mobileNav';
import CtaBelow from './features/ctabelow';
import ManAccDropdown from './ui/ManAccDropdown';
import CCPA from './features/CCPA';

// MEDIA Components ============================================================
// const DynComponent = () => import('./DynamicComponent');

// NAV Component

const AppComponents = {
  CtaBelow,
  CCPA,
  // UI Components ------------------------------------------------------------
  Modal,
  MediaPlayer,
  // Nav Components ------------------------------------------------------------
  PressYearNav,
  Accordion,
  MobileNav,
  ManAccDropdown
};

export default AppComponents;
