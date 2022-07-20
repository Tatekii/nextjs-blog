import Link from "next/link";
import React from "react";
import classes from './tag.module.css'

/** 文章内的标签组件 */
const Tag: React.FC<{ tags: string[] }> = ({tags}) => {
	return (
		<blockquote className={classes['tag-list']}>
      <span>Tags:</span>
			
			{tags.map((t) => (
				// TODO:到标签页的link
				<Link href={`/tags/${t}`} key={t} >
					<a className={classes['tag-list-tag']}>{t}</a>
				</Link>
			))}
		</blockquote>
	);
};
export default Tag;
