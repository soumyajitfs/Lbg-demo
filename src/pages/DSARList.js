import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ticketRecords } from "../data/mockData";

const getStatusBadge = (status) => {
  switch (status) {
    case "Open":
      return "bg-primary";
    case "In Progress":
      return "bg-warning text-dark";
    case "Completed":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

const getBrandBadge = (brand) => {
  switch (brand) {
    case "Asset Finance":
      return "bg-info text-dark";
    case "HBOS Mixed":
      return "bg-purple";
    case "Lloyds Mixed":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

const DSARList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredRecords = useMemo(() => {
    if (!filterValue.trim()) return ticketRecords;
    const val = filterValue.trim().toLowerCase();
    return ticketRecords.filter((r) =>
      r.caseId.toLowerCase().includes(val)
    );
  }, [filterValue]);

  // Dashboard summary
  const totalCases = ticketRecords.length;
  const openCases = ticketRecords.filter((r) => r.status === "Open").length;
  const inProgressCases = ticketRecords.filter((r) => r.status === "In Progress").length;
  const completedCases = ticketRecords.filter((r) => r.status === "Completed").length;

  return (
    <div className="container-fluid px-4 mt-4 animate-fade-in">
      <h3 className="page-title mb-4" id="page-title">
        Case Management System
      </h3>

      {/* Dashboard Summary Cards */}
      <div className="row g-3 mb-4" id="dashboard-summary">
        {[
          { label: "Total Cases", value: totalCases, color: "var(--lbg-green, #006a4e)" },
          { label: "Open", value: openCases, color: "#0d6efd" },
          { label: "In Progress", value: inProgressCases, color: "#ffc107" },
          { label: "Completed", value: completedCases, color: "#198754" },
        ].map((item, i) => (
          <div className="col-md-3 col-sm-6" key={item.label}>
            <div
              className="card summary-card shadow-sm text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="card-body">
                <div className="stat-label">{item.label}</div>
                <div className="stat-value" style={{ color: item.color }}>
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search / Filter Bar */}
      <div className="card search-card shadow-sm mb-4" id="search-section">
        <div className="card-body py-3 px-4">
          <div className="row align-items-end g-3">
            <div className="col-md-4">
              <label htmlFor="input-dsar-id" className="form-label">
                Filter by DSAR ID
              </label>
              <input
                type="text"
                className="form-control"
                id="input-dsar-id"
                name="dsarId"
                placeholder="e.g. DSAR-001"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button
                type="button"
                className="btn btn-lbg px-4"
                id="btn-search"
                onClick={() => {}}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-3"
                id="btn-clear"
                onClick={() => {
                  setFilterValue("");
                  setSelectedTicket(null);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card shadow-sm border-0 animate-fade-in-delay">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" id="table-tickets">
              <thead>
                <tr>
                  <th className="py-3 ps-3" style={{ width: 40 }}></th>
                  <th className="py-3">DSAR ID</th>
                  <th className="py-3">DSAR Type</th>
                  <th className="py-3">Brand Name</th>
                  <th className="py-3">Customer Name</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Created Date</th>
                </tr>
              </thead>
              <tbody id="table-tickets-body">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🔍</div>
                      No cases found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => {
                    const isSelected = selectedTicket?.caseId === record.caseId;
                    return (
                      <tr
                        key={record.caseId}
                        data-case-id={record.caseId}
                        className={isSelected ? "table-active" : ""}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedTicket(record)}
                        id={`row-${record.caseId}`}
                      >
                        <td className="ps-3 text-center">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="ticket-select"
                            id={`radio-${record.caseId}`}
                            checked={isSelected}
                            onChange={() => setSelectedTicket(record)}
                            aria-label={`Select ${record.caseId}`}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/dsar/${record.caseId}`}
                            className="fw-semibold text-decoration-none"
                            id={`link-case-${record.caseId}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {record.caseId}
                          </Link>
                        </td>
                        <td id={`dsar-type-${record.caseId}`}>
                          {record.dsarType}
                        </td>
                        <td>
                          <span className={`badge ${getBrandBadge(record.brandName)}`}>
                            {record.brandName}
                          </span>
                        </td>
                        <td>{record.customerName}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>{record.createdDate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer: record count */}
      <div className="mt-3 mb-4">
        <div className="text-muted small" id="record-count">
          Showing {filteredRecords.length} of {ticketRecords.length} cases
        </div>
      </div>
    </div>
  );
};

export default DSARList;
