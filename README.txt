To get this working, you will need to;

1. Edit the variables in each of the scripts
2. Install node.js if you don't have it
3. You may need to also install `npm install puppeteer`
4. Add each script to cron jobs `0 12 * * * /usr/local/bin/node /path/to/a/script` (basically what I mean by this, is you may need to list the absolute path to both node as well as the script, it gave me issues when I didn't)

Here's an example of my crontab;
                                                                                            
0 4 * * * /usr/local/bin/node /root/SCRIPTS/start_quests.js
0 12 * * * /usr/local/bin/node /root/SCRIPTS/stop_quests.js

This will trigger force start quests at 4 am, and force stop at 12 pm.