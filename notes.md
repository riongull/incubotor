# Create a Discord Bot

### Preparations

1. Download discord, if not already (<https://discordapp.com/)>
2. Create a discord server that you admin, if not already (+ icon in left menu)
3. Open terminal and/or code editor
4. `mkdir my-bot && cd my-bot`
5. `npm init`
6. `npm install --save discord.js`

### Setup a Discord application

1. Go to <http://discordapp.com/developers/applications>
2. Sign in, if not already
3. Click "New Application", give it a name, and click "Create"
4. Give your app an icon and description (and a new name if you want)

### Add and configure a new bot

1. Click "Bot", then "Add Bot", then "Yes, do it!"
2. Give your bot an icon
3. Optionally give the bot a new (user)name, click "Save Changes"
4. Copy your bot's authorization TOKEN
5. `echo "{\"token\": \"TOKEN\"}" >> auth.json` pasting TOKEN from above

### Invite the new bot to your server

1. Click "OAuth2", check "bot" under SCOPES
2. Check your desired custom BOT PERMISSIONS (e.g. Administrator)
3. "Copy" the OAuth link (<https://discordapp.com/api/oauth2/...)>
4. Paste the copied link into a browser and hit enter
5. Fill out form and click "Authorize"
6. Verify that the bot was added in your server (still offline)

### Setup basic bot script

1. Open code editor and terminal
2. `touch bot.js` and populate with the following:

``` javascript
const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

bot.login(auth.token);
```

### Test bot

1. Save `bot.js`, then `node bot.js`
2. Go to Discord and see if your bot is now online
3. type "ping" (excluding quotes) in a channel.  Bot should reply.

### Reference

* <https://github.com/neo3587/discord_cryptobot>
* <https://github.com/robaleman/discord-cryptocurrency-bot>
* <https://github.com/MSFTserver/TipBot>
* <https://github.com/Trophonix/Crypton>
* <https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b>
* <https://github.com/MindhiveCode/dash-nexus-bot/>
* <https://github.com/ansonfoong/discordjs-youtube-tutorials>
* <https://www.youtube.com/user/DatAdam93/videos>
* <https://discordapp.com/developers/docs/intro>
* <https://discord.js.org/#/docs/main/stable/general/welcome>
* <https://discord.js.org/#/docs/commando/master/general/welcome>
* <https://discordjs.guide/>
* <https://anidiots.guide/>
