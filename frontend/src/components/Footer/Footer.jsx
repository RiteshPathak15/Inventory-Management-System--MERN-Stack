// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Hardware Shop. All rights reserved.</p>
        <div className="mt-2">
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
