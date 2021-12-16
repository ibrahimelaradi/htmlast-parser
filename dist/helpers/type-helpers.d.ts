/**
 * Excludes strings U from a union of strings S
 */
export declare type AllExcept<S extends string, U extends S> = keyof Omit<Record<S, unknown>, U>;
//# sourceMappingURL=type-helpers.d.ts.map