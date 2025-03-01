'use client';

import { useState } from 'react';
import { ramadanSchedule } from '../data/ramadanSchedule';

function Modal({ day, onClose }: { day: any; onClose: () => void }) {
  return (
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="modal-title">{day.date}</h2>
          <p className="modal-subtitle">{day.day}</p>

          {day.notes && (
            <div className="modal-note">
              <p>{day.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="prayer-times-grid">
            <div className='prayer-times-grid-row'>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Imsaku</div>
                    <div className="prayer-description">Fillimi i Agjërimit</div>
                  </div>
                  <div className="prayer-time-imsak">{day.imsak}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Sabahu</div>
                    <div className="prayer-description">Namazi i Sabahut</div>
                  </div>
                  <div className="prayer-time">{day.sabah}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Lindja e Diellit</div>
                  </div>
                  <div className="prayer-time">{day.lindjaDiellit}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Dreka</div>
                    <div className="prayer-description">Namazi i Drekës</div>
                  </div>
                  <div className="prayer-time">{day.dreka}</div>
                </div>
              </div>
            </div>
            <div className='prayer-times-grid-row'>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Ikindia</div>
                    <div className="prayer-description">Namazi i Ikindisë</div>
                  </div>
                  <div className="prayer-time">{day.ikindia}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Akshami</div>
                    <div className="prayer-description">Përfundimi i Agjërimit</div>
                  </div>
                  <div className="prayer-time-aksham">{day.aksham}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Jacia</div>
                    <div className="prayer-description">Namazi i Jacisë</div>
                  </div>
                  <div className="prayer-time">{day.jacia}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Generate calendar grid
  const calendarDays = [];
  // Start with empty days for February (if needed)
  for (let i = 0; i < 5; i++) { // March 1, 2025 starts on Saturday (5 empty days needed)
    calendarDays.push(null);
  }
  // Add Ramadan days
  calendarDays.push(...ramadanSchedule);
  // Fill remaining days to complete the grid
  while (calendarDays.length < 42) { // 6 rows × 7 days
    calendarDays.push(null);
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Kalendari i Ramazanit 2025 / 1446H</h1>
        <div className="view-buttons">
          <button 
            onClick={() => setView('calendar')}
            className={`view-button ${view === 'calendar' ? 'active' : ''}`}
          >
            Pamja e Kalendarit
          </button>
          <button 
            onClick={() => setView('list')}
            className={`view-button ${view === 'list' ? 'active' : ''}`}
          >
            Pamja e Listës
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="calendar-container">
          {/* Calendar Header */}
          <div className="calendar-header">
            {['D', 'H', 'M', 'M', 'E', 'P', 'Sh'].map(day => (
              <div key={day} className="calendar-header-cell">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div key={index} className={day ? 'calendar-day' : ''}>
                {day && (
                  <button
                    onClick={() => setSelectedDay(day)}
                    className="calendar-day-button"
                  >
                    <div className="day-header">
                      <span className={`day-number ${day.notes ? 'has-note' : ''}`}>
                        {day.date.split(' ')[0]}
                      </span>
                      {day.notes && (
                        <span className="note-indicator"></span>
                      )}
                    </div>
                    <div className="day-times">
                      <div className="time-row">
                        <span className="time-imsak">{day.imsak}</span>
                        <span className="time-label">Imsaku</span>
                      </div>
                      <div className="time-row">
                        <span className="time-iftar">{day.aksham}</span>
                        <span className="time-label">Iftari</span>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="list-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="list-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Dita</th>
                  <th>Imsaku</th>
                  <th>Sabahu</th>
                  <th>Lindja e Diellit</th>
                  <th>Dreka</th>
                  <th>Ikindia</th>
                  <th>Akshami</th>
                  <th>Jacia</th>
                  <th>Shënime</th>
                </tr>
              </thead>
              <tbody>
                {ramadanSchedule.map(day => (
                  <tr 
                    key={day.date}
                    onClick={() => setSelectedDay(day)}
                  >
                    <td>{day.date}</td>
                    <td>{day.day}</td>
                    <td className="list-time">{day.imsak}</td>
                    <td className="list-time">{day.sabah}</td>
                    <td className="list-time">{day.lindjaDiellit}</td>
                    <td className="list-time">{day.dreka}</td>
                    <td className="list-time">{day.ikindia}</td>
                    <td className="list-time">{day.aksham}</td>
                    <td className="list-time">{day.jacia}</td>
                    <td>
                      {day.notes && (
                        <span className="list-note">{day.notes}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedDay && (
        <Modal day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
} 