// app/roles/page.jsx
export const metadata = {
  title: 'Roles | stage:zero',
  description: 'Roles and sub-roles available at stage:zero — placeholder descriptions.',
}

const roles = [
  {
    id: 'idol',
    title: 'Idol',
    short: 'Performance talent',
    description: 'Placeholder text',
    subRoles: [
      { id: 'main-vocal', title: 'Main Vocalist', description: 'Placeholder text' },
      { id: 'main-rapper', title: 'Main Rapper', description: 'Placeholder text' },
      { id: 'main-dancer', title: 'Main Dancer', description: 'Placeholder text' },
      { id: 'visual', title: 'Visual', description: 'Placeholder text' },
    ]
  },
  { id: 'social', title: 'Social Media Manager', short: 'Content & outreach', description: 'Placeholder text' },
  { id: 'choreo', title: 'Choreography', short: 'Dance & staging', description: 'Placeholder text' },
  { id: 'backup-dancer', title: 'Backup Dancer', short: 'Support performers', description: 'Placeholder text' },
  { id: 'backing-vocals', title: 'Backing Vocals', short: 'Harmonies & support', description: 'Placeholder text' },
  { id: 'makeup', title: 'Makeup Artist', short: 'Stage makeup & styling', description: 'Placeholder text' },
  { id: 'placeholder-1', title: 'Placeholder Role', short: 'TBD', description: 'Placeholder text' },
  { id: 'placeholder-2', title: 'Placeholder Role', short: 'TBD', description: 'Placeholder text' },
]

function RoleIcon({ id }) {
  // Lightweight deterministic emoji/icon placeholders — swap for images later
  const map = {
    'idol': '⭐',
    'main-vocal': '🎤',
    'main-rapper': '🎧',
    'main-dancer': '💃',
    'visual': '✨',
    'social': '📱',
    'choreo': '🩰',
    'backup-dancer': '🕺',
    'backing-vocals': '🎶',
    'makeup': '💄',
    'placeholder-1': '🔖',
    'placeholder-2': '🔧'
  }
  return <div className="role-icon" aria-hidden="true">{map[id] ?? '⭐'}</div>
}

export default function RolesPage() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <div style={{ display: 'grid', gap: 24 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <div>
            <h1 style={{ margin: 0 }}>Roles at stage:zero</h1>
            <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
              Click a role to read more or apply via the Auditions page when open.
            </p>
          </div>
        </header>

        {/* Roles grid */}
        <div className="roles-grid" role="list">
          {roles.map(role => (
            <article key={role.id} className="role-card" tabIndex={0} role="listitem" aria-labelledby={`role-${role.id}`}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <RoleIcon id={role.id} />
                <div style={{ flex: 1 }}>
                  <h3 id={`role-${role.id}`} style={{ margin: '0 0 6px' }}>{role.title}</h3>
                  <small style={{ color: 'var(--muted)' }}>{role.short}</small>
                  <p style={{ marginTop: 12, color: '#333' }}>{role.description}</p>

                  {/* If Idol has sub-roles, show a neat sub-grid */}
                  {role.subRoles && (
                    <div className="subroles-grid" style={{ marginTop: 12 }}>
                      {role.subRoles.map(sr => (
                        <div key={sr.id} className="subrole-pill" tabIndex={0} aria-label={sr.title}>
                          <span className="subrole-icon" aria-hidden="true">•</span>
                          <div>
                            <strong style={{ display: 'block' }}>{sr.title}</strong>
                            <small style={{ color: 'var(--muted)' }}>{sr.description}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: 12 }}>
                    <a href="/auditions">
                        <button className="apply-btn">Apply</button>
                    </a>
                    <a href="/contact" style={{ marginLeft: 12, color: 'var(--muted)' }}>Ask about role</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
