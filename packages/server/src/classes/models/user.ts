import { compare, genSalt, hash } from 'bcryptjs';
import { Document, model, ObjectId, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import jwt from 'jsonwebtoken';
import { getVariable } from '../../utils/environement';

interface PublicUser {
    email: string;
    isAdmin: boolean;
    favoriteList: object[];
}

interface IUser extends PublicUser, Document {
    password: string;
    favoriteList: ObjectId[];
    comparePassword: (password: string) => Promise<boolean>,
    generateToken: () => Promise<string>,
    publicJSON: () => Promise<PublicUser>,
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'invalid email'],
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    favoriteList: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
        default: [],
    }],
});

UserSchema.methods.comparePassword = async function (password: string) {
    return await compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, getVariable('JWT_SECRET'), { expiresIn: '30 days' });
};

UserSchema.methods.publicJSON = async function(): Promise<PublicUser> {
    const card = await this.populate('favoriteList');
    return {
        email: this.email,
        isAdmin: this.isAdmin,
        favoriteList: card.favoriteList,
    };
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
        next();
    } catch (e) {
        next(e as Error);
    }
});

const User = model<IUser>('User', UserSchema);

export { IUser, UserSchema, User };