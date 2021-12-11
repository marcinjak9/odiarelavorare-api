const express = require("express");
// const axios = require('axios')
require("dotenv").config();
const cors = require('cors')
const TelegramBot = require('node-telegram-bot-api');

const port = process.env.PORT;

const token = process.env.TELEGRAM_TOKEN;
const chat_id = process.env.CHAT_ID
const secret = process.env.CAPTCHA_SECRET
const sitekey = process.env.CAPTCHA_SITE_KEY

const bot = new TelegramBot(token, {polling: true});

const app = express();
app.use(express.json()); //Allows us to take data from forms.
app.use(cors())

function objToString (obj) {
  var str = '';
  for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
          str += `*${p}* \n${obj[p]} \n\n`
      }
  }
  return str;
}


app.post('/form', (req, res) => {
  console.log(req.body)
  const body = req.body;
  // const body = JSON.parse(req.body);
  const solution = body.solution
  const b = {
    solution,
    secret,
    sitekey,
  }
  const m = body
  delete m.solution
  bot.sendMessage(chat_id, `*☭☭☭ A new comrade has arrived ☭☭☭* \n\n${objToString(body)}`, { parse_mode: 'Markdown'});
  res.status(200).json({ success: true })
  // axios.post('https://api.friendlycaptcha.com/api/v1/siteverify',b, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  // })
  // // .then((r) => r.json())
  // .then((json) => {
  //   console.log(json)
  //   if (json.data && json.data.success){
  //     // bot.sendMessage(chat_id, '*☭☭☭ A new comrade has arrived ☭☭☭*', { parse_mode: 'MarkdownV2'})
  //     const m = body
  //     delete m.solution
  //     bot.sendMessage(chat_id, `*☭☭☭ A new comrade has arrived ☭☭☭* \n\n${objToString(body)}`, { parse_mode: 'Markdown'});
  //     res.status(200).json({ success: true })
  //   }
  //   res.status(400).json({ message: 'No captcha provided' })
  // })
  // .catch((e) => console.log(e))
})

app.listen(port || 3001);