import { Token } from "./tokenizer.types";
export declare class Tokenizer {
    /**
     * Full content
     */
    private content;
    /**
     * Cursor position
     */
    private cursor;
    /**
     * Initialize tokenizer with content to tokenize
     * @param content Content to tokenize
     */
    init(content: string): void;
    private _isEOF;
    /**
     * Get the next token and return it
     * @returns Next token in the content
     * @throws SyntaxError on unrecognized character
     */
    getNextToken(): Token;
    debugCursor(): string;
}
//# sourceMappingURL=tokenizer.d.ts.map