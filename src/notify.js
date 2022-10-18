import users from './db/users.js';
import logger from './db/logger.js';

const notify = async (category, message) => {
    const subscribed = await users.findByCategory(category);
    subscribed.forEach(user => {
        user.channels.forEach(async (channel) => {
            await logger.write(channel, user, message);
        });
    });
}

export default notify;
