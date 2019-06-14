import connection


@connection.connection_handler
def get_statuses(cursor):
    cursor.execute("""
                SELECT id, title FROM status;
                """)

    statuses = cursor.fetchall()
    return statuses


@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT id, title FROM board;
                    """)

    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_cards(cursor):
    cursor.execute("""
                    SELECT id, board_id, title, status_id, card_order FROM card;
                    """)

    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""SELECT id, board_id, title, status_id, card_order FROM card
                        WHERE board_id = %(board_id)s;
                        """,
                   {'board_id': board_id})

    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_cards(cursor):
    cursor.execute("""SELECT id, board_id, title, status_id, card_order FROM card;
                        """)

    cards = cursor.fetchall()
    print(cards)
    return cards


@connection.connection_handler
def add_new_board(cursor, board_title):
    cursor.execute("""INSERT INTO board (title) VALUES (%(board_title)s);
                    """,
                   {'board_title': board_title})


@connection.connection_handler
def add_new_card(cursor, card_title, board_id, status_id):
    cursor.execute("""
                    INSERT INTO card (title, board_id, status_id) VALUES (%(card_title)s, %(board_id)s, %(status_id)s);
                    """,
                   {'card_title': card_title,
                    'board_id': board_id,
                    'status_id': status_id})


@connection.connection_handler
def delete_board(cursor, board_id):
    cursor.execute("""
                   DELETE FROM card
                   WHERE board_id = %(board_id)s;
                   
                   DELETE FROM board
                   WHERE id = %(board_id)s;
                   """,
                   {'board_id': board_id})


@connection.connection_handler
def delete_card(cursor, id):
    cursor.execute("""
                   DELETE FROM card
                   WHERE id = %(id)s;
                   """,
                   {'id': id})


@connection.connection_handler
def change_status(cursor, id, status_id):
    cursor.execute("""
                    UPDATE card
                    SET status_id = %(status_id)s
                    WHERE id = %(id)s;
    """, {'id': id, 'status_id': status_id})


@connection.connection_handler
def rename_board(cursor, board_id, title):
    cursor.execute("""
                    UPDATE board
                    SET title = %(title)s
                    WHERE id = %(board_id)s;
                    """,
                    {'board_id': board_id,
                    'title': title})


@connection.connection_handler
def addNewUser(cursor, username, password):
    cursor.execute("""
    INSERT INTO users (username, password) VALUES(%(username)s, %(password)s);
    """,
    {'username': username, 'password': password})
