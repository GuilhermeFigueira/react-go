import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebsockets } from "../hooks/use-messages-websockets";

export function Messages() {
	const { roomId } = useParams();
	if (!roomId)
		throw new Error(
			"O componente de mensagens deve ser usado na página rooms"
		);

	const { data } = useSuspenseQuery({
		//Se ta usando uma variavel na queryFn, usar na queryKey por causa do cache
		queryFn: () => getRoomMessages({ roomId }),

		queryKey: ["messages", roomId],
	});

	useMessagesWebsockets({ roomId });

	const sortedMessages = data.messages.sort((a, b) => {
		return b.amountOfReactions - a.amountOfReactions;
	});

	return (
		<ol className="list-decimal list-inside px-3 space-y-8">
			{sortedMessages.map((message) => {
				return (
					<Message
						text={message.text}
						amountOfReactions={message.amountOfReactions}
						answered={message.answered}
						key={message.id}
						id={message.id}
					/>
				);
			})}
		</ol>
	);
}
