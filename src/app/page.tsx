'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/portfolio.module.css';

import {
  Github,
  Linkedin,
  Download,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Menu,
  Award
} from 'lucide-react';

type Project = {
  title: string;
  desc: string;
  tech: string[];
  repo: string;
  demo: string;
  img: string;
};

const PROJECTS: Project[] = [
  { title: "MedBridge", desc: "Platform to track medicine expiry & redistribution.", tech: ["React", "Node.js", "MongoDB"], repo: "https://github.com/username/medbridge", demo: "#", img: "/images/medbridge.png" },
  { title: "SkySense", desc: "Web app to monitor air quality with OpenWeather API.", tech: ["HTML", "CSS", "JavaScript"], repo: "https://github.com/username/skysense", demo: "#", img: "/images/skysense.png" },
  { title: "Mental Health Chatbot", desc: "AI-powered chatbot providing mental health resources.", tech: ["HTML", "CSS", "JS", "OpenAI API"], repo: "https://github.com/username/mental-health-chatbot", demo: "#", img: "/images/chatbot.png" },
];

const SKILLS = [
  { name: "Java", icon: <Code size={20} /> },
  { name: "Python", icon: <Code size={20} /> },
  { name: "React", icon: <Code size={20} /> },
  { name: "Node.js", icon: <Server size={20} /> },
  { name: "MongoDB", icon: <Database size={20} /> },
  { name: "MySQL", icon: <Database size={20} /> },
];

const EDUCATION = [
  { year: '2025', degree: 'MCA (Ongoing)', detail: 'CGPA 8.42/7.84' },
  { year: '2022', degree: 'BSc IT', detail: 'CGPA 8.63' },
  { year: '2019', degree: 'HSC', detail: '90.67%' },
];

const CERTIFICATIONS = [
  { title: 'Postman API Fundamentals', issuer: 'Postman Academy', year: '2024' },
  { title: 'SQL Certification', issuer: 'HackerRank', year: '2024' },
  { title: 'Automation Anywhere Advanced RPA', issuer: 'Automation Anywhere University', year: '2023' },
  { title: 'Git & GitHub Essentials', issuer: 'Coursera', year: '2023' },
];

export default function Page(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pauseRef = useRef<boolean>(false);

  // IntersectionObserver for navbar highlighting
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.55 });

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Infinite carousel with requestAnimationFrame
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let x = 0;
    const speed = 0.6; // pixels per frame

    const step = () => {
      if (!pauseRef.current) {
        x += speed;
        const resetPoint = (container.scrollWidth || 0) / 2;
        if (x >= resetPoint) x = 0;
        container.scrollLeft = x;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleCarouselMouseEnter = () => { pauseRef.current = true; };
  const handleCarouselMouseLeave = () => { pauseRef.current = false; };

  return (
    <div className={styles.page}>
      {/* helper CSS (backface) included in module */}
      {/* NAV */}
      <header className={styles.header}>
        <nav className={styles.navInner}>
          <a href="#hero" className={styles.logo}>Moresh Londe</a>

          <div className={styles.navRight}>
            <div className={styles.linksDesktop}>
              {['About','Projects','Skills','Education','Certifications','Contact'].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`} className={`${styles.navLink} ${activeSection === s.toLowerCase() ? styles.active : ''}`}>{s}</a>
              ))}
              <a href="/Moresh_Londe.pdf" download className={styles.resumeBtn}><Download size={14}/> Resume</a>
            </div>

            <button className={styles.menuBtn} onClick={() => setMenuOpen(v => !v)} aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div className={`${styles.mobileDrawer} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.mobileInner}>
            {['About','Projects','Skills','Education','Certifications','Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)} className={`${styles.mobileLink} ${activeSection === s.toLowerCase() ? styles.active : ''}`}>{s}</a>
            ))}
            <a href="/Moresh_Londe.pdf" download className={styles.resumeBtnMobile}><Download size={14}/> Resume</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* HERO */}
        <section id="hero" className={styles.hero}>
          <motion.h1 initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.heroTitle}>Moresh Londe</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={styles.heroSub}>Building smart solutions, one project at a time</motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className={styles.heroMuted}>Full Stack Developer | Building Future-Ready Web Apps</motion.p>

          <div className={styles.heroActions}>
            <a href="/Moresh_Londe.pdf" download className={styles.primaryBtn}><Download size={14}/> Resume</a>
            <a href="https://linkedin.com/in/moreshlonde" target="_blank" rel="noreferrer" className={styles.ghostBtn}><Linkedin size={14}/> LinkedIn</a>
            <a href="https://github.com/MOreshhhhh" target="_blank" rel="noreferrer" className={styles.ghostBtnPink}><Github size={14}/> GitHub</a>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={styles.section}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.sectionTitle}>About Me</motion.h2>
          <p className={styles.lead}>Fresher software developer pursuing MCA. Skilled in Java, Python, C/C++, React, Node.js, MySQL, MongoDB. Certified in Postman API, SQL, Git, and Automation Anywhere. Passionate about creating impactful, user-focused software solutions.</p>
        </section>

        {/* SKILLS */}
        <section id="skills" className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillGrid}>
            {SKILLS.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className={styles.skillCard}>
                <div className={styles.skillIcon}>{s.icon}</div>
                <div className={styles.skillName}>{s.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.timeline}>
            {EDUCATION.map((edu, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.12 }} className={styles.eduCard}>
                <div>
                  <h3 className={styles.eduDegree}>{edu.degree}</h3>
                  <p className={styles.eduDetail}>{edu.detail}</p>
                </div>
                <div className={styles.eduYear}>{edu.year}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS (carousel) */}
        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>

          <div
            ref={carouselRef}
            onMouseEnter={handleCarouselMouseEnter}
            onMouseLeave={handleCarouselMouseLeave}
            className={styles.carousel}
            aria-label="Projects carousel"
          >
            {/* duplicate list to allow seamless loop */}
            {[...PROJECTS, ...PROJECTS].map((proj, idx) => (
              <div key={idx} className={styles.cardWrap}>
                <div className={`${styles.card3d} ${styles.card}`}>
                  <div className={styles.cardInner}>
                    <div className={styles.cardFront}>
                      <img src={proj.img} alt={proj.title} className={styles.cardImage} />
                      <h3 className={styles.cardTitle}>{proj.title}</h3>
                      <p className={styles.cardDesc}>{proj.desc}</p>
                      <div className={styles.techList}>
                        {proj.tech.map((t, i) => <span key={i} className={styles.tech}>{t}</span>)}
                      </div>
                    </div>

                    <div className={styles.cardBack}>
                      <h3 className={styles.cardTitleBack}>{proj.title}</h3>
                      <p className={styles.cardBackLabel}>Quick Links</p>
                      <div className={styles.cardBackBtns}>
                        <a href={proj.repo} target="_blank" rel="noreferrer" className={styles.cardBtn}><Github size={14}/> Repo</a>
                        {proj.demo && proj.demo !== '#' ? (
                          <a href={proj.demo} target="_blank" rel="noreferrer" className={styles.cardBtn}><ExternalLink size={14}/> Demo</a>
                        ) : (
                          <button onClick={() => setActiveProject(proj)} className={styles.cardBtn}><ExternalLink size={14}/> Demo</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* modal */}
          {activeProject && (
            <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setActiveProject(null)}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className={styles.modal}>
                <button className={styles.modalClose} onClick={() => setActiveProject(null)} aria-label="Close">✕</button>
                <h3 className={styles.modalTitle}>{activeProject.title}</h3>
                <p className={styles.modalDesc}>{activeProject.desc}</p>
                {activeProject.demo && activeProject.demo !== '#' ? (
                  <iframe src={activeProject.demo} title="Project Demo" className={styles.modalIframe} />
                ) : (
                  <div className={styles.modalPlaceholder}>Demo not available</div>
                )}
              </motion.div>
            </div>
          )}
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className={styles.section}>
          <h2 className={styles.sectionTitle}>Certifications & Achievements</h2>
          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className={styles.certCard}>
                <Award size={22} className={styles.awardIcon}/>
                <h4 className={styles.certTitle}>{c.title}</h4>
                <p className={styles.certIssuer}>{c.issuer}</p>
                <span className={styles.certYear}>{c.year}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Me</h2>
          <p className={styles.lead}>Feel free to reach out via email or connect with me on LinkedIn and GitHub.</p>
          <div className={styles.contactBtns}>
            <a className={styles.primaryBtn} href="mailto:londemoresh03@gmail.com"><Mail size={14}/> Email</a>
            <a className={styles.ghostBtn} href="https://linkedin.com/in/moreshlonde" target="_blank" rel="noreferrer"><Linkedin size={14}/> LinkedIn</a>
            <a className={styles.ghostBtnPink} href="https://github.com/MOreshhhhh" target="_blank" rel="noreferrer"><Github size={14}/> GitHub</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLinks}>
              <a href="#hero">Home</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#education">Education</a>
            </div>
            <div className={styles.footerSocial}>
              <a href="https://linkedin.com/in/moreshlonde" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
              <a href="https://github.com/MOreshhhhh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a>
            </div>
          </div>
          <div className={styles.copyright}>© 2025 Moresh Londe. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}
