import React from 'react';
import loaderLogo from '../assets/PDT2.png';
import '../App.css';

/**
 * Reusable Loader component that displays a centered logo overlay,
 * styled identically to the LandingPage loader.
 */
export default function Loader() {
  return (
    <div className="loader-overlay">
      <img src={loaderLogo} alt="Loader Logo" className="loader-logo-big" />
    </div>
  );
}
