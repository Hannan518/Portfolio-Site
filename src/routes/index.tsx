import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowRight,
  Github,
  Mail,
  Terminal,
  Boxes,
  Server,
  Cpu,
  Braces,
  Menu,
  X,
} from 'lucide-react'
import { ParticleBackground } from '@/components/ParticleBackground'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const NAV_ITEMS = [
  { label: 'Home', anchor: '#hero' },
  { label: 'Project', anchor: '#featured-project' },
  { label: 'Tech Stack', anchor: '#tech-stack' },
  { label: 'About', anchor: '#about' },
  { label: 'Contact', anchor: '#contact' },
]

const QUICK_STATS = [
  { label: 'Current Focus', value: 'Full-Stack Engineering' },
  { label: 'Frontend', value: 'React' },
  { label: 'Backend', value: 'Python + FastAPI' },
  { label: 'Featured Build', value: '1 Engineering Project' },
]

const IDENTITY_ITEMS = [
  'React',
  'Python',
  'FastAPI',
  'REST APIs',
  'Asynchronous Routing',
  'Responsive UI',
]

const TECH_BADGES = ['React', 'Python', 'FastAPI']

const HIGHLIGHTS = [
  {
    title: 'Problem',
    body: 'Describe the real problem this project solves.',
  },
  {
    title: 'Architecture',
    body: 'Explain how the frontend and backend communicate and how the system is structured.',
  },
  {
    title: 'Technical Challenges',
    body: 'Highlight difficult engineering problems solved during development.',
  },
  {
    title: 'Key Learnings',
    body: 'Summarize what this project taught you as an engineer.',
  },
]

const TECH_GROUPS: Array<{
  name: string
  icon: typeof Braces
  items: Array<string>
}> = [
  { name: 'Frontend', icon: Braces, items: ['React', 'JavaScript', 'HTML', 'CSS'] },
  { name: 'Backend', icon: Server, items: ['Python', 'FastAPI', 'REST APIs'] },
  {
    name: 'Concepts',
    icon: Cpu,
    items: [
      'Asynchronous Programming',
      'Responsive Interfaces',
      'Component-Based Architecture',
      'API Integration',
    ],
  },
]

const CONTACT_EMAIL = 'hello@example.com'

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteNav />
        <main>
          <HeroSection />
          <FeaturedProjectSection />
          <TechStackSection />
          <AboutSection />
          <ProofSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <Terminal size={16} className="text-primary" aria-hidden="true" />
          <span>swe.portfolio</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.anchor}
              href={item.anchor}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-secondary/70"
          >
            <Mail size={14} aria-hidden="true" />
            Email Me
          </a>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="border-t border-border bg-background/95 px-6 py-4 md:hidden" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.anchor}>
                <a
                  href={item.anchor}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-secondary/70"
            onClick={() => setMobileOpen(false)}
          >
            <Mail size={14} aria-hidden="true" />
            Email Me
          </a>
        </nav>
      )}
    </header>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </p>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28"
    >
      <div>
        <SectionEyebrow>Second-Year Software Engineering Student</SectionEyebrow>
        <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Building Fast, Functional Full-Stack Web Applications
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Focused on React frontends, FastAPI backends, and building responsive
          systems that remain reliable under load.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#featured-project"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Featured Project
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="flex items-start md:justify-end">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card font-mono text-sm shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 text-xs text-muted-foreground">core_stack.json</span>
          </div>
          <div className="px-5 py-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Core Stack
            </p>
            <ul className="mt-3 space-y-2.5">
              {IDENTITY_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-foreground">
                  <span className="text-primary">&gt;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectSection() {
  return (
    <section id="featured-project" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <SectionEyebrow>Featured Project</SectionEyebrow>
        <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Project</h2>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
                Primary Engineering Project
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            This section is dedicated to my primary engineering project. It should
            clearly explain the problem solved, the architecture, the technologies
            used, and the engineering decisions behind the implementation.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-lg border border-border p-5">
                <h3 className="font-mono text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Github size={15} aria-hidden="true" />
              View Source Code
            </a>
            <p className="font-mono text-xs text-muted-foreground">
              Live demo coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechStackSection() {
  return (
    <section id="tech-stack" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <SectionEyebrow>Tech Stack</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Core Tech Stack</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TECH_GROUPS.map((group) => (
            <div key={group.name} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2.5">
                <group.icon size={17} className="text-primary" aria-hidden="true" />
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wide">
                  {group.name}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Boxes size={13} className="text-muted-foreground/70" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <SectionEyebrow>About</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">About</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          I'm a second-year student focused on developing practical software
          engineering skills by building full-stack applications with React and
          FastAPI. My goal is to grow through real engineering work while
          contributing to a professional software team.
        </p>
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <section id="proof" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <SectionEyebrow>Engineering Statement</SectionEyebrow>
        <blockquote className="mt-6 rounded-xl border border-border bg-card p-8 md:p-10">
          <p className="text-lg leading-relaxed text-foreground md:text-xl">
            "I engineer high-performance full-stack web applications using React
            and Python-powered FastAPI. By bridging responsive, dynamic frontends
            with asynchronous backend routing, I build scalable systems that never
            freeze—even under heavy data loads. If you are a business owner
            struggling with slow API bottlenecks or clunky user interfaces, send me
            an email with a brief overview of your current tech stack or project.
            We can discuss your architecture via email or jump on a quick call to
            map out a lightning-fast, modern solution."
          </p>
        </blockquote>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Let's Connect
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          I'm actively seeking a junior software engineering internship. If you'd
          like to discuss my project, technical background, or potential
          opportunities, I'd be happy to connect.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Mail size={15} aria-hidden="true" />
          Send Email
        </a>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-8 font-mono text-xs text-muted-foreground">
        <span>© 2026</span>
        <span>Built with React.</span>
      </div>
    </footer>
  )
}
