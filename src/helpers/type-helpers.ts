/**
 * Excludes strings U from a union of strings S
 */
export type AllExcept<S extends string, U extends S> = keyof Omit<
	Record<S, unknown>,
	U
>;
