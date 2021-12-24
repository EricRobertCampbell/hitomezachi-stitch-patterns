import type { Circle, Coordinate } from "./types";
import type { Value, Matrix, Pair } from "../types";

export function draw(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	rowValues: Array<Value>,
	columnValues: Array<Value>
): void {
	if (!ctx) {
		console.log("In draw; no context found");
		return;
	}
	const gridDots = generateDots(
		width,
		height,
		columnValues.length,
		rowValues.length
	);
	ctx.clearRect(0, 0, width, height);
	drawDots(ctx, gridDots);
	drawStitches(ctx, gridDots, rowValues, columnValues);
}

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
	const { x, y, radius = 2 } = circle;
	console.log(`About to draw circle (${x}, ${y})`);
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function generateDots(
	width: number,
	height: number,
	numColumnSeps: number,
	numRowSeps: number
): Matrix<Circle> {
	const radius = 2;
	const columnWidth = generateDistance(width, numColumnSeps);
	const rowWidth = generateDistance(height, numRowSeps);

	const dots = [];
	for (let i = 0; i < numColumnSeps; i++) {
		const rowDots = [];
		for (let j = 0; j < numRowSeps; j++) {
			const x = (i + 1) * columnWidth;
			const y = (j + 1) * rowWidth;
			rowDots.push({ x, y, radius });
		}
		dots.push(rowDots);
	}
	return dots;
}
function drawDots(ctx: CanvasRenderingContext2D, dots: Matrix<Circle>) {
	console.log("In drawDots");

	dots.forEach((rowDots) => {
		rowDots.forEach((dot) => drawCircle(ctx, dot));
	});

	console.log("End of drawDots");
}

function generateDistance(width: number, numSeps: number) {
	return width / (numSeps + 1);
}

export function drawStitches(
	ctx: CanvasRenderingContext2D,
	dots: Array<Array<Circle>>,
	rowValues: Array<Value>,
	columnValues: Array<Value>
): void {
	if (!columnValues || !rowValues) {
		console.log("missing values; not drawing", { rowValues, columnValues });
		return;
	}
	if (!ctx) {
		console.log("No context found");
		return;
	} else {
		console.log("found context");
	}
	drawRowStitches(ctx, dots, columnValues);
	drawColumnStitches(ctx, transpose(dots), rowValues);
}

function drawRowStitches(
	ctx: CanvasRenderingContext2D,
	dots: Matrix<Coordinate>,
	rowValues: Array<Value>
): void {
	// for each row, generate the pairs
	console.log("in drawRowStitches", { dots, rowValues });
	rowValues.forEach((rowValue, index) => {
		const dotsRow = dots[index];
		const pairs = partitionIntoPairs(
			rowValue === 0 ? dotsRow : dotsRow.slice(1)
		);
		pairs.forEach((pair) => drawStitch(ctx, pair));
	});
}

function drawColumnStitches(
	ctx: CanvasRenderingContext2D,
	dots: Matrix<Coordinate>,
	columnValues: Array<Value>
): void {
	console.log("in drawColumnStitches", { dots, columnValues });

	// for each row, generate the pairs
	columnValues.forEach((columnValue, index) => {
		const dotsColumn = dots[index];
		const pairs = partitionIntoPairs(
			columnValue === 0 ? dotsColumn : dotsColumn.slice(1)
		);
		pairs.forEach((pair) => drawStitch(ctx, pair));
	});
}

function partitionIntoPairs<T>(row: Array<T>): Array<Pair<T>> {
	const pairs = [];
	// drop the last value if there are an odd number of elements in the row
	const effectiveRow =
		row.length % 2 === 0 ? row : row.slice(0, row.length - 1);

	// now generate the pairs
	for (let i = 0; i < effectiveRow.length; i++) {
		if (i % 2 === 0) {
			pairs.push([effectiveRow[i]]);
		} else {
			pairs[pairs.length - 1].push(effectiveRow[i]);
		}
	}

	return pairs;
}

function drawStitch(
	ctx: CanvasRenderingContext2D,
	pair: Pair<Coordinate>
): void {
	const [first, second] = pair;
	ctx.beginPath();
	ctx.moveTo(first.x, first.y);
	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.lineTo(second.x, second.y);
	ctx.stroke();
	ctx.closePath();
}

function transpose<T>(matrix: Matrix<T>): Matrix<T> {
	const transposed = [];
	const width = matrix.length;
	const height = matrix[0].length;

	for (let i = 0; i < height; i++) {
		transposed.push([]);
		for (let j = 0; j < width; j++) {
			transposed[i].push(matrix[j][i]);
		}
	}
	return transposed;
}
