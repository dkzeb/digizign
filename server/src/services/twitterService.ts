/*
    Service to get tweets with a given hashtag - will run once every 15 minutes and store data in a simple datastore
*/
import Codebird from '../../lib/codebird';
import { db } from '../app';

import * as appconfig from '../appconfig.json';
const config: any = appconfig;

const cb = new Codebird();

cb.setConsumerKey(config.apikeys.twitter.key, config.apikeys.twitter.secret);
cb.setToken(config.apikeys.twitter.token, config.apikeys.twitter.tokenSecret);

export const twitterService = async () => {
    try {
        console.log('search terms', appconfig.tags.twitter.toString());
        const tweets = await cb.__call('search_tweets',
                {q: appconfig.tags.twitter[0].toString(), count: 100, tweet_mode: 'extended'}, null);
        // console.log(tweets);
        if (tweets.reply.errors) {
            console.error(tweets.reply.errors);
        } else {
            console.log('Saving tweets to LowDB');
            const tweetsDB = db.get('tweets').value();
            tweets.reply.statuses.forEach((s: any) => {
                // check om tweet findes i db
                const checkTweet = tweetsDB.find((e: any) => {
                    // console.log('checking', e.id, '===', s.id, e.id === s.id);
                    return e.id === s.id;
                });

                // if checkTweet is undefind, the tweet does not exist in our DB, so we should add it.
                if (typeof checkTweet === 'undefined') {
                    // only save the information that we need
                    const newTweet = {
                        id: s.id,
                        full_text: s.full_text,
                        favorite_count: s.favorite_count,
                        retweet_count: s.retweet_count,
                        user: {
                            id: s.user.id,
                            id_str: s.user.id_str,
                            name: s.user.name,
                            screen_name: s.user.screen_name,
                            profile_image_url: s.user.profile_image_url,
                            profile_image_url_https: s.user.profile_image_url_https,
                        },
                    };
                    db.get('tweets').push(newTweet).write();
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};
