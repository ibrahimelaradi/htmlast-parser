import { Parser } from "./parser";
import { Program } from "./parser.types";

type TestCase = [string, Program];

const TEST_CASES: TestCase[] = [
	[
		`
      <body>
        <h1 class="test">A message for the parser</h1>
        <p>Hello world</p>
      </body>
    `,
		{
			type: "Program",
			children: [
				{
					type: "Element",
					name: "body",
					attributes: [],
					children: [
						{
							type: "Element",
							name: "h1",
							attributes: [
								{
									name: "class",
									value: "test",
								},
							],
							children: [
								{
									type: "Text",
									value: "A message for the parser",
								},
							],
						},
						{
							type: "Element",
							name: "p",
							attributes: [],
							children: [
								{
									type: "Text",
									value: "Hello world",
								},
							],
						},
					],
				},
			],
		},
	],
	[
		`
      <body>
        <h1>About</h1>
        <p>
          This product can only be found <strong>HERE</strong>
        </p>
        <ul>
          <li>Affordable</li>
          <li>Lasts forever</li>
          <li>Can save your life!</li>
        </ul>
      </body>
    `,
		{
			type: "Program",
			children: [
				{
					type: "Element",
					name: "body",
					attributes: [],
					children: [
						{
							type: "Element",
							name: "h1",
							attributes: [],
							children: [
								{
									type: "Text",
									value: "About",
								},
							],
						},
						{
							type: "Element",
							name: "p",
							attributes: [],
							children: [
								{
									type: "Text",
									value: "This product can only be found ",
								},
								{
									type: "Element",
									name: "strong",
									attributes: [],
									children: [
										{
											type: "Text",
											value: "HERE",
										},
									],
								},
							],
						},
						{
							type: "Element",
							name: "ul",
							attributes: [],
							children: [
								{
									type: "Element",
									name: "li",
									attributes: [],
									children: [
										{
											type: "Text",
											value: "Affordable",
										},
									],
								},
								{
									type: "Element",
									name: "li",
									attributes: [],
									children: [
										{
											type: "Text",
											value: "Lasts forever",
										},
									],
								},
								{
									type: "Element",
									name: "li",
									attributes: [],
									children: [
										{
											type: "Text",
											value: "Can save your life!",
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
];

describe("Execute test cases", () => {
	TEST_CASES.forEach(([test, exp]) => {
		it(test, () => {
			const parser = new Parser();
			const program = parser.parse(test);
			expect(program).toStrictEqual(exp);
		});
	});
});
