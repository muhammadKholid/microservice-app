import jwt from 'jsonwebtoken';
import errorHandler from '../controllers/error.controller.js';

export const signJwt = (payload, Key, options) => {
    const privateKey = Buffer.from(process.env[Key], 'base64').toString('ascii');
    return jwt.sign(payload, privateKey, {
        ...options,
        algorithm: 'RS256',
    });

    // return jwt.sign(payload, process.env[Key], {
    //     ...options,
    // });
};

export const verifyJwt = (token, Key) => {
    try {
        const publicKey = Buffer.from(process.env[Key], 'base64').toString('ascii');
        const decoded = jwt.verify(token, publicKey);
        return decoded;

        // const decoded = jwt.verify(token, process.env[Key]);
        // return decoded;
    } catch (error) {
        errorHandler(error);
    }
};

