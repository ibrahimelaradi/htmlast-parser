import { Program } from "./parser.types";
/**
 * Parser class, used to parse HTML strings into an Abstract Syntax Tree (AST)
 */
export declare class Parser {
    /**
     * Represents the next token to be consumed
     */
    private _lookahead;
    /**
     * The tokenizer instance
     */
    private _tokenizer;
    constructor();
    /**
     * Parses HTML content into an Abstract Syntac Tree (AST)
     * @param content HTML content to parse
     * @returns AST representation of the HTML
     */
    parse(content: string): Program;
    /**
     * Used as an entry point, and represents the root level of the AST
     */
    private Program;
    /**
     * Used to parse a list of elements (TEXT or TAG)
     * @returns A list of elements
     */
    private ElementChildren;
    /**
     * Used to parse one Element (TAG)
     * @returns AST element
     */
    private Element;
    /**
     * Used to parse contents of element that is a string (TEXT)
     * @returns Text content
     */
    private Text;
    /**
     * Used to parse a list of element attributes
     * @returns List of element attributes
     */
    private ElementAttributes;
    /**
     * Consume the lookahead of the expected type and return it
     * @param type Token type expected
     * @returns Current token
     */
    private _eat;
}
//# sourceMappingURL=parser.d.ts.map