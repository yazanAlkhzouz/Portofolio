import { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const portfolioData = {
  developers: [
    {
      name: 'Yazan Alkhzouz',
      role: 'Front-end Developer',
      description: 'Front-end wizard with a passion for creating stunning, responsive interfaces. Yazan brings designs to life with his expertise in React and modern CSS techniques.',
      image: '/pic.png'
    },
    {
      name: 'Bisharah Qraitem',
      role: 'Back-end Developer',
      description: "Back-end guru who loves architecting robust and scalable systems. Bisharah's proficiency in Node.js and database design ensures our applications run smoothly and efficiently.",
      image: '/bisharah.png'
    }
  ],
  projects: [
    {
      title: 'NextGen E-commerce Platform',
      description: 'A cutting-edge e-commerce solution featuring real-time inventory updates, AI-powered product recommendations, and seamless payment integration.',
      image: '/shopping.png'
    },
    {
      title: 'Mindful Blogging Experience',
      description: 'A unique blogging platform that encourages mindfulness through writing prompts, mood tracking, and an innovative \'reflection\' feature for past entries.',
      image: '/paradise.png'
    },
    {
      title: 'CollabTaskPro',
      description: 'A next-level task management system designed for remote teams, featuring real-time collaboration, AI-assisted task prioritization, and integrated video conferencing.',
      image: '/the_foundation.png'
    }
  ]
};

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const projects = document.querySelectorAll(`.${styles.project}`);
      projects.forEach((project) => {
        const rect = project.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          project.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Duo Developers</title>
        <meta name="description" content="Portfolio of Dynamic Duo Developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.parallaxBg}>
        <div className={styles.movingBg}></div>
      </div>

      <header className={styles.header}>
        <h1 className={styles.fadeInUp}>Dynamic Duo Developers</h1>
      </header>

      <main className={styles.main}>
        <section className={`${styles.intro} ${styles.fadeInUp}`}>
          <h2>About Us</h2>
          <div className={styles.developers}>
            {portfolioData.developers.map((dev, index) => (
              <div key={index} className={styles.developer}>
                <img src={dev.image} alt={dev.name} />
                <h3>{dev.name}</h3>
                <p>{dev.role}</p>
                <p>{dev.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projects}>
          <h2 className={styles.fadeInUp}>Our Projects</h2>
          {portfolioData.projects.map((project, index) => (
            <div key={index} className={`${styles.project} ${index % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}