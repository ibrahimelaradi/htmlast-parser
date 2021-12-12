# HTML to AST parser

A minimalistic HTML to AST parser used for a minimal use cases such as parsing descriptions of rich text editors into an abstract syntax tree that can be handled better

## Installation

```bash
yarn add @ibrahimelaradi/htmlast-parser
```

```bash
npm i --save @ibrahimelaradi/htmlast-parser
```

## Usage

```typescript
import { Parser } from "@ibrahimelaradi/htmlast-parser";

const html = `<p>Hello world</p>`;
// Initialize instance
const parser = new Parser();
// Parse
const program = parser.parse(html);

console.log(JSON.stringify(program, null, 2));
```

Output:

```bash
{
  type: "Program",
  children: [
    {
      type: "Element",
      name: "p",
      attributes: [],
      children: [
        {
          type: "Text",
          value: "Hello world"
        }
      ]
    }
  ]
}
```

## Contribution

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request 🎉

## License

The MIT License (MIT)

Copyright (c) 2021-present Ibrahim Elaradi.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
