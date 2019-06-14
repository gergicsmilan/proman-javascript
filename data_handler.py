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


def delete_board(id):
    return persistence.delete_board(id)


def delete_card(id):
    return persistence.delete_card(id)


def change_status( id, status_id):
    return persistence.change_status( id, status_id)

def rename_board(board_id, title):
    return persistence.rename_board(board_id, title)


def addNewUser(username, password):
    return persistence.addNewUser(username, password)

