import openai from "./configuration/data_openai.js";
import colors from "colors";
import readlineSync from "readline-sync";

async function mainchat() {
  console.log(colors.bold.blue("Hey There! I am ChatWot!"));
  const userName = readlineSync.question(
    colors.bold.blue("Please Enter your name: ")
  );
  console.log(colors.bold.blue(`Hey ${userName}, How may I help you?`));

  const history = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow(`${userName}: `));

    try {
      const messages = history.map(([role, content]) => ({ role, content }));
      messages.push({ role: "user", content: userInput });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const botReply = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.bold.blue("Wot: ") + botReply);
        return;
      }

      console.log(colors.bold.blue("Wot: ") + botReply);
      history.push(["user", userInput]);
      history.push(["assistant", botReply]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

mainchat();
