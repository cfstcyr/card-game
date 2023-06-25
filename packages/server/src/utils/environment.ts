import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production', 'staging'],
        default: 'development',
    }),
    PORT: num({ default: 3000 }),

    // DB_HOST: str(),
    // DB_PORT: num(),
    // DB_USER: str(),
    // DB_PASSWORD: str(),
    // DB_DATABASE: str(),

    JWT_SECRET: str({ default: 'abc' }),

    CORS: str({ default: '*' }),
    LOG_DIR: str({ default: './logs' }),
});

export { env };
