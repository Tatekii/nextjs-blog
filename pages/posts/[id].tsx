import Layout from "../../components/layout/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { FC } from "react";
import Link from "next/link";
import Tag from "../../components/tag/tag";
import classes from './id.module.css'

const Post: FC<{
	postData: {
		title: string;
		contentHtml: string;
		tags: string[];
		createTime: string;
		modifyTime: string;
	};
}> = ({ postData: { title, createTime, modifyTime, tags, contentHtml } }) => {
	return (
		<Layout home={false}>
			<Head>
				<title>{title}</title>
			</Head>

			<article className="prose mx-auto">
				<div className={classes.header}>
					<h1 className={utilStyles.headingXl}>{title}</h1>
					<div className={utilStyles.lightText}>
						<Date createTime={createTime} modifyTime={modifyTime} />
					</div>
					<Tag tags={tags} />
				</div>

				<div className={classes.main} dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</article>
		</Layout>
	);
};
export default Post;

/** 规定预渲染的所有路径=>全部post */
export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
};

/** 预渲染的完整文章数据 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id as string);
	return {
		props: {
			postData,
		},
	};
};
