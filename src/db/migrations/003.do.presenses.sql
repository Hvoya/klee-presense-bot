DROP TYPE IF EXISTS presense_status;
CREATE TYPE presense_status AS ENUM ('will-come', 'will-not-come', 'unknown');

CREATE TABLE IF NOT EXISTS presenses (
    status presense_status,
    date TIMESTAMP WITH TIME ZONE,
    user_id VARCHAR(255),
    PRIMARY KEY (user_id, date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
