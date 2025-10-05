import React, { useEffect, useMemo, useState } from 'react'
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './api'

function Input({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  )
}

function EmployeeForm({ onSubmit, initialValues, submitLabel, onCancel }) {
  const [name, setName] = useState(initialValues?.name || '')
  const [email, setEmail] = useState(initialValues?.email || '')
  const [position, setPosition] = useState(initialValues?.position || '')
  const isEdit = Boolean(initialValues)

  const canSubmit = useMemo(() => name && email && position, [name, email, position])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ name, email, position })
  }

  return (
    <form className="card glass" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className="grid">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" />
        <Input label="Position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Engineer" />
      </div>
      <div className="row actions">
        <button className="btn primary" disabled={!canSubmit} type="submit">{submitLabel || 'Save'}</button>
        {onCancel && (
          <button className="btn" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}

export default function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState('')

  useEffect(() => {
    let mounted = true
    fetchEmployees()
      .then((data) => {
        if (mounted) setEmployees(data)
      })
      .catch(() => setError('Failed to load employees'))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleCreate = async (payload) => {
    const created = await createEmployee(payload)
    setEmployees((prev) => [created, ...prev])
  }

  const handleUpdate = async (id, payload) => {
    const updated = await updateEmployee(id, payload)
    setEmployees((prev) => prev.map((e) => (e._id === id ? updated : e)))
    setEditingId('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    await deleteEmployee(id)
    setEmployees((prev) => prev.filter((e) => e._id !== id))
  }

  return (
    <div className="container">
      <header>
        <h1>Employee Manager</h1>
      </header>

      <EmployeeForm submitLabel="Add" onSubmit={handleCreate} />

      <section className="card glass">
        <div className="table">
          <div className="thead">
            <div>Name</div>
            <div>Email</div>
            <div>Position</div>
            <div className="right">Actions</div>
          </div>
          {loading ? (
            <div className="empty">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : employees.length === 0 ? (
            <div className="empty">No employees yet</div>
          ) : (
            employees.map((emp) => (
              <div className="trow" key={emp._id}>
                {editingId === emp._id ? (
                  <div className="trow-full">
                    <EmployeeForm
                      initialValues={emp}
                      submitLabel="Update"
                      onSubmit={(payload) => handleUpdate(emp._id, payload)}
                      onCancel={() => setEditingId('')}
                    />
                  </div>
                ) : (
                  <>
                    <div>{emp.name}</div>
                    <div className="muted">{emp.email}</div>
                    <div>{emp.position}</div>
                    <div className="right row gap">
                      <button className="btn" onClick={() => setEditingId(emp._id)}>Edit</button>
                      <button className="btn danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}


