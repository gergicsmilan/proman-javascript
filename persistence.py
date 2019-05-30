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