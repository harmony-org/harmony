# discord-deno

![banner](images/discord-deno.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Discord Deno API that is easy to use

## Table of Contents

- [Usage](#usage)
- [Docs](#docs)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Usage

```ts
import { Client } from 'https://deno.land/x/discord-deno/models/client.ts'
import { Message } from 'https://deno.land/x/discord-deno/structures/message.ts'

const bot = new Client()

bot.on('messageCreate', (msg: Message): void => {
  if (msg.content === '!ping') {
    msg.channel.send(`Pong! ping: ${bot.ping}`)
  }
})

bot.connect(TOKEN, [GatewayIntents.GUILD_MESSAGES])
```

## Docs

Not made yet

## Maintainers

[@Helloyunho](https://github.com/Helloyunho)

## Contributing

See [the contributing file](CONTRIBUTING.md)!

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2020 Helloyunho
