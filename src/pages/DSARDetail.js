import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ticketRecords } from "../data/mockData";

const DocumentSection = ({ caseId }) => {
  const [documents, setDocuments] = useState([]);
  const fileInputRef = React.useRef(null);

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["pdf"].includes(ext)) return { icon: "📄", color: "#dc3545", label: "PDF" };
    if (["xlsx", "xls", "csv"].includes(ext)) return { icon: "📊", color: "#198754", label: "Excel" };
    if (["doc", "docx"].includes(ext)) return { icon: "📝", color: "#0d6efd", label: "Word" };
    if (["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) return { icon: "🖼️", color: "#6f42c1", label: "Image" };
    if (["txt"].includes(ext)) return { icon: "📃", color: "#6c757d", label: "Text" };
    return { icon: "📎", color: "#495057", label: ext.toUpperCase() };
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newDocs = files.map((file, idx) => ({
      id: documents.length + idx + 1,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: "John Smith",
      timestamp,
    }));
    setDocuments([...documents, ...newDocs]);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (docId) => {
    setDocuments(documents.filter((d) => d.id !== docId));
  };

  return (
    <div>
      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="mb-4" id="documents-list">
          <div className="table-responsive">
            <table className="table table-hover mb-0" id="table-documents">
              <thead>
                <tr>
                  <th className="py-2 ps-3" style={{ width: 40 }}>#</th>
                  <th className="py-2">File Name</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Size</th>
                  <th className="py-2">Uploaded By</th>
                  <th className="py-2">Date</th>
                  <th className="py-2 text-center" style={{ width: 80 }}>Action</th>
                </tr>
              </thead>
              <tbody id="table-documents-body">
                {documents.map((doc, index) => {
                  const fileInfo = getFileIcon(doc.name);
                  return (
                    <tr key={doc.id} id={`document-row-${index}`}>
                      <td className="ps-3">{index + 1}</td>
                      <td id={`document-name-${index}`}>
                        <span style={{ marginRight: 8 }}>{fileInfo.icon}</span>
                        {doc.name}
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: fileInfo.color,
                            color: "#fff",
                            fontSize: "0.75rem",
                          }}
                        >
                          {fileInfo.label}
                        </span>
                      </td>
                      <td className="text-muted">{formatFileSize(doc.size)}</td>
                      <td>{doc.uploadedBy}</td>
                      <td className="text-muted">{doc.timestamp}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          id={`btn-remove-doc-${index}`}
                          title="Remove"
                          onClick={() => handleRemove(doc.id)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Control */}
      <div id="upload-document-section">
        <label className="form-label">Upload Document</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            id="upload-file-display"
            placeholder="Choose a file (PDF, Excel, Word, or any file)..."
            readOnly
            style={{ cursor: "pointer", backgroundColor: "#fff" }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          />
          <button
            className="btn btn-lbg d-flex align-items-center justify-content-center"
            id="btn-upload-document"
            title="Browse and upload file"
            style={{ minWidth: 48, height: 38 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            id="input-file-upload"
            style={{ display: "none" }}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.gif,.msg,.eml"
            multiple
            onChange={handleFileSelect}
          />
        </div>
        <div className="form-text mt-1">
          Supported: PDF, Word, Excel, Images, Text, and more
        </div>
      </div>
    </div>
  );
};

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

      {/* Documents Section */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header text-white py-3">
          <h5 className="mb-0">Documents</h5>
        </div>
        <div className="card-body p-4">
          <DocumentSection caseId={record.caseId} />
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
