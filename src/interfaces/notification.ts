enum ChannelTypes {
    sms = 1,
    email = 2,
    push = 3
}

interface notification {
    channel: ChannelTypes,
    message: string
}
