create table users(
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL
    PRIMARY KEY ( user_id )
 );