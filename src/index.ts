
export interface Env {
	// secret
    readonly TG_BOT_TOKEN: string;

    // env
    readonly TG_BOT_WEBHOOK_PATH: string;
}

function postJson(url: string, obj: object) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'content-type': 'application/json',
        }
    });
}

async function sendMessage(botToken: string, chatId: number, text: string) {
    console.log(`sendMessage: ${chatId} ${text}`);

    await postJson(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text,
    });
}

async function handleTelegramUpdate(env: Env, update: any): Promise<Response> {
	// for update content, check: https://core.telegram.org/bots/api#update

	const text: string | undefined = update.message?.text;
	const chatId: number | undefined = update.message?.chat.id; // for reply to

	if (typeof text === 'string' && chatId) {
		const replyContent = "Hello World!";
		await sendMessage(env.TG_BOT_TOKEN, chatId, replyContent);
	}

	return new Response(); // telegram does not care this.
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		const url = new URL(request.url);

        if (request.method === 'POST' && url.pathname === `/${env.TG_BOT_WEBHOOK_PATH}`) {
			// request is sent by telegram

            if (request.headers.get('content-type') !== 'application/json') {
                console.error(`invalid content-type: ${request.headers.get('content-type')}`);
            }
            else {
				return await handleTelegramUpdate(env, await request.json());
            }
        }

		return new Response("Hello World!");
	},
};
