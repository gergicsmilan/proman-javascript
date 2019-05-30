import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards()


def get_cards_for_board(board_id):
    return persistence.get_cards_for_board(board_id)


def get_cards():
    return persistence.get_cards()


def add_board(board_title):
    return persistence.add_new_board(board_title)


def add_card(card_title, board_id, status_id):
    return persistence.add_new_card(card_title, board_id, status_id)