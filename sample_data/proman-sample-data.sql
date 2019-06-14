ALTER TABLE IF EXISTS ONLY public.board DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.status DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_idd CASCADE;

DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;
CREATE TABLE users(
    id serial NOT NULL,
    username text,
    password text
);


DROP TABLE IF EXISTS public.board;
DROP SEQUENCE IF EXISTS public.board_id_seq;
CREATE TABLE board(
    id serial NOT NULL,
    title text
);


DROP TABLE IF EXISTS public.card;
DROP SEQUENCE IF EXISTS public.card_id_seq;
CREATE TABLE card(
    id serial NOT NULL,
    board_id integer NOT NULL,
    title text,
    status_id integer NOT NULL,
    card_order integer
);


DROP TABLE IF EXISTS public.status;
DROP SEQUENCE IF EXISTS public.status_id_seq;
CREATE TABLE status(
    id serial NOT NULL ,
    title text
);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY board
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY card
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);

ALTER TABLE ONLY status
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);

ALTER TABLE ONLY card
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board(id);

ALTER TABLE ONLY card
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status(id);


INSERT INTO board VALUES (1, 'board 1');
INSERT INTO board VALUES (2, 'board 2');
SELECT pg_catalog.setval('board_id_seq', 3, true);

INSERT INTO status VALUES (0, 'new');
INSERT INTO status VALUES (1, 'in progress');
INSERT INTO status VALUES (2, 'testing');
INSERT INTO status VALUES (3, 'done');
SELECT pg_catalog.setval('status_id_seq', 4, true);

INSERT INTO card VALUES (1, 1, 'new card1', 0, 0);
INSERT INTO card VALUES (2, 1, 'new card2', 0, 1);
INSERT INTO card VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO card VALUES (4, 1, 'planning', 2, 0);
INSERT INTO card VALUES (5, 1, 'done card', 3, 0);
INSERT INTO card VALUES (6, 1, 'done card', 3, 1);
INSERT INTO card VALUES (7, 2, 'new card1', 0, 0);
INSERT INTO card VALUES (8, 2, 'new card2', 0, 1);
INSERT INTO card VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO card VALUES (10, 2, 'planning', 2, 0);
INSERT INTO card VALUES (11, 2, 'done card', 3, 0);
INSERT INTO card VALUES (12, 2, 'done card', 3, 1);
SELECT pg_catalog.setval('card_id_seq', 13, true);

INSERT INTO users VALUES (0, 'admin', '$2b$12$3.zHaCLsED7YFXBXIOhB2eHLVGBBfXUlQXurKynGhINca6FObgrwi');
SELECT pg_catalog.setval('users_id_seq', 1, true);


