import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ArtPlayerWrapper from "./ArtPlayerWrapper";
import Artplayer from "artplayer";

interface VideoPlayerProps {
	path: string;
	modalClose: () => void;
}

export default function VideoPlayer(props: VideoPlayerProps) {
	const [open, setOpen] = useState(true);
	const handleClose = () => {
		setOpen(false);
		props.modalClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="sm:flex sm:items-start">
							{/* <ArtPlayerWrapper
								option={{
									url: props.path,
									theme: "#ffad00",
									autoplay: true,
									setting: true,
									pip: true,
									autoSize: true,
									aspectRatio: true,
									fullscreen: true,
									airplay: true,
									hotkey: true,
									fastForward: true,
									lock: true,
									volume: 0.9,
								}}
								style={{
									minWidth: "400px",
									minHieght: "200px",
								}}
								getInstance={(art: Artplayer) => {
									art.autoSize();
									art.autoHeight();
								}}
							/> */}
							<video
								src={props.path}
								controls
								autoPlay
								className="w-full h-auto"
							/>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
