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