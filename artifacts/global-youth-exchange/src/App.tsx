import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  Globe2,
  Lightbulb,
  Menu,
  Network,
  UsersRound,
  X,
} from 'lucide-react';
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';
import { APP_STORE_LINKS, SOCIAL_LINKS } from '@/lib/site-links';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const socialChannels = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FaFacebookF },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: FaInstagram },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: FaLinkedinIn },
];

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/program', label: 'The program' },
  { path: '/impact', label: 'Our vision for impact' },
  { path: '/get-involved', label: 'Get involved' },
];

function AppStoreBadge({
  store,
  href,
}: {
  store: 'Google Play' | 'App Store';
  href: string;
}) {
  const Icon = store === 'Google Play' ? FaGooglePlay : FaApple;
  const storeId = store === 'Google Play' ? 'google-play' : 'app-store';
  const content = (
    <>
      <Icon aria-hidden="true" />
      <span>
        <small>DOWNLOAD ON</small>
        <strong>{store}</strong>
      </span>
    </>
  );

  if (!href) {
    return (
      <span
        className="store-badge store-badge-pending"
        aria-disabled="true"
        title="Add the official listing URL in src/lib/site-links.ts"
        data-testid={`store-badge-${storeId}`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      className="store-badge"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download B4P Connect on ${store}`}
      data-testid={`link-store-${storeId}`}
    >
      {content}
    </a>
  );
}

function AppDownload() {
  return (
    <section className="section app-download-section">
      <div className="container">
        <div className="app-download-inner">
          <div className="app-download-copy">
            <div className="app-download-mark" aria-hidden="true">B4P</div>
            <div>
              <div className="eyebrow">B4P CONNECT</div>
              <h2>Download our B4P Connect app.</h2>
              <p>Find B4P Connect on your preferred app store.</p>
            </div>
          </div>
          <div className="app-download-actions">
            <div className="store-badges">
              <AppStoreBadge store="Google Play" href={APP_STORE_LINKS.googlePlay} />
              <AppStoreBadge store="App Store" href={APP_STORE_LINKS.appStore} />
            </div>
            <p className="app-download-note">Official store links can be added before publishing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const metadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Global Youth Exchange & Volunteers | B4P CODEFOUND',
    description: 'A global youth leadership initiative connecting young people across cultures through skills, mentorship, and community action. Launching December 2026.',
  },
  '/about': {
    title: 'About GYEV | B4P CODEFOUND',
    description: 'Learn about B4P CODEFOUND and the vision behind the Global Youth Exchange & Volunteers initiative.',
  },
  '/program': {
    title: 'The program | Global Youth Exchange & Volunteers',
    description: 'Explore GYEV’s weekly public learning component and six-to-twelve-month capacity-building program.',
  },
  '/impact': {
    title: 'Our vision for impact | Global Youth Exchange & Volunteers',
    description: 'The intended outcomes and focus areas guiding GYEV’s youth leadership, cultural exchange, and community action.',
  },
  '/get-involved': {
    title: 'Get involved | Global Youth Exchange & Volunteers',
    description: 'Guidance for young people, mentors, and community partners interested in GYEV.',
  },
};

function Metadata() {
  const [location] = useLocation();
  useEffect(() => {
    const current = metadata[location] ?? {
      title: 'Page not found | Global Youth Exchange & Volunteers',
      description: 'The page you are looking for could not be found.',
    };
    document.title = current.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', current.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', current.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', current.description);
  }, [location]);
  return null;
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location]);
  return (
    <>
      <div className="announcement">
        <div className="announcement-inner">
          <CalendarDays size={14} aria-hidden="true" />
          <span><strong>Launching December 2026</strong> · A new space for young people to learn, lead, and connect.</span>
        </div>
      </div>
      <header className="header">
        <nav className="nav-shell" aria-label="Main navigation">
          <Link href="/" className="brand-link" aria-label="B4P CODEFOUND Youth, home" data-testid="link-home-logo">
            <img src="/images/b4p-youth-logo-blue.png" alt="B4P CODEFOUND Youth" />
          </Link>
          <div className="nav-links">
            {pages.slice(1).map((page) => (
              <Link key={page.path} href={page.path} aria-current={location === page.path ? 'page' : undefined} data-testid={`link-nav-${page.path.slice(1)}`}>
                {page.label}
              </Link>
            ))}
          </div>
          <Link href="/get-involved" className="nav-cta" data-testid="link-nav-involved">Find your place <ArrowRight size={15} aria-hidden="true" /></Link>
          <button className="mobile-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>
        {open && (
          <div className="mobile-nav" id="mobile-navigation">
            {pages.slice(1).map((page) => (
              <Link key={page.path} href={page.path} aria-current={location === page.path ? 'page' : undefined} data-testid={`link-mobile-${page.path.slice(1)}`}>
                {page.label}
              </Link>
            ))}
            <Link href="/get-involved" data-testid="link-mobile-involved">Find your place <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        )}
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="B4P CODEFOUND Youth home" data-testid="link-footer-home">
              <img className="footer-logo" src="/images/b4p-youth-logo-white.png" alt="B4P CODEFOUND Youth" />
            </Link>
            <p>Young people, connected across cultures and equipped to shape what comes next.</p>
            <div className="social-links" aria-label="Follow B4P CODEFOUND">
              {socialChannels.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`B4P CODEFOUND on ${label}`}
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3>Explore GYEV</h3>
            <div className="footer-links">
              {pages.slice(1).map((page) => <Link key={page.path} href={page.path} data-testid={`link-footer-${page.path.slice(1)}`}>{page.label}</Link>)}
            </div>
          </div>
          <div>
            <h3>At a glance</h3>
            <p className="footer-note">Global Youth Exchange &amp; Volunteers is a B4P CODEFOUND initiative. The program is planned to launch in December 2026. Participation details will be shared when confirmed.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} B4P CODEFOUND</span>
          <span>Designed around youth voice, mutual learning, and possibility.</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="site-wrap">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Metadata />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <Shell>
      <div className="page">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">B4P CODEFOUND · A global youth initiative</div>
              <h1>A wider world.<br />A <em>stronger</em> voice.</h1>
              <p className="hero-copy">A place for young people to build skills, find mentors, exchange perspectives, and turn the issues they care about into community action.</p>
              <div className="button-row">
                <Link className="button-primary" href="/program" data-testid="link-home-program">Explore the program <ArrowRight size={16} /></Link>
                <Link className="button-outline" href="/get-involved" data-testid="link-home-involved">Ways to take part</Link>
              </div>
              <div className="launch-note"><span><CalendarDays size={15} /></span>Program launch planned for December 2026</div>
            </div>
            <div className="hero-visual">
              <img className="hero-photo" src="/images/youth-community.jpg" alt="A group of young people sharing a joyful moment together" />
              <div className="photo-caption"><small>Different paths.</small><strong>One shared future.</strong></div>
            </div>
          </div>
        </section>

        <section className="intro-band" aria-label="Program purpose">
          <div className="container intro-band-inner">
            <h2>Leadership grows when more young people have room to lead.</h2>
            <p>GYEV brings youth from underserved, minority, conflict and post-conflict, and diaspora communities into a global community built on exchange, encouragement, and shared learning.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">What makes GYEV different</div><h2>Connection is the beginning. Agency is the point.</h2></div>
              <p>Girls and young women’s leadership is a priority. Young men are welcomed as partners in gender equity and a more inclusive future.</p>
            </div>
            <div className="pillars">
              <article className="pillar"><span className="pillar-number">01 / LEARN</span><h3>Build skills that travel</h3><p>Weekly public learning and deeper capacity-building support young people to grow confidence, knowledge, and practical leadership skills.</p></article>
              <article className="pillar"><span className="pillar-number">02 / EXCHANGE</span><h3>Meet beyond your usual map</h3><p>Cross-cultural conversations create space to listen, question assumptions, and learn with peers whose experiences differ from your own.</p></article>
              <article className="pillar"><span className="pillar-number">03 / ACT</span><h3>Bring ideas back home</h3><p>Youth voice and innovation are connected to pressing global issues and the possibility of meaningful community action.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container split">
            <div className="split-image">
              <img src="/images/youth-circle.jpg" alt="Young people gathered in a circle, listening and sharing ideas" />
              <div className="image-tag">A circle where every perspective has room.</div>
            </div>
            <div className="split-copy">
              <div className="eyebrow">A program with two doors in</div>
              <h2>Start with a shared conversation. Keep growing together.</h2>
              <p>GYEV pairs a weekly public education and awareness component with a six-month-to-one-year capacity-building program. Each creates a different way to engage with learning, mentorship, cultural exchange, and youth-led ideas.</p>
              <Link className="text-link" href="/program" data-testid="link-home-learning">See how the program works <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container quote-panel">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>
              A global community where youth are prepared to lead through skills, knowledge, and socio-political and professional networks.
              <cite>Our vision for GYEV</cite>
            </blockquote>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container intro-band-inner">
            <div>
              <div className="eyebrow" style={{ color: '#f2a271' }}>The next chapter starts together</div>
              <h2 style={{ marginTop: 15 }}>Be part of the circle taking shape.</h2>
            </div>
            <div>
              <p>GYEV is planned to launch in December 2026. Explore the program and the different ways youth, mentors, and community partners may connect.</p>
              <Link className="button-light" href="/get-involved" data-testid="link-home-next">Explore ways to get involved <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
        <AppDownload />
      </div>
    </Shell>
  );
}

function PageIntro({
  label,
  title,
  body,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  visualTitle,
  visualText,
  actionLabel,
  actionHref,
}: {
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  visualTitle: string;
  visualText: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="page-intro-grid">
          <div className="page-intro-copy">
            <div className="kicker">{label}</div>
            <h1>{title}</h1>
            <p>{body}</p>
            <Link className="button-primary page-intro-action" href={actionHref} data-testid={`link-hero-${actionHref.slice(1) || 'home'}`}>
              {actionLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="page-intro-visual">
            <img src={image} alt={imageAlt} width={imageWidth} height={imageHeight} />
            <div className="page-intro-visual-card">
              <span>GLOBAL YOUTH EXCHANGE &amp; VOLUNTEERS</span>
              <strong>{visualTitle}</strong>
              <p>{visualText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Shell>
      <div className="page">
        <PageIntro
          label="About B4P CODEFOUND"
          title="A world where young people are ready to lead."
          body="The Global Youth Exchange & Volunteers program is a B4P CODEFOUND initiative shaped around a simple belief: young people deserve the skills, networks, and space to influence the futures they will inherit."
          image="/images/youth-community.jpg"
          imageAlt="A diverse group of young people sharing a joyful moment together"
          imageWidth={736}
          imageHeight={1104}
          visualTitle="Many experiences. One shared future."
          visualText="A global community grounded in youth voice and mutual learning."
          actionLabel="Explore the program"
          actionHref="/program"
        />
        <section className="content-section">
          <div className="container content-split">
            <div><div className="kicker">Our vision</div><h2>Preparation, connection, and possibility.</h2></div>
            <div>
              <p>We envision a global community where youth are prepared to lead through skills, knowledge, and socio-political and professional networks. GYEV aims to connect young people across cultures so that learning moves both ways: into individual growth and back into communities.</p>
              <p>The initiative serves underserved youth across low-income, minority, conflict and post-conflict, and diaspora communities. It prioritizes girls and young women’s leadership while engaging young men as gender-equity allies.</p>
              <div className="aside-note">Youth are not just participants in change. Their perspectives should help shape it.</div>
            </div>
          </div>
        </section>
        <section className="content-section section-soft">
          <div className="container">
            <div className="section-heading">
              <div><div className="kicker">What guides us</div><h2>Learning that crosses borders and returns with purpose.</h2></div>
              <p>GYEV’s goal is global collaboration, skill development, and cross-cultural understanding—grounded in the realities and ideas of young people.</p>
            </div>
            <div className="focus-grid">
              <article className="focus-item"><span>01</span><h3>Leadership &amp; mentorship</h3><p>Build leadership capacity through mentoring, coaching, and professional and socio-political networks.</p></article>
              <article className="focus-item"><span>02</span><h3>Peer learning</h3><p>Make dedicated room for girls and young women to learn with and encourage one another.</p></article>
              <article className="focus-item"><span>03</span><h3>Cultural exchange</h3><p>Grow cross-cultural understanding through meaningful dialogue and shared experience.</p></article>
              <article className="focus-item"><span>04</span><h3>Ideas into action</h3><p>Explore innovation around pressing global issues and strengthen youth voice in community life.</p></article>
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="container split">
            <div className="split-copy"><div className="eyebrow">The initiative</div><h2>Global in connection. Grounded in community.</h2><p>GYEV’s exchange is not about leaving local experience behind. It is about bringing perspectives together, building relationships across difference, and making space for young people to carry learning into the places and issues that matter to them.</p><Link className="text-link" href="/impact" data-testid="link-about-impact">Explore intended outcomes <ArrowRight size={16} /></Link></div>
            <div className="split-image"><img src="/images/youth-circle.jpg" alt="Youth participants sitting together in an open discussion circle" /></div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function Program() {
  const activities = [
    { icon: BookOpen, title: 'Workshops', text: 'Participatory spaces for skill-building, knowledge, and leadership practice.' },
    { icon: Globe2, title: 'Cultural exchange', text: 'Conversation and collaboration across backgrounds and lived experiences.' },
    { icon: Lightbulb, title: 'Innovation labs', text: 'Explore ideas and responses to pressing global issues with peers.' },
    { icon: UsersRound, title: 'Mentoring', text: 'Guidance and encouragement as young people explore their leadership.' },
    { icon: Compass, title: 'Coaching', text: 'Support to clarify goals, practice skills, and reflect on growth.' },
    { icon: Network, title: 'Graduation', text: 'A graduation model to recognize completion of the core program.' },
  ];
  return (
    <Shell>
      <div className="page">
        <PageIntro
          label="The GYEV program"
          title="Two ways to learn. One wider community."
          body="GYEV combines weekly public education and awareness with a deeper capacity-building journey. Both are designed to make learning, exchange, and youth leadership more accessible."
          image="/images/youth-circle.jpg"
          imageAlt="Young people gathered in a circle, listening and sharing ideas"
          imageWidth={736}
          imageHeight={736}
          visualTitle="Learn together. Grow together."
          visualText="Weekly learning and a six-month-to-one-year core program."
          actionLabel="Ways to take part"
          actionHref="/get-involved"
        />
        <section className="content-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="kicker">Two connected components</div><h2>Join the learning. Go deeper when ready.</h2></div>
              <p>The public weekly component and the core program have different rhythms. Specific schedules and participation details will be shared when confirmed.</p>
            </div>
            <div className="program-track">
              <article className="track-card">
                <div className="track-label">Open learning</div>
                <h3>Weekly education &amp; awareness</h3>
                <p>A public-facing weekly learning component offering opportunities to engage with ideas, issues, and perspectives relevant to young people and global understanding.</p>
                <span className="track-duration">Weekly component</span>
              </article>
              <article className="track-card accent">
                <div className="track-label">Core capacity-building</div>
                <h3>A deeper journey, built over time.</h3>
                <p>The core program lasts six months to one year. It brings together workshops, cultural exchange, innovation labs, mentoring, and coaching, with a graduation model.</p>
                <span className="track-duration">Six months to one year</span>
              </article>
            </div>
          </div>
        </section>
        <section className="content-section section-soft">
          <div className="container">
            <div className="section-heading">
              <div><div className="kicker">How learning takes shape</div><h2>Practice, perspective, and people who have your back.</h2></div>
              <p>Program activities are intended to support both personal leadership and the ability to work with others on issues that matter.</p>
            </div>
            <div className="activity-grid">
              {activities.map(({ icon: Icon, title, text }) => <article className="activity" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="container split">
            <div className="split-image"><img src="/images/youth-circle.jpg" alt="A group of young people listening to one another during a circle discussion" /></div>
            <div className="split-copy"><div className="eyebrow">A note on timing</div><h2>Planned to begin in December 2026.</h2><p>The GYEV program is planned to launch in December 2026. That is a launch note, not an application deadline or confirmation that registration is open. Program format and participation details will be shared once they are confirmed.</p><Link className="text-link" href="/get-involved" data-testid="link-program-involved">See participation guidance <ArrowRight size={16} /></Link></div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function Impact() {
  const outcomes = [
    { title: 'Leadership with confidence', text: 'Strengthen young people’s leadership skills, knowledge, and readiness to contribute.' },
    { title: 'Networks that widen opportunity', text: 'Support connections across professional, socio-political, and cultural contexts.' },
    { title: 'Girls and young women leading', text: 'Prioritize girls’ and young women’s leadership and peer learning, with young men engaged as gender-equity allies.' },
    { title: 'Shared ideas, local relevance', text: 'Encourage innovation around pressing global issues and connect exchange to community action.' },
  ];
  return (
    <Shell>
      <div className="page">
        <PageIntro
          label="Our vision for impact"
          title="More voice. More connection. More ways to act."
          body="GYEV is being designed around the change it hopes to support—not a set of results it has not yet achieved. These are intended outcomes and areas of focus for the initiative."
          image="/images/youth-community.jpg"
          imageAlt="Young people from different backgrounds smiling together"
          imageWidth={736}
          imageHeight={1104}
          visualTitle="Voice. Opportunity. Action."
          visualText="The change GYEV hopes to support—built around young people."
          actionLabel="Explore our approach"
          actionHref="/about"
        />
        <section className="content-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="kicker">Intended outcomes</div><h2>What this work hopes to make possible.</h2></div>
              <p>Meaningful change takes time, relationships, and listening. GYEV aims to create conditions for young people to grow and contribute.</p>
            </div>
            <div className="focus-grid">
              {outcomes.map((item, i) => <article className="focus-item" key={item.title}><span>0{i + 1} / INTENDED</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
          </div>
        </section>
        <section className="content-section section-soft">
          <div className="container split">
            <div className="split-copy"><div className="eyebrow">Where we focus</div><h2>Who gets to take part in shaping the future?</h2><p>GYEV centers underserved youth across low-income, minority, conflict and post-conflict, and diaspora communities. It prioritizes girls and young women’s leadership while welcoming young men as allies in gender equity.</p><p>Across these communities, the program aims to build leadership and mentorship, peer learning, cultural exchange, youth voice, and creative responses to shared challenges.</p><Link className="text-link" href="/about" data-testid="link-impact-about">Learn what guides the initiative <ArrowRight size={16} /></Link></div>
            <div className="split-image"><img src="/images/youth-community.jpg" alt="A diverse group of young people smiling together" /><div className="image-tag">Different backgrounds belong in the same conversation.</div></div>
          </div>
        </section>
        <section className="content-section">
          <div className="container quote-panel">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>Global collaboration, skill development, and cross-cultural understanding.<cite>The goal guiding GYEV</cite></blockquote>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function GetInvolved() {
  const roles = [
    { number: 'FOR YOUNG PEOPLE', title: 'Bring your perspective.', text: 'Explore the program and its two learning components. The initiative is intended for underserved youth and prioritizes girls and young women’s leadership, while welcoming young men as gender-equity allies.', link: 'Understand the program', href: '/program' },
    { number: 'FOR MENTORS', title: 'Make room for growth.', text: 'Mentorship and coaching are part of the core capacity-building model. If you are interested in contributing, follow program updates as participation arrangements are confirmed.', link: 'Read about the program', href: '/program' },
    { number: 'FOR COMMUNITY PARTNERS', title: 'Help widen the circle.', text: 'Community connections can help make learning and exchange relevant and accessible. Learn about GYEV’s focus and share the initiative with people who may benefit.', link: 'Learn about GYEV', href: '/about' },
  ];
  return (
    <Shell>
      <div className="page">
        <PageIntro
          label="Get involved"
          title="There is more than one way to belong."
          body="Whether you are a young person, a mentor, or a community partner, start by learning what GYEV is building. Participation details are not yet available; this page does not open registration."
          image="/images/youth-circle.jpg"
          imageAlt="Young people and a mentor sharing a conversation in a circle"
          imageWidth={736}
          imageHeight={736}
          visualTitle="Young people. Mentors. Partners."
          visualText="Different roles, connected by a shared commitment to youth."
          actionLabel="Discover the program"
          actionHref="/program"
        />
        <section className="content-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="kicker">Find your path</div><h2>Start where you are.</h2></div>
              <p>GYEV is planned to launch in December 2026. The next step today is to explore the initiative and return for confirmed program information.</p>
            </div>
            <div className="roles-grid">
              {roles.map((role, i) => <article className="role-card" key={role.number}><span className="role-number">0{i + 1} — {role.number}</span><h3>{role.title}</h3><p>{role.text}</p><Link className="text-link" href={role.href} data-testid={`link-role-${i}`}>{role.link} <ArrowRight size={15} /></Link></article>)}
            </div>
          </div>
        </section>
        <section className="content-section section-soft">
          <div className="container content-split">
            <div><div className="kicker">What to expect next</div><h2>Clear information, when it is ready.</h2></div>
            <div>
              <div className="steps">
                <article className="step"><span className="step-num">01</span><div><h3>Explore the initiative</h3><p>Read about the program, the people it aims to serve, and its intended focus.</p></div></article>
                <article className="step"><span className="step-num">02</span><div><h3>Watch for confirmed details</h3><p>Schedules, eligibility and participation arrangements will be shared when confirmed. No application deadline is announced here.</p></div></article>
                <article className="step"><span className="step-num">03</span><div><h3>Connect when a route is available</h3><p>Once official participation information is published, use those details to decide whether and how to take part.</p></div></article>
              </div>
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="container">
            <div className="join-callout">
              <div><div className="kicker">Planned launch · December 2026</div><h2>Stay curious about what young people can do together.</h2></div>
              <div><p>There is no registration form or contact channel on this site. We will not ask you to submit personal information here.</p><Link className="button-primary" href="/program" data-testid="link-get-program">Explore the program <ArrowRight size={16} /></Link></div>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function MissingPage() {
  return <Shell><section className="not-found"><div className="kicker">That page has wandered off</div><h1>We can help you find your way.</h1><p>The page you’re looking for isn’t here. Head back to the beginning or explore GYEV.</p><Link className="button-primary" href="/">Go to home <ArrowRight size={16} /></Link></section></Shell>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/program" component={Program} />
        <Route path="/impact" component={Impact} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route component={MissingPage} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
