import { z } from "zod";

/**
 * Define the schema for the incoming message
 */
const messageSchema = z
  .object({
    content: z.object({
      value: z.string(),
    }),
  })
  .strict();
/**
 * parse JSON from string to message object
 * @param untrustedMessage
 */
function sendMessage(untrustedMessage: string) {
  try {
    // bad implementation: type assertion, but unchecked during runtime
    const parsed2 = JSON.parse(untrustedMessage) as Message; //types are not checked in runtime
    console.log("bad: ", parsed2);

    // good implementation: ensures that the runtime type matches the schema
    const parsed = messageSchema.parse(JSON.parse(untrustedMessage));
    console.log("good: ", parsed);
  } catch (error) {
    // format the error to be easily readable
    if (error instanceof z.ZodError) {
      let output = "";
      for (const issues of error.issues) {
        output += `Error: ${issues.message} at path ${issues.path.join(".")}` + "\n";
      }
      console.log(output);
    }
  }
}

// infer the type from the schema
type Message = z.infer<typeof messageSchema>;

/**
 * EXAMPLES
 * Uncomment any of these and run bun src/index.ts to see the effects
 */
// sendMessage('{"content": {"value": "123"}}'); //happy path
sendMessage('{"content": {"value": 123}}'); // error, value should be a string, but is number
// sendMessage('{"content": {"value123": 123}}'); // error, missing required value
