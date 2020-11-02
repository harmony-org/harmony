import { Channel } from '../../structures/channel.ts'
import { Message } from '../../structures/message.ts'
import { MessageMentions } from '../../structures/MessageMentions.ts'
import { TextChannel } from '../../structures/textChannel.ts'
import { User } from '../../structures/user.ts'
import { MessagePayload } from '../../types/channel.ts'
import { Gateway, GatewayEventHandler } from '../index.ts'

export const messageCreate: GatewayEventHandler = async (
  gateway: Gateway,
  d: MessagePayload
) => {
  let channel = await gateway.client.channels.get<TextChannel>(d.channel_id)
  // Fetch the channel if not cached
  if (channel === undefined)
    channel = (await gateway.client.channels.fetch(d.channel_id)) as TextChannel
  const user = new User(gateway.client, d.author)
  await gateway.client.users.set(d.author.id, d.author)
  let guild
  if(d.guild_id) {
    guild = await gateway.client.guilds.get(d.guild_id)
  }
  let mentions = new MessageMentions()
  let message = new Message(gateway.client, d, channel, user, mentions)
  if(guild) message.guild = guild
  gateway.client.emit('messageCreate', message)
}
