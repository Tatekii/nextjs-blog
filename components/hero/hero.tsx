import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
	return (
		<section className={classes.hero}>
			{/* <div className={classes.image}>
				<Image src="/images/rick.png" alt="Wubba Lubba Dub Dub" width={300} height={300} />
			</div> */}
			<h1>Hi, I'm Siyn</h1>
			<p>This blog is about web development or maybe some funny stuff.</p>
		</section>
	);
};

export default Hero;
