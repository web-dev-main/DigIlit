"use client";

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>
              Learn faster with <span className="accent">AI</span>
            </h1>
            <p className="lead">
              DigLit accelerates learning with an accessible, quantum‑inspired AI stack.
              Create, explore, and master ideas with powerful multimodal tools.
            </p>
            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                aria-label="Email address"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit">Request early access</button>
            </form>
            <p className="note" id="cta">
              No spam. We’ll notify you when we launch.
            </p>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </section>

      <section id="features" className="features">
        <div className="container grid">
          <div className="card">
            <h3>Multimodal</h3>
            <p>Text, image, and code generation unified for learning tasks.</p>
          </div>
          <div className="card">
            <h3>Responsive</h3>
            <p>Mobile‑first layout with fluid typography and spacing.</p>
          </div>
          <div className="card">
            <h3>Accessible</h3>
            <p>Semantic markup, keyboard focus states, and color‑contrast friendly.</p>
          </div>
          <div className="card">
            <h3>Fast</h3>
            <p>Optimized assets, no heavy client JS, and modern Next.js 14.</p>
          </div>
        </div>
      </section>
    </>
  );
}
