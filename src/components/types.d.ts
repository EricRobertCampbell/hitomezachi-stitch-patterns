export type Coordinate = {
	x: number;
	y: number;
};

export type Circle = Coordinate & {
	radius?: number;
};
