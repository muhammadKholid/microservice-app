import errorHandler from './error.controller.js';
import checkIsLoggedIn from '../middleware/checkIsLoggedIn.js';
import { client } from '../elasticSearch/server.client.js';

const getMe = async (_, args, { req, getAuthUser }) => {
    try {
        await checkIsLoggedIn(req, getAuthUser);

        const user = await getAuthUser(req);

        return {
            status: 'success',
            user,
        };
    } catch (error) {
        errorHandler(error);
    }
};

const doSearch = async (_, { input: { keyword } }, { req, getAuthUser }) => {
    try {
        await checkIsLoggedIn(req, getAuthUser);


        if (!keyword) {
            return res.status(400).send('Search query is missing');
        }

        const result = await client.search({
            index: 'products',
            body: {
                query: {
                    multi_match: {
                        query: keyword,
                        fields: ['id^3', 'name^2', 'description']
                    }
                }
            }
        })
        // const hasil = result.hits.hits.map((data) => {
        //     return data._source
        // })
        // console.log(hasil)

        return {
            status: 'success',
            products: result.hits.hits.map((data) => {
                return data._source
            }),
        };
    } catch (error) {
        errorHandler(error);
    }
};

export default {
    getMe,
    doSearch,
};