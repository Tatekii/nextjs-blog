import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatISO } from "date-fns";

const hljs = require("highlight.js"); // https://highlightjs.org/
const md = require("markdown-it")({
	langPrefix: "language-",
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (__) {}
		}

		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
	},
});

const postsDirectory = path.join(process.cwd(), "posts");

/** 读取post目录 */
const getPostFiles = () => fs.readdirSync(postsDirectory);

/** 获得排序后的文章列表 */
export function getSortedPostsData() {
	const fileNames = getPostFiles();

	const allPostsData = fileNames.map((fileName) => {
		// 从文件名移除".md"
		const id = fileName.replace(/\.md$/, "");

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		// file state
		const fileState = fs.statSync(fullPath);

		// 创建时间
		const createTime = formatISO(fileState.ctime);

		// 取文章的meta
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			createTime,
			...(matterResult.data as { title: string }),
		};
	});
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.createTime < b.createTime) {
			return 1;
		} else {
			return -1;
		}
	});
}

/** 将post文件名作为id属性 */
export function getAllPostIds() {
	const fileNames = getPostFiles();
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
}

/** 解析一篇md */
export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const matterResult = matter(fileContents);

	// file state
	const fileState = fs.statSync(fullPath);

	// 创建时间
	const createTime = formatISO(fileState.ctime);
	// 修改时间
	const modifyTime = formatISO(fileState.mtime);

	// 解析markdown字符串
	const processedContent = await md.render(matterResult.content);

	const contentHtml = processedContent.toString();

	return {
		id,
		contentHtml,
		createTime,
		modifyTime,
		...(matterResult.data as { title: string; tags: string[] }),
	};
}
