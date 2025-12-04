import dotenv from 'dotenv';
import ms from 'ms';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV as string,
    port: process.env.PORT as string,
    database_url: process.env.DATABASE_URL as string,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
    node_mailer: {
        email: process.env.NODE_MAILER_EMAIL as string,
        password: process.env.NODE_MAILER_PASSWORD as string,
    },
    next_auth_secret: process.env.AUTH_SECRET as string,
    jwt: {
        reset_pass_secret: process.env.RESET_PASS_TOKEN as string,
        reset_pass_token_expires_in: process.env
            .RESET_PASS_TOKEN_EXPIRES_IN as ms.StringValue,
    },
    admin_email: process.env.ADMIN_EMAIL as string,
    admin_password: process.env.ADMIN_PASSWORD as string,
    client_url: process.env.CLIENT_URL as string,
    ssl: {
        storeId: process.env.STORE_ID,
        storePass: process.env.STORE_PASS,
    },
};
