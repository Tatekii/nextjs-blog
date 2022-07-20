import Head from "next/head";
import Layout from "../components/layout/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date/date";
import { GetStaticProps } from "next";
import { blogTitle } from "../_config";

const Home: React.FC<{
	allPostsData: {
		createTime: string;
		title: string;
		id: string;
	}[];
}> = ({ allPostsData }) => {
	return (
		<Layout home>
			<Head>
				<title>{blogTitle}</title>
			</Head>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>📰Latest Posts</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, createTime, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date createTime={createTime} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export default Home;


/** 排序后的所有文章摘要数据 */
export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
};
