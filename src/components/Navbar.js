import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header id="app-header">
      <nav
        className="navbar"
        id="main-navbar"
        style={{
          background: "linear-gradient(135deg, #006a4e 0%, #00856a 80%, #5a9a8a 100%)",
          padding: "12px 0",
          boxShadow: "0 4px 20px rgba(0, 106, 78, 0.3)",
        }}
      >
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
            {/* Logo in white rounded card */}
            <Link
              to="/"
              className="text-decoration-none"
              id="navbar-brand"
              style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                marginRight: "16px",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/lbg-logo.png`}
                alt="Lloyds Banking Group"
                id="lloyds-logo"
                style={{
                  height: "48px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>

            {/* Brand text */}
            <div
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1.15rem",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              Lloyds Banking Group
            </div>
            </div>

            {/* Right: User avatar / logged-in indicator */}
            <div className="d-flex align-items-center gap-3" id="user-profile-section">
              <div className="d-none d-md-flex align-items-center gap-2">
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    lineHeight: 1.2,
                    textAlign: "right",
                  }}
                >
                  Welcome back,
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>James Wilson</div>
                </div>
              </div>
              <div
                id="user-avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.03em",
                  cursor: "default",
                }}
                title="James Wilson"
              >
                JW
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
