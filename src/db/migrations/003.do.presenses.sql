CREATE TABLE IF NOT EXISTS presenses (
    status VARCHAR(255),
    date TIMESTAMP WITH TIME ZONE,
    user_id VARCHAR(255),
    PRIMARY KEY (user_id, date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
