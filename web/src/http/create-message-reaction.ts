interface createMessageReactionRequest {
	roomId: string;
	messageId: string;
}

export async function createMessageReaction({
	messageId,
	roomId,
}: createMessageReactionRequest) {
	await fetch(
		`${
			import.meta.env.VITE_APP_API_URL
		}/rooms/${roomId}/messages/${messageId}/react`,
		{
			method: "PATCH",
		}
	);
}
