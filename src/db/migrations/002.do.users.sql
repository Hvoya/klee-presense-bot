CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) UNIQUE,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    space_id SMALLINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (space_id) REFERENCES spaces(id)
);