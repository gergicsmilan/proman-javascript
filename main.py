from flask import Flask, render_template, url_for, request, json
from util import json_response, hash_password

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<board_id>")
@json_response
def get_cards_for_board(board_id):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/get-cards")
@json_response
def get_cards():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards()


@app.route("/post-new-board", methods=['POST', 'GET'])
@json_response
def post_new_board():
    response_data = json.loads(request.data)
    data_handler.add_board(response_data['title'])
    return response_data


@app.route('/post-new-card', methods=['POST', 'GET'])
@json_response
def post_new_card():
    response_data = json.loads(request.data)
    data_handler.add_card(response_data['title'], response_data['board_id'], response_data['status_id'])
    return response_data


@app.route('/delete-board', methods=['POST', 'GET'])
@json_response
def delete_board():
    response_data = json.loads(request.data)
    data_handler.delete_board(response_data['id'])
    return response_data


@app.route('/delete-card', methods=['POST', 'GET'])
@json_response
def delete_card():
    response_data = json.loads(request.data)
    data_handler.delete_card(response_data['id'])
    return response_data


@app.route('/change-status', methods=['POST', 'GET'])
@json_response
def change_status():
    response_data = json.loads(request.data)
    data_handler.change_status(response_data['id'], response_data['status_id'])


@app.route('/rename-board', methods=['POST', 'GET'])
@json_response
def rename_board():
    response_data = json.loads(request.data)
    data_handler.rename_board(response_data['id'], response_data['title'])

    return response_data


@app.route('/reg', methods=["POST"])
@json_response
def reg():
    reg_data = json.loads(request.data)
    hashed = hash_password(reg_data['password'])
    data_handler.addNewUser(reg_data['username'], hashed)
    return reg_data


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
