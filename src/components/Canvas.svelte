<script lang="ts">
	import { onMount } from "svelte";
	import { draw } from "./utility";

	export let columnValues;
	export let rowValues;

	let canvas;
	let ctx;
	let height;
	let width;

	onMount(() => {
		if (!canvas) {
			return;
		}
		ctx = canvas.getContext("2d");
		height = canvas.height;
		width = canvas.width;
	});

	$: if (ctx) draw(ctx, width, height, rowValues, columnValues);
</script>

<canvas bind:this={canvas} height="400" width="400" />

<style>
	canvas {
		border: solid 1px black;
	}
</style>
