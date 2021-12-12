/**
 * Represents an attribute associated with a specific element
 * @example { name: "class", value: "center-text" }
 */
export type ElementAttribute = {
	name: string;
	value: string;
};

/**
 * Represents the root of AST
 */
export type Program = {
	type: "Program";
	children: Node[];
};

/**
 * Represents a node of type Element, parses element tags
 */
export type Element = {
	type: "Element";
	name: string;
	attributes: ElementAttribute[];
	children: Node[];
};

/**
 * Represents a node of type Text, contains the value of text
 */
export type Text = {
	type: "Text";
	value: string;
};

/**
 * Represents a general node type, excluding the root node (Program)
 */
export type Node = Element | Text;
