import { parseISO, format, formatDistanceToNow } from "date-fns";

import classes from './date.module.css'

type DateProps = {
	createTime: string;
	modifyTime?: string;
};

const Date: React.FC<DateProps> = ({ createTime, modifyTime }) => {
	// const _c = parseISO(createTime)
  // const _m = parseISO(modifyTime)
  // console.log(_c,_m);
  
	return (
		<>
			<time dateTime={createTime}>{format(parseISO(createTime), "LLLL d, yyyy")}</time>
			{modifyTime && <span className={classes.modifyDate}>✍️{formatDistanceToNow(parseISO(modifyTime), { addSuffix: true })}</span>}
		</>
	);
};

export default Date;
