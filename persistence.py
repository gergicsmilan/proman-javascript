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