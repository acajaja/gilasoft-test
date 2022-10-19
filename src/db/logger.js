import { join, dirname } from 'path';
import { LowSync, JSONFileSync } from 'lowdb';
import { fileURLToPath } from 'url';
import NotificationTypes from '../notification-types.js';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logDb     = join(__dirname, '../../log.json');
console.info(logDb);
const adapter   = new JSONFileSync(logDb);
const low       = new LowSync(adapter);

const logger    = {
    getLogs: () => {
        logger.read();
        return low.data.log;
    },
    read: () => {
        low.read();
        low.data ||= { "log": [] };
    },
    push: (category, channel, user, message) => {
        const type = NotificationTypes.find(type => type.id === channel);

        if (!type) {
            console.error(`Failed to match type: ${type}`);
            return;
        }

        low.data.log.unshift({
            time: moment().utc().format(),
            notificationType: type.name,
            messageCategory: category,
            user,
            message
        });
    },
    write: () => low.write()
}

export default logger;
