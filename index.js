const Discord = require('discord.js')
const client = new Discord.Client()

const TOKEN = ''
const PREFIX = '!'
const TRADECHANNEL = ''
const emeraldID = ''
const diamondID = ''
client.once('ready', () => {
    console.log("bot is on")
    client.user.setActivity({type: "COMPETING", name: "with prices | !selling !buying"})
})

client.on('message', async msg => {
    console.log(msg.content)
    const args = msg.content.split(' ')
    if(!msg.content.startsWith(PREFIX)) return
    const command = args[0]
    console.log(command)
    if(command === '!buying') {
        console.log(msg.content)
        const trades = await client.channels.cache.get(TRADECHANNEL)
        let argz = args
        console.log(argz)
        argz.shift()
        const price = argz.pop()
        if(isNaN(price)) return msg.channel.send('You must provide a price, provide ? if you')
        const item = argz.join(' ')
        console.log(item)
        let itemFrameEmote;
        let currencyEmote;
        const currencyQuery = await msg.channel.send(new Discord.MessageEmbed().setDescription("Please Select Which Currency!"))
        currencyQuery.react(emeraldID)
        currencyQuery.react(diamondID)
        const filter = (reaction, user) => [emeraldID, diamondID].includes(reaction.emoji.id) && user.id === msg.author.id;
        await currencyQuery.awaitReactions(filter, {
            max: 1,
            time: 30000
        }).then(collected => {
            currency = collected.first()
            console.log(currency)
            if(!currency) return msg.channel.send(':x: Request aborted due to no response!').then(abordMsg => {
                setTimeout(function(){
                    abordMsg.delete()
                }, 5000)
            })
            if(currency.emoji.id === emeraldID) currencyEmote = `<:emerald:${emeraldID}>`
            else if(currency.emoji.id === diamondID) currencyEmote = `<:diamond:${diamondID}>`
        })
        if(!currencyEmote) return
        if(!trades) return console.log("TRADE CHANNEL IS INVALID"), msg.channel.send(':x: there was an error!')
        const tradeEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`BUYING: ${msg.member.user.tag}`, client.user.displayAvatarURL())
        .setDescription(`Item(s): ${item}\nPrice: ${currencyEmote}${price}`)
        const tm = await trades.send(tradeEmbed)
        const tradeURL = `https://discord.com/channels/${trades.id}`
        const tmConfirmationMsg = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Your trade has been successfuly sent to <#${trades.id}>!`)
        currencyQuery.edit(tmConfirmationMsg)
    }
    if(command === '!selling') {
        console.log(msg.content)
        const trades = await client.channels.cache.get(TRADECHANNEL)
        let argz = args
        console.log(argz)
        argz.shift()
        const price = argz.pop()
        if(isNaN(price)) return msg.channel.send('You must provide a price!')
        const item = argz.join(' ')
        console.log(item)
        let itemFrameEmote;
        let currencyEmote;
        const currencyQuery = await msg.channel.send(new Discord.MessageEmbed().setDescription("Please Select Which Currency Your Item Is Selling For!!"))
        currencyQuery.react(emeraldID)
        currencyQuery.react(diamondID)
        const filter = (reaction, user) => [emeraldID, diamondID].includes(reaction.emoji.id) && user.id === msg.author.id;
        await currencyQuery.awaitReactions(filter, {
            max: 1,
            time: 30000
        }).then(collected => {
            currency = collected.first()
            console.log(currency)
            if(!currency) return msg.channel.send(':x: Request aborted due to no response!').then(abordMsg => {
                setTimeout(function(){
                    abordMsg.delete()
                }, 5000)
            })
            if(currency.emoji.id === emeraldID) currencyEmote = `<:emerald:${emeraldID}>`
            else if(currency.emoji.id === diamondID) currencyEmote = `<:diamond:${diamondID}>`
        })
        if(!currencyEmote) return
        if(!trades) return console.log("TRADE CHANNEL IS INVALID!"), msg.channel.send(':x: there was an error!')
        const tradeEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`SELLING: ${msg.member.user.tag}`, client.user.displayAvatarURL())
        .setDescription(`Item(s): ${item}\nPrice: ${currencyEmote}${price}`)
        const tm = await trades.send(tradeEmbed)
        const tradeURL = `https://discord.com/channels/${trades.id}`
        const tmConfirmationMsg = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Your trade has been successfuly sent to <#${trades.id}>!`)
        currencyQuery.edit(tmConfirmationMsg)
    }
})

client.login(TOKEN)
