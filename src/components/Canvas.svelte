<script lang="ts">
	import { onMount } from "svelte";
	import { draw } from "./utility";

	// types
	import type { Value } from "../types";

	export let columnValues: Array<Value>;
	export let rowValues: Array<Value>;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let height: number;
	let width: number;

	onMount(() => {
		if (!canvas) {
			return;
		}
		ctx = canvas.getContext("2d");

		// set the height to avoid blurriness
		resetCanvasDimensions(canvas);

		height = canvas.height;
		width = canvas.width;
	});

	function resetCanvasDimensions(canvas: HTMLCanvasElement) {
		canvas.height = canvas.offsetHeight;
		canvas.width = canvas.offsetWidth;
	}

	function handleResize() {
		resetCanvasDimensions(canvas);
	}

	$: if (ctx) draw(ctx, width, height, rowValues, columnValues);
</script>

<canvas bind:this={canvas} on:resize={handleResize} />

<style>
	canvas {
		border: solid 1px black;
		width: 100%;
	}
</style>
