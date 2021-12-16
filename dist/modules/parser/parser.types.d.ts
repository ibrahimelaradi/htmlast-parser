/**
 * Represents an attribute associated with a specific element
 * @example { name: "class", value: "center-text" }
 */
export declare type ElementAttribute = {
    name: string;
    value: string;
};
/**
 * Represents the root of AST
 */
export declare type Program = {
    type: "Program";
    children: Node[];
};
/**
 * Represents a node of type Element, parses element tags
 */
export declare type Element = {
    type: "Element";
    name: string;
    attributes: ElementAttribute[];
    children: Node[];
};
/**
 * Represents a node of type Text, contains the value of text
 */
export declare type Text = {
    type: "Text";
    value: string;
};
/**
 * Represents a general node type, excluding the root node (Program)
 */
export declare type Node = Element | Text;
//# sourceMappingURL=parser.types.d.ts.map