import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ticketRecords } from "../data/mockData";

const NoteSection = ({ caseId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        text: newNote.trim(),
        author: "Demo User",
        timestamp,
      },
    ]);
    setNewNote("");
  };

  return (
    <div>
      {/* Existing Notes */}
      {notes.length > 0 && (
        <div className="mb-4" id="notes-list">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className="note-item"
              id={`note-${index}`}
              data-note-id={note.id}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold small" style={{ color: "var(--lbg-green, #006a4e)" }}>
                  {note.author}
                </span>
                <span className="text-muted small">{note.timestamp}</span>
              </div>
              <p className="mb-0" style={{ color: "var(--lbg-text, #212529)" }}>{note.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add New Note */}
      <div id="add-note-section">
        <label htmlFor="input-note" className="form-label">
          Add a Note
        </label>
        <textarea
          className="form-control"
          id="input-note"
          name="note"
          rows="3"
          placeholder="Type your note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="mt-2 d-flex justify-content-end">
          <button
            className="btn btn-lbg px-4"
            id="btn-add-note"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

const DSARDetail = () => {
  const { id } = useParams();
  const record = ticketRecords.find((r) => r.caseId === id);

  if (!record) {
    return (
      <div className="container mt-5 animate-fade-in">
        <div className="alert alert-danger">
          <h5 className="alert-heading">Record Not Found</h5>
          <p className="mb-0">No case found with ID: <strong>{id}</strong></p>
        </div>
        <Link to="/" className="btn btn-outline-secondary mt-3" id="btn-back">
          ← Back to List
        </Link>
      </div>
    );
  }

  const detailFields = [
    { label: "DSAR ID", value: record.caseId, id: "detail-case-id" },
    { label: "Agreement Number", value: record.agreementNumber, id: "detail-agreement-number" },
    { label: "DSAR Type", value: record.dsarType, id: "detail-dsar-type" },
    { label: "Brand Name", value: record.brandName, id: "detail-brand-name" },
    { label: "Customer Name", value: record.customerName, id: "detail-customer-name" },
    { label: "Email", value: record.email, id: "detail-email" },
    { label: "Phone", value: record.phone, id: "detail-phone" },
    { label: "Address", value: record.address, id: "detail-address" },
    { label: "Status", value: record.status, id: "detail-status" },
    { label: "Created Date", value: record.createdDate, id: "detail-created-date" },
  ];

  // Split into two columns
  const midPoint = Math.ceil(detailFields.length / 2);

  return (
    <div className="container mt-4 animate-fade-in">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="page-title mb-0" id="page-title">
          Case Detail – {record.caseId}
        </h3>
        <Link to="/" className="btn btn-outline-secondary" id="btn-back">
          ← Back to List
        </Link>
      </div>

      {/* Case Information */}
      <div className="card shadow-sm border-0">
        <div className="card-header text-white py-3">
          <h5 className="mb-0">Case Information</h5>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              {detailFields.slice(0, midPoint).map((field) => (
                <div className="mb-3" key={field.id}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    id={field.id}
                    value={field.value}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className="col-md-6">
              {detailFields.slice(midPoint).map((field) => (
                <div className="mb-3" key={field.id}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type="text"
                    className="form-control"
                    id={field.id}
                    value={field.value}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header text-white py-3">
          <h5 className="mb-0">Products ({record.products.length})</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" id="table-products">
              <thead>
                <tr>
                  <th className="py-3 ps-3">#</th>
                  <th className="py-3">Product ID</th>
                  <th className="py-3">Product Name</th>
                  <th className="py-3">Roll Number</th>
                </tr>
              </thead>
              <tbody id="table-products-body">
                {record.products.map((product, index) => (
                  <tr
                    key={product.productId}
                    data-product-id={product.productId}
                    id={`product-row-${index}`}
                  >
                    <td className="ps-3">{index + 1}</td>
                    <td>
                      <span
                        className="badge bg-dark fs-6 fw-normal"
                        id={`product-id-${index}`}
                      >
                        {product.productId}
                      </span>
                    </td>
                    <td id={`product-name-${index}`}>{product.productName}</td>
                    <td id={`roll-number-${index}`}>{product.rollNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header text-white py-3">
          <h5 className="mb-0">Notes</h5>
        </div>
        <div className="card-body p-4">
          <NoteSection caseId={record.caseId} />
        </div>
      </div>
    </div>
  );
};

export default DSARDetail;
