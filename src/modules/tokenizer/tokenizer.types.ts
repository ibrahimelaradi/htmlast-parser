import { AllExcept } from "../../helpers/type-helpers";

/**
 * List of token types available in the Tokenizer
 */
export type TokenType =
	| "<"
	| ">"
	| "/>"
	| "!"
	| "TAG"
	| "DOCTYPE"
	| "COMMENT_START"
	| "COMMENT_END"
	| "TEXT"
	| "ATTRIBUTE";

/**
 * Token specs
 */
export type TokenSpec = [RegExp, TokenType | null][];

/**
 * Types of tokens that can be returned
 */
export type Token =
	| {
			type: AllExcept<TokenType, "TEXT" | "TAG" | "ATTRIBUTE">;
	  }
	| {
			type: "EOF";
	  }
	| {
			type: "SKIP";
	  }
	| {
			type: "TAG";
			value: string;
	  }
	| {
			type: "ATTRIBUTE";
			name: string;
			value: string;
	  }
	| {
			type: "TEXT";
			value: string;
	  };
