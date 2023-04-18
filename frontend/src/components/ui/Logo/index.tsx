import { MdFastfood } from "react-icons/md";

import styles from "./styles.module.scss";

export function Logo() {
    return (
        <>

            <svg width="0" height="0">
                <linearGradient id="yellow-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#ffc002" offset="0%" />
                    <stop stopColor="#ff0072" offset="100%" />
                </linearGradient>
            </svg>

            <div className={styles.containerLogo}>
                <MdFastfood size={30} style={{ fill: "url(#yellow-gradient)" }} />
                <div>
                    <h1>
                        Fast<span>Burger</span>
                    </h1>
                </div>
            </div>
        </>
    );
}