import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { ownerName, blogTitle } from "../../_config";

type LayoutProps = {
	children: React.ReactNode;
	home: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
	return (
		<div className={styles.container}>
			{/* head meta */}
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Learn how to build a personal website using Next.js" />
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						blogTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={blogTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<header className={styles.header}>
				<div className={styles.navbar}>
					<Link href="/">
						<a>🏠</a>
					</Link>

					<a href="https://github.com/Tatekii" style={{display:'flex',alignItems:'center'}}>
						<svg
							height="32"
							aria-hidden="true"
							viewBox="0 0 16 16"
							version="1.1"
							width="32"
							data-view-component="true"
						>
							<path
								fill-rule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
							></path>
						</svg>
					</a>
				</div>
				{home && (
					<>
						<Image
							priority
							src="/images/rick.png"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt={ownerName}
						/>
						<h1 className={utilStyles.heading2Xl}>{ownerName}</h1>
					</>
				)}
			</header>

			<main>{children}</main>

			{/* 不是首页，渲染返回首页 */}
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Layout;
