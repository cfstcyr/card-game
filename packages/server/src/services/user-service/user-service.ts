import { singleton } from 'tsyringe';
import { User, UserPublic, UserSession } from '../../models/user';
import { compare, genSalt, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../utils/environment';
import { DatabaseService } from '../database-service/database-service';
import { HttpException } from '../../models/http-exception';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

@singleton()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    configure() {
        this.configureStrategies();
        this.configureSerialization();
    }

    private configureStrategies() {
        passport.use(
            'signup',
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (email, password, done) => {
                    try {
                        const userSession = await this.signup({
                            email,
                            password,
                        });
                        return done(null, userSession);
                    } catch (e) {
                        done(e);
                    }
                },
            ),
        );

        passport.use(
            'login',
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (email, password, done) => {
                    try {
                        const userSession = await this.login({
                            email,
                            password,
                        });
                        done(null, userSession);
                    } catch (e) {
                        done(e);
                    }
                },
            ),
        );

        passport.use(
            new JWTStrategy(
                {
                    secretOrKey: env.JWT_SECRET,
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                },
                async (token, done) => {
                    try {
                        const user = await this.getUser(token.id);
                        done(null, this.toPublicUser(user));
                    } catch (e) {
                        done(e);
                    }
                },
            ),
        );
    }

    private configureSerialization() {
        passport.serializeUser((user, done) => {
            done(null, (user as UserPublic).id);
        });
        passport.deserializeUser(async (id, done) => {
            try {
                const user = await this.getUser(Number(id));
                done(null, this.toPublicUser(user));
            } catch (e) {
                done(e);
            }
        });
    }

    private get db() {
        return this.databaseService.client<User>('User');
    }

    private async signup({
        email,
        password,
    }: Omit<User, 'id' | 'isAdmin'>): Promise<UserSession> {
        const max = await this.db.max('id', { as: 'max' });
        const id = max.length > 0 ? max[0].max + 1 : 0;

        const salt = await genSalt();
        const passwordHash = await hash(password, salt);

        await this.db.insert({
            email,
            password: passwordHash,
            isAdmin: false,
            id,
        });

        const user = await this.getUserByEmail(email);
        const token = this.generateToken(user);

        return {
            ...this.toPublicUser(user),
            token,
        };
    }

    private async login({
        email,
        password,
    }: Omit<User, 'id' | 'isAdmin'>): Promise<UserSession> {
        const user = await this.getUserByEmail(email);

        if (!(await this.comparePassword(user, password)))
            throw new HttpException(
                `Invalid email or password.`,
                StatusCodes.NOT_ACCEPTABLE,
            );

        const token = this.generateToken(user);

        return {
            ...this.toPublicUser(user),
            token,
        };
    }

    private toPublicUser(user: User): UserPublic {
        return {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
    }

    private async getUser(id: number | string): Promise<User> {
        const user = await this.db
            .select('*')
            .where({ id: Number(id) })
            .first();

        if (!user)
            throw new HttpException(
                `Cannot find user with ID "${id}"`,
                StatusCodes.NOT_FOUND,
            );

        return user;
    }

    private async getUserByEmail(email: string): Promise<User> {
        const user = await this.db.select('*').where({ email }).first();

        if (!user)
            throw new HttpException(
                `Cannot find user with email "${email}"`,
                StatusCodes.NOT_FOUND,
            );

        return user;
    }

    private async comparePassword(
        user: User,
        password: string,
    ): Promise<boolean> {
        return compare(password, user.password);
    }

    private generateToken(user: User): string {
        return jwt.sign({ id: user.id }, env.JWT_SECRET, {
            expiresIn: '30 days',
        });
    }
}
