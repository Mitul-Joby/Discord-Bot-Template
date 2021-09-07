# DISCORD BOT TEMPLATE 

A template I made used to make a bunch of discord bots.
Uses MongoDB for custom prefixes for servers/guilds.

# ABOUT
Bot can have server/guild only commands, permissions, cooldown, command aliases, etc.

Already included hello help invite ping customprefix resetprefix console commands. 

Commands can be created by adding to pre-existing categories(general,testing...) or creating a new category(folder with !about.json).
Follow [example](./src/commands/template/example.js).

## DEPENDENCIES
- `discord.js`
- `mongoose`

# FILE STRUCTURE 

```
+config
|   -embeds.json
|   -example_config.json
|   -README.MD
+images
|   -README.MD
+src
|   +commands
|   |   +configuration
|   |   |   -!about.json
|   |   |   -customprefix.js
|   |   |   -resetprefix.js
|   |   +general
|   |   |   -!about.json
|   |   |   -hello.js
|   |   |   -help.js
|   |   |   -invite.js
|   |   |   -ping.js
|   |   +template
|   |   |   -!about.json
|   |   |   -example.js
|   |   |   -README.MD
|   |   +testing
|   |       -!about.json
|   |       -console.js
|   |       -README.MD
|   +models
|       -guildPrefixes.js
|   -index.js
-.gitignore
-LICENCE
-package.json
-README.MD
```

# USAGE

- Install Node.JS
- Update package.json as required and `npm install`
- Create a config.json with reference to [example_config.json](./config/example_config.json).
  - Create a Discord Developer account at https://discord.com/developers and create an application with a bot for token.
  - Create a MongoDB account and obtain connect URL.
  - Obtain all required API keys
  
 
