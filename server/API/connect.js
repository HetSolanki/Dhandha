import mongoose from 'mongoose';

export const connect = (url) => {
    return mongoose.connect(url);
}