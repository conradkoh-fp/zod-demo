# Using Zod to validate untrusted payloads
This demo shows how to use zod to validate the schema of an untrusted object.

## Problem
In a pub/sub system, where messages are sent across systems / teams, it can be difficult to debug why the shared state was left in an invalid state. In systems where the effects of the message are to mutate shared state (e.g. redux), this can make the problems more difficult to detect / debug.

For example, a publisher can leave the store in an invalid state, yet the use case that uses the state may only be used somewhere 5 - 10 minutes later by another use case.

By guaranteeing the schema of the messages, we can ensure that the messages are valid before they are processed.

## Solution
Use the zod library to declare the schema of the messages and use the parse method to validate the messages.

## Demo
Refer to the file [`src/index.ts`](src/index.ts) for the demo.

### UPDATE: Valibot
One downside of zod is that it [does not support tree-shaking](https://github.com/colinhacks/zod/issues/2596). An alternative to zod is [valibot](https://valibot.dev/). Anecdotally, [this article](https://mwskwong.com/blog/migrating-from-zod-to-valibot-a-comparative-experience#bundle-size-is-as-small-as-advertised) shows an example where the bundle size was reduced from `12.37kb` gzipped to `1.72kb` gzipped.

The libraries expose a similar API, and a demo can be found in [`src/index.valibot.ts`](src/index.valibot.ts).