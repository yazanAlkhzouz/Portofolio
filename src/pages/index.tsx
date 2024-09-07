import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const portfolioData = {
  developers: [
    {
      name: 'Yazan Alkhzouz',
      role: 'Front-end Developer',
      description: 'Front-end wizard with a passion for creating stunning, responsive interfaces. Yazan brings designs to life with his expertise in React and modern CSS techniques.',
      image: '/selfie/pic.png'
    },
    {
      name: 'Bisharah Qraitem',
      role: 'Back-end Developer',
      description: "Back-end guru who loves architecting robust and scalable systems. Bisharah's proficiency in Node.js and database design ensures our applications run smoothly and efficiently.",
      image: '/selfie/bisharah.png'
    }
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      description: "Shopping Time is an e-commerce website that has at least 150 women's clothing products with different sizes and color choices. You can choose various attributes like size and color. There is a cart where you can see added items and edit, add, or remove them. You can also set a currency of your choice.",
      image: '/shopping/shopping.png',
      gallery: ['/shopping/shopping.png', '/shopping/shopping2.png', '/shopping/shopping3.png' ,'/shopping/shopping4.png', '/shopping/shopping5.png'] // Add more images here
    },
    {
      title: 'Mindful Blogging Experience',
      description: 'A unique blogging platform that encourages mindfulness through writing prompts, mood tracking, and an innovative \'reflection\' feature for past entries.',
      image: '/paradise/paradise.png',
      gallery: ['/paradise/paradise.png'] // Add more images here
    },
    {
      title: 'CollabTaskPro',
      description: 'A next-level task management system designed for remote teams, featuring real-time collaboration, AI-assisted task prioritization, and integrated video conferencing.',
      image: '/thefoundation/thefoundation2.png',
      gallery: ['/thefoundation/thefoundation2.png', '/thefoundation/thefoundation3.png', '/thefoundation/the_foundation.png', '/thefoundation/thefoundation4.png'] // Add more images here
    }
  ]
};
interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {

  return (
    <div className={styles.galleryOverlay}>
      <div className={styles.galleryModal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <img src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} className={styles.galleryImage} />
        <div className={styles.galleryNav}>
          <button onClick={onPrev} disabled={currentIndex === 0}>&lt; Prev</button>
          <span>{currentIndex + 1} / {images.length}</span>
          <button onClick={onNext} disabled={currentIndex === images.length - 1}>Next &gt;</button>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setSubmitted(true);
  };

  return (
    <div className={styles.contactFormContainer}>
      {submitted ? (
        <p className={styles.thankYouMessage}>Thank you for your message! We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.formControl}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openGallery = (project, index) => {
    setCurrentProject(project);
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex < currentProject.gallery.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

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
          <h2 className={styles.sectionTitle}>About Us</h2>
          <div className={styles.developers}>
            {portfolioData.developers.map((dev, index) => (
              <div key={index} className={styles.developer}>
                <div className={styles.developerImageWrapper}>
                  <img src={dev.image} alt={dev.name} />
                </div>
                <div className={styles.developerInfo}>
                  <h3>{dev.name}</h3>
                  <p className={styles.role}>{dev.role}</p>
                  <p className={styles.description}>{dev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projects}>
          <h2 className={`${styles.sectionTitle} ${styles.fadeInUp}`}>Our Projects</h2>
          {portfolioData.projects.map((project, index) => (
            <div key={index} className={`${styles.project} ${index % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.projectContent}>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
                <div className={styles.projectImage} onClick={() => openGallery(project, 0)}>
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.contact}>
          <h2 className={`${styles.sectionTitle} ${styles.fadeInUp}`}>Contact Us</h2>
          <ContactForm />
        </section>
      </main>

      {galleryOpen && currentProject && (
        <ImageGallery
          images={currentProject.gallery}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}