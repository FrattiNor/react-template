import type { FC } from 'react';
import styles from './index.module.less';

type Props = {
    code: string;
    message: string;
};

const Result: FC<Props> = ({ code, message }) => {
    return (
        <div className={styles['wrapper']}>
            <svg width="500px" height="500px" viewBox="0 0 500 500" className={styles['svg']}>
                <g strokeLinejoin="bevel" strokeLinecap="round">
                    <g className={styles['stroke']} fill="none" strokeWidth="2">
                        <rect x="10" y="180" width="470" height="300" />
                        <path d="M 480 180 l 10 10 l 0 300 l -470 0 l -10 -10" />

                        <circle cx="110" cy="205" r="9" />
                        <circle cx="380" cy="205" r="9" />

                        <circle cx="430" cy="205" r="6" />
                        <circle cx="455" cy="205" r="6" />

                        <path d="M 242 33 A 8 8 180 1 0 258 33" />
                        <circle cx="250" cy="18" r="8" />
                        <line x1="110" y1="205" x2="242" y2="33" />
                        <line x1="380" y1="205" x2="258" y2="33" />
                        <line x1="242" y1="18" x2="242" y2="33" />
                        <line x1="258" y1="18" x2="258" y2="33" />
                    </g>

                    <g className={styles['fill']} stroke="none">
                        <rect x="10" y="230" width="470" height="200" />
                        <path d="M 480 230 l 10 10 l 0 197 l -10 -7 Z" />

                        <rect x="30" y="196" width="30" height="3" />
                        <rect x="30" y="204" width="30" height="3" />
                        <rect x="30" y="212" width="30" height="3" />
                    </g>

                    <text className={styles['text']} x="250" y="350" textAnchor="middle" dominantBaseline="middle" fontSize="160px">
                        {code}
                    </text>
                </g>
            </svg>

            <div className={styles['message']}>{message}</div>
        </div>
    );
};

export default Result;
