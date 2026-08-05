import React, { useState } from 'react';
import { X, Plus, Image } from 'lucide-react';
import { EventItem } from '../services/api';

interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (eventData: Partial<EventItem>) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hackathon',
    department_id: 1,
    location: '',
    start_time: '2026-08-25T09:00',
    end_time: '2026-08-25T17:00',
    capacity: 100,
    poster_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px' }}>Create New Event</h3>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '6px 10px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Event Title</label>
            <input
              type="text"
              className="input-field"
              required
              placeholder="e.g. AI & Robotics Hackathon 2026"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Category</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Cultural">Cultural Fest</option>
                <option value="Seminar">Seminar</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Department</label>
              <select
                className="input-field"
                value={formData.department_id}
                onChange={e => setFormData({ ...formData, department_id: Number(e.target.value) })}
              >
                <option value={1}>Computer Science & Eng</option>
                <option value={2}>Information Technology</option>
                <option value={3}>Electronics & Communication</option>
                <option value={5}>School of Management</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Description</label>
            <textarea
              className="input-field"
              rows={3}
              required
              placeholder="Full agenda and details..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Venue Location</label>
              <input
                type="text"
                className="input-field"
                required
                placeholder="Auditorium B"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Max Capacity</label>
              <input
                type="number"
                className="input-field"
                required
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Start Time</label>
              <input
                type="datetime-local"
                className="input-field"
                value={formData.start_time}
                onChange={e => setFormData({ ...formData, start_time: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>End Time</label>
              <input
                type="datetime-local"
                className="input-field"
                value={formData.end_time}
                onChange={e => setFormData({ ...formData, end_time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Poster Image URL</label>
            <input
              type="text"
              className="input-field"
              value={formData.poster_url}
              onChange={e => setFormData({ ...formData, poster_url: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
