# tgbot_reply_text_template

Guide for create tg bot on cf worker

- Run `wrangler init .` on project directory;
- Modify `TG_BOT_WEBHOOK_PATH` in wrangler.toml;
- Copy and modify core code from src/index.ts;
- Run `npm test` to test worker;
- Run `npm run deploy` to publish worker;
- Set webhook via https://telegram-set-webhook.tools.dor.ky/;
