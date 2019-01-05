
\c pgsql
DROP DATABASE phalcon;
CREATE DATABASE phalcon;

\c phalcon

CREATE SEQUENCE users_id_seq;
CREATE SEQUENCE drivers_id_seq;

CREATE SEQUENCE vehicles_id_seq;
CREATE SEQUENCE connections_id_seq;

CREATE TABLE users (
    id integer NOT NULL DEFAULT nextval('users_id_seq') PRIMARY KEY,
    name text NOT NULL,
    gecos text NOT NULL,
    password text NOT NULL,
    superuser boolean
);

CREATE TABLE drivers (
    id integer NOT NULL DEFAULT nextval('drivers_id_seq') PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE vehicles (
    id integer NOT NULL DEFAULT nextval('vehicles_id_seq') PRIMARY KEY,
    name text
);

CREATE TABLE connections (
    id integer NOT NULL DEFAULT nextval('connections_id_seq') PRIMARY KEY,
    driver_id integer NOT NULL,
    vehicle_id integer NOT NULL
);

SELECT setval('users_id_seq', 1);
SELECT setval('drivers_id_seq', 1);
SELECT setval('vehicles_id_seq', 1);
SELECT setval('ceonnections_id_seq', 1);



ALTER SEQUENCE users_id_seq OWNED BY users.id;
ALTER SEQUENCE drivers_id_seq OWNED BY drivers.id;
ALTER SEQUENCE vehicles_id_seq OWNED BY vehicles.id;
ALTER SEQUENCE connections_id_seq OWNED BY connections.id;


INSERT INTO connections (id, driver_id, vehicle_id) VALUES (1, 1, 1);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (2, 1, 2);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (3, 4, 2);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (4, 4, 4);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (5, 1, 3);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (6, 5, 1);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (7, 6, 8);
INSERT INTO connections (id, driver_id, vehicle_id) VALUES (8, 8, 1);

INSERT INTO drivers (id, name) VALUES (1, 'Skye Krajcik');
INSERT INTO drivers (id, name) VALUES (2, 'Bennie Kerluke');
INSERT INTO drivers (id, name) VALUES (3, 'Virginia Koelpin');
INSERT INTO drivers (id, name) VALUES (4, 'Malachi Howe');
INSERT INTO drivers (id, name) VALUES (5, 'Friedrich Ankunding I');
INSERT INTO drivers (id, name) VALUES (6, 'Hellen Rowe');
INSERT INTO drivers (id, name) VALUES (7, 'Alexandre Erdman');
INSERT INTO drivers (id, name) VALUES (8, 'Ryleigh Osinski');
INSERT INTO drivers (id, name) VALUES (9, 'Savanna Goodwin');
INSERT INTO drivers (id, name) VALUES (10, 'Rosetta Sipes');
INSERT INTO drivers (id, name) VALUES (11, 'Michel Monahan');
INSERT INTO drivers (id, name) VALUES (12, 'Nikki Klocko');
INSERT INTO drivers (id, name) VALUES (13, 'Angus Ruecker');
INSERT INTO drivers (id, name) VALUES (14, 'Bennett Pacocha');
INSERT INTO drivers (id, name) VALUES (15, 'Winston Predovic');
INSERT INTO drivers (id, name) VALUES (16, 'Leonora Graham I');
INSERT INTO drivers (id, name) VALUES (17, 'Miss Jaleel Cormier');
INSERT INTO drivers (id, name) VALUES (18, 'Henderson Boehm');
INSERT INTO drivers (id, name) VALUES (19, 'Romaine Cronin');
INSERT INTO drivers (id, name) VALUES (20, 'Camila Murazik DVM');

INSERT INTO users (id, name, gecos, password, superuser) VALUES (1, 'qwerty', 'Super Mario', '12345', true);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (2, 'nklokko', 'Nikki Klocko', '12345', true);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (3, 'rosetta', 'Rosetta Sipes', '12345', false);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (4, 'user2', 'Lorem Captum', '12345', false);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (5, 'skyekr', 'Skye Krajcik', '12345', false);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (6, 'kirluke', 'Bennie Kerluke', '12345', false);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (7, 'koeplin', 'Virginia Koelpin', '12345', false);
INSERT INTO users (id, name, gecos, password, superuser) VALUES (8, 'mhowe', 'Malachi Howe', '12345', false);


INSERT INTO vehicles (id, name) VALUES (1, 'FDF9BC');
INSERT INTO vehicles (id, name) VALUES (2, 'D2F321');
INSERT INTO vehicles (id, name) VALUES (3, '7061B4');
INSERT INTO vehicles (id, name) VALUES (4, '50F485');
INSERT INTO vehicles (id, name) VALUES (5, 'E83B8A');
INSERT INTO vehicles (id, name) VALUES (6, 'F10AFD');
INSERT INTO vehicles (id, name) VALUES (7, 'C6FDBF');
INSERT INTO vehicles (id, name) VALUES (8, '9A7A62');
INSERT INTO vehicles (id, name) VALUES (9, 'C754F7');
INSERT INTO vehicles (id, name) VALUES (10, '4FADE5');
INSERT INTO vehicles (id, name) VALUES (11, '9F2BDD');
INSERT INTO vehicles (id, name) VALUES (12, '0CA677');
INSERT INTO vehicles (id, name) VALUES (13, '7D9A88');
INSERT INTO vehicles (id, name) VALUES (14, '649439');
INSERT INTO vehicles (id, name) VALUES (15, '0D3415');
INSERT INTO vehicles (id, name) VALUES (16, '026E8E');
INSERT INTO vehicles (id, name) VALUES (17, '81AD45');
INSERT INTO vehicles (id, name) VALUES (18, 'FE33AB');
INSERT INTO vehicles (id, name) VALUES (19, '1E0BE5');
INSERT INTO vehicles (id, name) VALUES (20, 'DB5B35');
INSERT INTO vehicles (id, name) VALUES (21, 'CD4851');
INSERT INTO vehicles (id, name) VALUES (22, '86D0EE');
INSERT INTO vehicles (id, name) VALUES (23, '695BF9');
INSERT INTO vehicles (id, name) VALUES (24, '643FA5');
INSERT INTO vehicles (id, name) VALUES (25, '7DA48F');
INSERT INTO vehicles (id, name) VALUES (26, 'B1F6C9');
INSERT INTO vehicles (id, name) VALUES (27, '498827');
INSERT INTO vehicles (id, name) VALUES (28, 'D51DDA');
INSERT INTO vehicles (id, name) VALUES (29, '8AD9FA');
INSERT INTO vehicles (id, name) VALUES (30, '5722B1');
INSERT INTO vehicles (id, name) VALUES (31, '7F09BD');
INSERT INTO vehicles (id, name) VALUES (32, '3D5BDC');
INSERT INTO vehicles (id, name) VALUES (33, '142A7E');
INSERT INTO vehicles (id, name) VALUES (34, 'ADF0A0');
INSERT INTO vehicles (id, name) VALUES (35, '2E30C2');
INSERT INTO vehicles (id, name) VALUES (36, '03530D');
INSERT INTO vehicles (id, name) VALUES (37, '922D28');
INSERT INTO vehicles (id, name) VALUES (38, '23C3BD');
INSERT INTO vehicles (id, name) VALUES (39, 'CC8817');
