var express = require("express");
var router = express.Router();
const { uuid } = require("uuidv4");

console.log("SESSION_TOKEN", process.env.SESSION_TOKEN);

let api = null;
let conversations = {};

import("chatgpt").then(({ ChatGPTAPI }) => {
  api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN,
  });
});

router.get("/get-conversation", async function (req, res, next) {
  const conversation = api.getConversation();
  const conversationId = uuid();
  conversations[conversationId] = conversation;
  // const message = await conversation.sendMessage("Hello");
  res.json({ conversationId });
});

router.post("/send", async function (req, res, next) {
  const { conversationId, message } = req.body;

  let response;

  try {
    if (conversationId && conversations[conversationId])
      response = await conversations[conversationId].sendMessage(message);
    else response = await api.sendMessage(message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }

  res.json({ message: response });
});

module.exports = router;
