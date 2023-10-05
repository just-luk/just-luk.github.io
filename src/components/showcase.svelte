<script lang="ts">
	import type { Project } from "~/types";
    function sigmoid(x: number) {
        return 1 / (1 + Math.exp(-10 * x + 0.5));
    }

	function mouseMove(e: MouseEvent) {
		let translateX = 0.0;
		let translateY = 0.0;
		if (e && e.currentTarget) {
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const distanceFromLeft = (e.clientX - rect.left - 340);
			const distanceFromTop = (e.clientY - rect.top - 340);
            // translate x should be between 0 and 43
            translateX = sigmoid(distanceFromLeft / rect.width) * 43;
            // translate y should be between 0 and 31
            translateY = sigmoid(distanceFromTop / rect.height) * 31;
		}

		const showcase = document.getElementById("showcase");
		if (showcase) {
			showcase.style.setProperty("--translate-x", `-${translateX}%`);
			showcase.style.setProperty("--translate-y", `-${translateY}%`);
			showcase.style.setProperty("--rotate", `0deg`);
		}
	}

	function mouseLeave() {
		const showcase = document.getElementById("showcase");

		if (showcase) {
			showcase.style.setProperty("--translate-x", `-18%`);
			showcase.style.setProperty("--translate-y", `-15%`);
			showcase.style.setProperty("--rotate", `10deg`);
		}
	}
	// create a list of projects
	let projects: Project[] = [
		{
			title: "xCTF Website",
			url: "https://github.com/xctf-io/xctf",
			image: "images/ctf-website.png",
		},
		{
			title: "GCLD Certification",
			url: "https://www.credly.com/badges/848fa69d-6b8d-4306-b522-a6e43c812b17",
			image: "images/gcld.jpg",
		},
		{
			title: "Breakerspace Lab",
			url: "https://breakerspace.cs.umd.edu/",
			image: "images/breakerspace.png",
		},
		{
			title: "MCPSHSF Website",
			url: "https://mcpshsf.com",
			image: "images/hsf-website.png",
		},
		{
			title: "MCPSHSF 2023",
			url: "https://github.com/xctf-io/chalgen/tree/master/competitions/mcpshsf-2023",
			image: "images/mcpshsf.jpg",
		},
		{
			title: "This Website!",
			url: "https://github.com/just-luk/just-luk.github.io",
			image: "images/my-website.png",
		},
		{
			title: "CTF Challenge Generator",
			url: "https://github.com/xctf-io/chalgen",
			image: "images/chalgen.png",
		},
		{
			title: "Network Coding Signatures",
			url: "https://github.com/just-luk/nc-signatures",
			image: "images/nc-signatures.png",
		},
		{
			title: "GFACT",
			url: "https://www.credly.com/badges/5f403ae5-b8aa-49df-b702-1b85c961d732",
			image: "images/gfact.png",
		},
	];
</script>

<div
	id="showcase-container"
	on:mousemove={mouseMove}
	on:mouseleave={mouseLeave}
	role="presentation"
	class="rounded-2xl bg-offset h-[calc(100vh-32px)] m-4 overflow-hidden"
>
	<!-- 3x3 grid of images -->
	<div
		id="showcase"
		class="grid grid-cols-3 gap-8 w-[175%] h-[125%] p-8 transition-all duration-1000"
	>
		{#each projects as project}
			<a href={project.url} class="hover:scale-[1.03] relative group">
				<img
					src={project.image}
					alt={project.title}
					class="object-cover w-full h-full rounded-lg"
				/>
				<div
					class="transition-all duration-500 bg-semitransparent font-light text-sm absolute z-10 bottom-0 m-4 px-4 py-2 rounded-md group-hover:opacity-100 opacity-0"
				>
					{project.title}
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	#showcase {
		--translate-x: -18%;
		--translate-y: -15%;
		--rotate: 10deg;
		rotate: var(--rotate);
		transform: translate(var(--translate-x), var(--translate-y));
	}
</style>
