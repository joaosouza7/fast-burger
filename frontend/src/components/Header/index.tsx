import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";

import Link from "next/link";

import { Logo } from "../ui/Logo";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles.module.scss";

export function Header() {

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <span>
                        <Logo />
                    </span>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Categoria</a>
                    </Link>

                    <Link href="/product" legacyBehavior>
                        <a>Cardápio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={23} />
                    </button>
                </nav>

            </div>
        </header>
    );
}