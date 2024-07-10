import { useEffect, useRef } from "react";
import Artplayer from "artplayer";

export default function ArtPlayerWrapper({
	option,
	getInstance,
	...rest
}: {
	option: any;
	getInstance: any;
	[key: string]: any;
}) {
	const artRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const art = new Artplayer({
			...option,
			container: artRef.current,
		});

		if (art && art.video) {
			art.autoSize();
			art.autoHeight();
			// console.log(art.rect);
			// console.log(artRef.current?.querySelector('[data-video="videoHeight"]'));

			// const aspectRatio = videoWidth / videoHeight;
			// const artplayerApp = artRef.current?.querySelector(
			// 	".artplayer-app"
			// ) as HTMLElement;
			// const containerWidth = artplayerApp.offsetWidth;
			// const containerHeight = containerWidth / aspectRatio;
			// // console.log("videoHeight", videoHeight, "videoWidth", videoWidth);
			// // console.log("containerWidth", containerWidth, "containerHeight", containerHeight);
			// artplayerApp.style.width = `${containerWidth}px`;
			// artplayerApp.style.height = `${containerHeight}px`;
		}

		if (getInstance && typeof getInstance === "function") {
			getInstance(art);
		}

		return () => {
			if (art && art.destroy) {
				art.destroy(false);
			}
		};
	}, []);

	return <div className="w-full h-auto" ref={artRef} {...rest}></div>;
}
