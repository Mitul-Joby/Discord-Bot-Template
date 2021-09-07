# Configuration Files
Create configuration files config.json or create environment variables.

## config.json
JSON file containing:
- DEVELOPERS 
  - IDS
  - NAMES
- TOKEN
- PREFIX
- MONGODBURL
- APIKEYS
  - API-1-NAME ...

Required or use necessary env variables.
To be created based on format of [example_config.json](./example_config.json).

## Environment Variables
If using hosting services like heroku, etc and rather than using the config.json file, environmental variables can be created.

List of environment variables to be created:
- DEVIDS   (Listed out seperated by ,)
- DEVNAMES (Listed out seperated by ,)
- TOKEN
- PREFIX
- MONGODBURL
- API-NAME ...

## embeds.json 
[JSON file](./embeds.json) containing embeds' default colour, various embed's custom colour and thumbnails' links details.

Required and can be left as is or personalised to user preferences.
