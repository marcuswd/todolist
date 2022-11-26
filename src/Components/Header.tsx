import styles from './Header.module.css';
import todoLogo from '../assets/Logo.svg';

export function Header() {
  return (
    <>
      <header className={styles.headerGlobal}>
        <img src={todoLogo} alt='Todo Logo' />
      </header>
    </>
  );
}
