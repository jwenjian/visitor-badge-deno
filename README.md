# visitor-badge-deno

Just like [visitor-badge](https://github.com/jwenjian/visitor-badge), but only provides `.json` file.

Deployed under my free Deno account, 100k req/day, 1000 req/min.

Providing API for generating dynamic `.json` response which contains the latest visitor (views) count:

`https://visitor-badge.deno.dev/`**put.your.page.id.here**`.json`

e.g.:

`https://visitor-badge.deno.dev/jwenjian.visitor-badge-deno.json`

The API will return response like:

```json
{"color":"lightgrey","label":"views","message":"2","schemaVersion":1,"style":"flat"}
```

which can be used by [https://shields.io/endpoint](https://shields.io/endpoint) to create a visitor badge, refer to docs of shields endpoint to customize your visitor badge.


Basic Usage:

```markdown
![](https://img.shields.io/endpoint?url=https%3A%2F%2Fvisitor-badge.deno.dev%2Fjwenjian.visitor-badge-deno.json)

```

![](https://img.shields.io/endpoint?url=https%3A%2F%2Fvisitor-badge.deno.dev%2Fjwenjian.visitor-badge-deno.json)

Change style:

```markdown
![](https://img.shields.io/endpoint?color=green&label=CustomizedLabel&logo=github&logoColor=red&style=for-the-badge&url=https%3A%2F%2Fvisitor-badge.deno.dev%2Fjwenjian.visitor-badge-deno.json)
```

![](https://img.shields.io/endpoint?color=green&label=CustomizedLabel&logo=github&logoColor=red&style=for-the-badge&url=https%3A%2F%2Fvisitor-badge.deno.dev%2Fjwenjian.visitor-badge-deno.json)

Have fun!

