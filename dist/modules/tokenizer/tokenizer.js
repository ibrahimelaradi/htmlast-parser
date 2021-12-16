"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
/**
 * Current token specifications
 */
const TOKEN_SPEC = [
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
class Tokenizer {
    constructor() {
        /**
         * Full content
         */
        this.content = "";
        /**
         * Cursor position
         */
        this.cursor = 0;
    }
    /**
     * Initialize tokenizer with content to tokenize
     * @param content Content to tokenize
     */
    init(content) {
        this.content = content;
        this.cursor = 0;
    }
    _isEOF() {
        return this.cursor >= this.content.length;
    }
    /**
     * Get the next token and return it
     * @returns Next token in the content
     * @throws SyntaxError on unrecognized character
     */
    getNextToken() {
        if (this._isEOF())
            return { type: "EOF" };
        const current = this.content.slice(this.cursor);
        for (const [regex, type] of TOKEN_SPEC) {
            const match = regex.exec(current);
            if (!match)
                continue;
            this.cursor += match[0].length;
            if (!type)
                return { type: "SKIP" };
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
    debugCursor() {
        return this.content.slice(this.cursor);
    }
}
exports.Tokenizer = Tokenizer;
