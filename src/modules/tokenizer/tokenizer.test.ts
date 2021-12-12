import { Tokenizer } from "./tokenizer";
import { Token } from "./tokenizer.types";

type TestCase = [string, Token[]];

const TEST_CASES: TestCase[] = [
	[
		"<p>Hello world</p>",
		[
			{
				type: "TAG",
				value: "p",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "Hello world",
			},
			{
				type: "/>",
			},
			{
				type: "EOF",
			},
		],
	],
	[
		"<div><p>Hello world</p></div>",
		[
			{
				type: "TAG",
				value: "div",
			},
			{
				type: ">",
			},
			{
				type: "TAG",
				value: "p",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "Hello world",
			},
			{
				type: "/>",
			},
			{ type: "/>" },
			{ type: "EOF" },
		],
	],
	[
		`<p class="test" direction="rtl">Hello there</p>`,
		[
			{
				type: "TAG",
				value: "p",
			},
			{
				type: "ATTRIBUTE",
				name: "class",
				value: "test",
			},
			{
				type: "ATTRIBUTE",
				name: "direction",
				value: "rtl",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "Hello there",
			},
			{
				type: "/>",
			},
			{
				type: "EOF",
			},
		],
	],
	[
		`
        <body>
            <div class="center">
                <h1>About</h1>
                <p class="strikethrough">
                    Hello <strong>WORLD</strong>
                </p>
            </div>
        </body>
        `,
		[
			{
				type: "TAG",
				value: "body",
			},
			{
				type: ">",
			},
			{
				type: "TAG",
				value: "div",
			},
			{
				type: "ATTRIBUTE",
				name: "class",
				value: "center",
			},
			{
				type: ">",
			},
			{
				type: "TAG",
				value: "h1",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "About",
			},
			{
				type: "/>",
			},
			{
				type: "TAG",
				value: "p",
			},
			{
				type: "ATTRIBUTE",
				name: "class",
				value: "strikethrough",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "Hello ",
			},
			{
				type: "TAG",
				value: "strong",
			},
			{
				type: ">",
			},
			{
				type: "TEXT",
				value: "WORLD",
			},
			{
				type: "/>",
			},
			{
				type: "/>",
			},
			{
				type: "/>",
			},
			{
				type: "/>",
			},
			{
				type: "EOF",
			},
		],
	],
];

describe("Executing test cases", () => {
	TEST_CASES.map((test) => {
		it(test[0], () => {
			const tokenizer = new Tokenizer();
			tokenizer.init(test[0]);
			let tokens: Token[] = [];
			do {
				const token = tokenizer.getNextToken();
				tokens.push(token);
			} while (tokens[tokens.length - 1].type !== "EOF");
			tokens = tokens.filter((token) => token.type !== "SKIP");
			expect(tokens).toStrictEqual(test[1]);
		});
	});
});
