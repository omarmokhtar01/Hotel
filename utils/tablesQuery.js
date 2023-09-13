const createTableQueries = [
    `CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user') NOT NULL
      )`,
        `CREATE TABLE bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id),
            room_id INT NOT NULL REFERENCES rooms(id),
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            num_of_guest INT NOT NULL,
            isPaid BOOLEAN DEFAULT FALSE
        )`,
        `CREATE TABLE hotels (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            amenities VARCHAR(255) NOT NULL
        )`,
        `CREATE TABLE rooms (
            id AUTO_INCREMENT PRIMARY KEY,
            hotelId INT NOT NULL REFERENCES hotels(id),
            round INT NOT NULL,
            amenities VARCHAR(255) NOT NULL,
            pricing FLOAT NOT NULL,
            availability BOOLEAN DEFAULT FALSE,
            MaxNumPerson INT NOT NULL,
            numRoom INT NOT NULL
          );
        `
  ];

  module.exports = createTableQueries