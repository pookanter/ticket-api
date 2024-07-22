CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(255),
  password VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS boards (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(100),
  sort_order INT UNSIGNED NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS statuses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  board_id INT UNSIGNED NOT NULL,
  title VARCHAR(50),
  sort_order INT UNSIGNED NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (board_id) REFERENCES boards(id)
);

CREATE TABLE IF NOT EXISTS tickets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status_id INT UNSIGNED NOT NULL,
  title VARCHAR(100),
  description TEXT,
  contact VARCHAR(100),
  sort_order INT UNSIGNED NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (status_id) REFERENCES statuses(id)
);