export default function HomePage() {
  return (
    <section style={{ padding: '2rem 0', fontFamily: 'Inter, system-ui, Arial', lineHeight: 1.5 }}>
      <div style={{ display: 'grid', gap: 28, maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>

        {/* HERO */}
        <header id="hero" style={{ display: 'grid', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 42 }}>stage:zero</h1>
          <p style={{ margin: 0, fontSize: 18, color: '#444' }}>
            Duke’s student-run idol agency — we train singers, dancers, and creators to produce
            high-energy performances, original music, and professional-stage experiences.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <a href="/auditions" style={{ padding: '10px 16px', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: 6 }}>Apply / Auditions</a>
            <a href="#about" style={{ padding: '10px 16px', border: '1px solid #111', color: '#111', textDecoration: 'none', borderRadius: 6 }}>Learn more</a>
          </div>
        </header>

        {/* ABOUT / POSITIONING */}
        <section id="about" style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>What we are</h2>
          <p style={{ margin: 0, color: '#333' }}>
            stage:zero is the first Duke organization built to replicate the full idol experience —
            singing, dancing, media, styling, and staged production all under one roof. Unlike a dance
            crew or an a cappella group, we teach stage presence and group performance at the level of
            modern idol groups while keeping it real for a campus audience.
          </p>

          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr', marginTop: 8 }}>
            <div>
              <h3 style={{ margin: '8px 0' }}>Our focus</h3>
              <ul>
                <li>Train & develop idol groups each academic year (number varies by audition count)</li>
                <li>Produce performance videos, studio recordings, and ticketed shows</li>
                <li>Deliver media training, choreography, vocal coaching, and styling</li>
              </ul>
            </div>

            <div>
              <h3 style={{ margin: '8px 0' }}>Why it matters</h3>
              <p style={{ margin: 0 }}>
                Campus groups often split singing and dancing across separate clubs. stage:zero combines both,
                giving members an opportunity to build portfolio-ready performance clips, ­develop stagecraft,
                and learn how a modern idol project is made.
              </p>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section id="how" style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>How we work</h2>

          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <article style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h4 style={{ marginTop: 0 }}>Recruitment</h4>
              <p style={{ margin: 0 }}>
                Groups are recruited each academic year. Auditions
                are open to all Duke undergrad and grad students. No prior idol experience required.
              </p>
            </article>

            <article style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h4 style={{ marginTop: 0 }}>Training</h4>
              <p style={{ margin: 0 }}>
                Weekly rehearsals, dance bootcamps, vocal coaching, and media workshops. Training is
                hands-on and performance-driven.
              </p>
            </article>

            <article style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <h4 style={{ marginTop: 0 }}>Production</h4>
              <p style={{ margin: 0 }}>
                We film performance videos, record covers & originals, and run ticketed campus shows.
                
              </p>
            </article>
          </div>
        </section>

        {/* TEAMS & STRUCTURE */}
        <section id="teams" style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>People & teams</h2>
          <p style={{ margin: 0 }}>
            stage:zero operates like a small agency with student leaders. Current departments include:
          </p>

          <ul style={{ marginTop: 8 }}>
            <li><strong>Performance:</strong> Main vocalists, backup vocals, and dancers</li>
            <li><strong>Creative:</strong> Choreography, stylists, lyricists, and arrangement</li>
            <li><strong>Production & Media:</strong> Video, photography, audio engineering</li>
            <li><strong>Management:</strong> Logistics, ticketing, partnerships, and treasury</li>
          </ul>

          <p style={{ margin: 0, color: '#666' }}>
            Leadership is student-run. Teams are open to contributors meaning
            you don’t need to be on-stage to shape the group.
          </p>
        </section>

        {/* AUDITION CYCLE / TIMELINE */}
        <section id="cycle" style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>Audition & season snapshot</h2>
          <ol style={{ marginTop: 8 }}>
            <li><strong>Auditions:</strong> Announced at start of academic year — open applications and live callbacks.</li>
            <li><strong>Selection:</strong> Groups formed.</li>
            <li><strong>Training Phase:</strong> Weekly rehearsals + bootcamps for 6–8 weeks.</li>
            <li><strong>Showcase Season:</strong> Multiple campus shows, filmed performance videos, and at least one ticketed event.</li>
          </ol>

          
        </section>

        {/* EVENTS */}
        <section id="events" style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>Upcoming events</h2>
          <p style={{ margin: 0 }}>
            Ticketed showcases, filming days, and rehearsal open-houses will be posted on our Events page.
            (Placeholder for first-season schedule — add dates & links here once confirmed.)
          </p>
        </section>

        {/* CTA / AUDITIONS */}
        <section id="cta" style={{ borderTop: '1px solid #eee', paddingTop: 18, display: 'grid', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>Want to join?</h2>
          <p style={{ margin: 0 }}>
            Auditions are open to all current Duke students. Even if you only want to help with choreography,
            styling, or production — apply. We build teams around talent and interest.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/auditions" style={{ padding: '10px 14px', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: 6 }}>Apply to Audition</a>
            <a href="/contact" style={{ padding: '10px 14px', border: '1px solid #111', color: '#111', textDecoration: 'none', borderRadius: 6 }}>Contact Leadership</a>
          </div>
        </section>

        {/* FOOTER / QUICK FACTS */}
        <footer style={{ paddingTop: 6, color: '#666', fontSize: 14 }}>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <div><strong>Open to:</strong> Duke undergrads & grads</div>
          </div>
        </footer>

      </div>
    </section>
  );
}