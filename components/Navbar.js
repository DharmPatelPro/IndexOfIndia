import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

const Navbar = () => {
  return (
    <nav className={styles.mainnav}>
      <ul>
        <li>
          <Link href="/blogs">
            <a>All Articals </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
