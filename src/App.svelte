<script lang="ts">
	import Canvas from "./components/Canvas.svelte";
	import { rowCount, columnCount } from "./stores";

	import type { Value } from "./types";

	$: rowValues = new Array($rowCount && $rowCount > 3 ? $rowCount : 3).fill(
		0
	);
	$: columnValues = new Array(
		$columnCount && $columnCount > 3 ? $columnCount : 3
	).fill(0);

	let rowRandomness = 0.5;
	let columnRandomness = 0.5;

	const seedWithRandomValues = (array: Array<Value>, p: number) => {
		return array.map((_) => (Math.random() < p ? 0 : 1));
	};
</script>

<main>
	<h1>Hitemozachi Stitch Patterns</h1>
	<label>
		Number of Rows
		<input bind:value={$rowCount} type="number" />
	</label>
	<button
		on:click={() =>
			(rowValues = seedWithRandomValues(rowValues, rowRandomness))}
	>
		Randomize Rows
	</button>

	<br />

	<label>
		Number of Columns
		<input bind:value={$columnCount} type="number" />
	</label>
	<button
		on:click={() =>
			(columnValues = seedWithRandomValues(
				columnValues,
				columnRandomness
			))}
	>
		Randomize Columns
	</button>

	<div class="layout">
		<div class="moreSpacing">
			<div id="just-for-spacing" />
			<div class="rowContainer">
				{#each columnValues as columnValue, index (index)}
					<input class="valueContainer" bind:value={columnValue} />
				{/each}
			</div>
		</div>
		<div class="columnAndCanvasContainer">
			<div class="columnContainer">
				{#each rowValues as rowValue, index (index)}
					<input class="valueContainer" bind:value={rowValue} />
				{/each}
			</div>
			<div class="canvasContainer">
				<Canvas {columnValues} {rowValues} />
			</div>
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		min-height: 100vh;
		max-width: 100vw;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.layout {
		width: 100vw;
	}
	.moreSpacing {
		display: flex;
		flex-direction: row;
	}
	#just-for-spacing {
		display: inline-block;
		width: 4ex;
		flex-grow: 0;
	}
	.rowContainer {
		display: inline-flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-grow: 1;
	}
	.columnAndCanvasContainer {
		display: flex;
		flex-direction: row;
		min-height: 70vh;
	}
	.columnContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.valueContainer {
		width: 4ex;
		height: 4ex;
	}
	.canvasContainer {
		display: flex;
		flex-grow: 1;
	}
</style>
