// src/components/Landing.jsx

import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <>
      <main>
        <div className={styles.landingCopy}>
          <p>SUSTAIN allows you to look up products to check their sustainability credentials.</p>
          <br />
          <p>Simply scan the QR code on the product to bring you to the product page or search for a product.</p>
          <br />
          <p>For a more conscious and sustainable world 🌱</p>
          <br />
        </div>
        <div className={styles.landingPageButtons}>
          <a href="/signup" className="button" role="button">Sign Up</a>
          <a href="/signin" className="button" role="button">Sign In</a>
        </div>
      </main>
    </>
  );
};

export default Landing;
