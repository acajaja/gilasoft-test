import users from './db/users.js';
import logger from './db/logger.js';

const notify = async (category, message) => {
    const subscribed = await users.findByCategory(category);
    logger.read();

    subscribed.forEach(user => {
        user.channels.forEach(async (channel) => {
            logger.push(category, channel, user, message);
        });
    });

    logger.write();
}

export default notify;
