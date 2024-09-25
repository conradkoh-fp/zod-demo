import * as v from "valibot";

/**
 * Define the schema for the incoming message
 */
const messageSchema = v.object({
  content: v.object({
    value: v.string(),
  }),
});
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
    const parsed = v.parse(messageSchema, JSON.parse(untrustedMessage));
    console.log("good: ", parsed);
  } catch (error) {
    // format the error to be easily readable
    if (error instanceof v.ValiError) {
      let e = error as v.ValiError<typeof messageSchema>;
      let output = "";
      for (const issue of e.issues) {
        const pathComponents = issue.path?.map((p) => p.key);
        output += `Error: ${issue.message} at path ${(pathComponents || []).join(".")}` + "\n";
      }
      console.log(output);
    }
  }
}

// infer the type from the schema
type Message = ReturnType<typeof v.parse<typeof messageSchema>>;

/**
 * EXAMPLES
 * Uncomment any of these and run bun src/index.ts to see the effects
 */
// sendMessage('{"content": {"value": "123"}}'); //happy path
sendMessage('{"content": {"value": 123}}'); // error, value should be a string, but is number
// sendMessage('{"content": {"value123": 123}}'); // error, missing required value
