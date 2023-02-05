CREATE TABLE IF NOT EXISTS wishes (
    id SERIAL,
    message VARCHAR(511),
    user_id VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);