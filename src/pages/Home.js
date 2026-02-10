import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold" style={{ color: "#006a4e" }}>
          LBG Demo Applications
        </h1>
        <p className="lead text-muted mt-3">
          UiPath Automation Demo — Select an application below to explore.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {/* Website 1 Card */}
        <div className="col-md-5">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header text-white py-3">
              <h5 className="mb-0">Website 1 — Ticketing / Case Management</h5>
            </div>
            <div className="card-body d-flex flex-column">
              <p className="card-text text-muted">
                The source system where the Product ID is available. View all
                tickets, search by Product ID, and navigate to the Document Repository.
              </p>
              <ul className="list-unstyled text-muted small mb-4">
                <li className="mb-1">✓ Dashboard with summary cards</li>
                <li className="mb-1">✓ Search / filter by Product ID</li>
                <li className="mb-1">✓ Select a ticket and go to Document Repository</li>
                <li className="mb-1">✓ RPA-friendly selectors</li>
              </ul>
              <Link
                to="/dsar"
                className="btn mt-auto text-white"
                style={{ backgroundColor: "#006a4e" }}
                id="btn-open-ticketing"
              >
                Open Ticketing System →
              </Link>
            </div>
          </div>
        </div>

        {/* Website 2 Card */}
        <div className="col-md-5">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header text-white py-3">
              <h5 className="mb-0">Website 2 — Document Repository</h5>
            </div>
            <div className="card-body d-flex flex-column">
              <p className="card-text text-muted">
                The target system for UiPath automation. Search by Product ID,
                browse records, view attachments, and download documents.
              </p>
              <ul className="list-unstyled text-muted small mb-4">
                <li className="mb-1">✓ Search by Product ID (pre-filled from Ticketing)</li>
                <li className="mb-1">✓ Multiple records per Product ID</li>
                <li className="mb-1">✓ View attachments per record</li>
                <li className="mb-1">✓ Downloadable documents</li>
              </ul>
              <Link
                to="/record-keeping"
                className="btn mt-auto text-white"
                style={{ backgroundColor: "#006a4e" }}
                id="btn-open-doc-repo"
              >
                Open Document Repository →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* UiPath Flow Diagram */}
      <div className="card shadow-sm border-0 mt-5">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3" style={{ color: "#006a4e" }}>
            UiPath Automation Flow
          </h5>
          <div className="row text-center">
            <div className="col-md-3">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 48, height: 48, backgroundColor: "#006a4e", color: "#fff", fontSize: "1.25rem", fontWeight: "bold" }}
              >
                1
              </div>
              <p className="small text-muted">
                Bot opens <strong>Ticketing System</strong> and reads the <strong>Product ID</strong> from a case
              </p>
            </div>
            <div className="col-md-1 d-flex align-items-center justify-content-center">
              <span className="fs-4 text-muted">→</span>
            </div>
            <div className="col-md-3">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 48, height: 48, backgroundColor: "#006a4e", color: "#fff", fontSize: "1.25rem", fontWeight: "bold" }}
              >
                2
              </div>
              <p className="small text-muted">
                Bot opens <strong>Document Repository</strong>, enters the Product ID, and clicks Search
              </p>
            </div>
            <div className="col-md-1 d-flex align-items-center justify-content-center">
              <span className="fs-4 text-muted">→</span>
            </div>
            <div className="col-md-3">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: 48, height: 48, backgroundColor: "#006a4e", color: "#fff", fontSize: "1.25rem", fontWeight: "bold" }}
              >
                3
              </div>
              <p className="small text-muted">
                Bot clicks each record, views attachments, and <strong>downloads</strong> all documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

