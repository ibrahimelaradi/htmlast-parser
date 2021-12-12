import { TokenSpec, Token } from "./tokenizer.types";

/**
 * Current token specifications
 */
const TOKEN_SPEC: TokenSpec = [
	/**
	 * Special
	 */
	[/^<!\s*doctype\s*\w+\s*>/, "DOCTYPE"],
	[/^<!--/, "COMMENT_START"],
	[/^-->/, "COMMENT_END"],

	/**
	 * Tags
	 */
	[/^<\w+/, "TAG"],
	[/^>/, ">"],
	[/^<\/\w+>/, "/>"],
	[/^\/>/, "/>"],
	[/^!/, "!"],

	/**
	 * Attributes
	 */
	[/^\w+=".[^"]+"/, "ATTRIBUTE"],

	/**
	 * White space
	 */
	[/^\s+/, null],

	/**
	 * Text
	 */
	[/^.[^<>]*/, "TEXT"],
];

export class Tokenizer {
	/**
	 * Full content
	 */
	private content = "";
	/**
	 * Cursor position
	 */
	private cursor = 0;
	/**
	 * Initialize tokenizer with content to tokenize
	 * @param content Content to tokenize
	 */
	public init(content: string) {
		this.content = content;
		this.cursor = 0;
	}
	private _isEOF() {
		return this.cursor >= this.content.length;
	}
	/**
	 * Get the next token and return it
	 * @returns Next token in the content
	 * @throws SyntaxError on unrecognized character
	 */
	public getNextToken(): Token {
		if (this._isEOF()) return { type: "EOF" };
		const current = this.content.slice(this.cursor);
		for (const [regex, type] of TOKEN_SPEC) {
			const match = regex.exec(current);
			if (!match) continue;
			this.cursor += match[0].length;
			if (!type) return { type: "SKIP" };
			if (type === "ATTRIBUTE") {
				const [name, value] = match[0].split("=");
				return {
					type,
					name,
					value: value.replace(/"/g, ""),
				};
			}
			if (type === "TAG") {
				return {
					type,
					value: match[0].replace("<", ""),
				};
			}
			if (type === "TEXT")
				return {
					type,
					value: match[0],
				};
			return { type };
		}
		throw new SyntaxError(`Unexpected token: ${current[0]} at ${this.cursor}`);
	}
	public debugCursor(): string {
		return this.content.slice(this.cursor);
	}
}
