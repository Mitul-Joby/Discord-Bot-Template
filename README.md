# DISCORD BOT TEMPLATE 

A template I made used to make a bunch of discord bots.

# ABOUT
Bot can have server/guild only commands, permissions, cooldown, command aliases, etc.

Already included hello help invite ping console commands. 

Commands can be created by adding to pre-existing categories(general,testing...) or creating a new category(folder with !about.json).
Follow [example](./src/commands/template/example.js).

## DEPENDENCIES
- `discord.js`

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
  
 
