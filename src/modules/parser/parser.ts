import { Tokenizer } from "../tokenizer";
import { Token, TokenType } from "../tokenizer/tokenizer.types";
import { ElementAttribute, Program, Element, Node, Text } from "./parser.types";

/**
 * Parser class, used to parse HTML strings into an Abstract Syntax Tree (AST)
 */
export class Parser {
	/**
	 * Represents the next token to be consumed
	 */
	private _lookahead: Token;
	/**
	 * The tokenizer instance
	 */
	private _tokenizer: Tokenizer;
	constructor() {
		this._tokenizer = new Tokenizer();
		this._lookahead = { type: "SKIP" };
	}
	/**
	 * Parses HTML content into an Abstract Syntac Tree (AST)
	 * @param content HTML content to parse
	 * @returns AST representation of the HTML
	 */
	parse(content: string) {
		this._tokenizer.init(content);
		while (this._lookahead.type === "SKIP")
			this._lookahead = this._tokenizer.getNextToken();
		return this.Program();
	}
	/**
	 * Used as an entry point, and represents the root level of the AST
	 */
	private Program(): Program {
		return {
			type: "Program",
			children: this.ElementChildren(),
		};
	}
	/**
	 * Used to parse a list of elements (TEXT or TAG)
	 * @returns A list of elements
	 */
	private ElementChildren(): Node[] {
		const children: Node[] = [];

		while (this._lookahead.type !== "/>" && this._lookahead.type !== "EOF") {
			switch (this._lookahead.type) {
				case "TAG":
					children.push(this.Element());
					break;
				case "TEXT":
					children.push(this.Text());
					break;
				default:
					throw new SyntaxError(
						`Unexpected token: expected TAG or TEXT, received ${
							this._lookahead.type
						}, at cursor "${this._tokenizer.debugCursor()}"`
					);
			}
		}
		return children;
	}
	/**
	 * Used to parse one Element (TAG)
	 * @returns AST element
	 */
	private Element(): Element {
		const token = this._eat("TAG");
		const name = token.type === "TAG" ? token.value : "unknown";
		const children: Node[] = [];
		const attributes: ElementAttribute[] = [];
		if (this._lookahead.type === "ATTRIBUTE") {
			attributes.push(...this.ElementAttributes());
		}
		if (this._lookahead.type === ">") {
			this._eat(">");
			children.push(...this.ElementChildren());
		}
		this._eat("/>");
		return {
			type: "Element",
			name,
			children,
			attributes,
		};
	}
	/**
	 * Used to parse contents of element that is a string (TEXT)
	 * @returns Text content
	 */
	private Text(): Text {
		const token = this._eat("TEXT");
		return {
			type: "Text",
			value: token.type === "TEXT" ? token.value : "",
		};
	}
	/**
	 * Used to parse a list of element attributes
	 * @returns List of element attributes
	 */
	private ElementAttributes(): ElementAttribute[] {
		const attributes: ElementAttribute[] = [];
		while (this._lookahead.type === "ATTRIBUTE") {
			const token = this._eat("ATTRIBUTE");
			if (token.type === "ATTRIBUTE") {
				attributes.push({
					name: token.name,
					value: token.value,
				});
			}
		}
		return attributes;
	}
	/**
	 * Consume the lookahead of the expected type and return it
	 * @param type Token type expected
	 * @returns Current token
	 */
	private _eat(type: TokenType): Token {
		const token = this._lookahead;

		if (!token) {
			throw new SyntaxError("Unexpected EOF");
		}

		if (token.type !== type) {
			throw new SyntaxError(
				`Unexpected Token Type: ${token.type}, expected ${type}`
			);
		}

		this._lookahead = this._tokenizer.getNextToken();

		while (this._lookahead.type === "SKIP")
			this._lookahead = this._tokenizer.getNextToken();

		return token;
	}
}
