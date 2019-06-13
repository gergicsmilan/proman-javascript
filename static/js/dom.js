// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        dataHandler.getBoards(boards => {
            dom.showBoards(boards);
        });
    },
    boardToggleClicked: function () {
        const board = this.closest('section.board').querySelector('.board-columns');
        board.classList.toggle('hidden');
    },
    showBoards: function (boards) {
        const boardContainer = document.querySelector('.board-container');
        boardContainer.textContent = '';
        for (const board of boards) {
            const template = document.querySelector('#board-template');
            const clone = document.importNode(template.content, true);
            clone.querySelectorAll('.board-column-content').forEach(column => column.dataset.boardId = board.id);
            clone.querySelector('.board-title').innerHTML = board.title;
            clone.querySelector('.board-add').setAttribute("id", board.id);
            clone.querySelector(".board-toggle").addEventListener('click', dom.boardToggleClicked);
            clone.querySelector('.board-delete').setAttribute("id", board.id);
            boardContainer.appendChild(clone);
            dom.loadCards(parseInt(board.id));
            dom.deleteBoard(parseInt(board.id));
        }
    },
    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(boardId, dom.showCards);
    },
    showCards: function (cards, boardId) {
        dom.addNewCard(boardId);
        let cardContainer = document.querySelectorAll('.board-column-content');

        for (let card of cards) {
            if (parseInt(boardId) === parseInt(card.board_id)) {
                for (let column of cardContainer) {
                    if (parseInt(card.status_id) === parseInt(column.id) && parseInt(card.board_id) === parseInt(column.dataset.boardId)) {
                        const template = document.querySelector('#cards-template');
                        const clone = document.importNode(template.content, true);
                        clone.querySelector('.card-title').textContent = card.title;
                        clone.querySelector('.card').id = card.id;
                        column.appendChild(clone);
                    }
                }
            }
        }
        dom.initDeleteCardButtons(cards, boardId);
    },
    addNewBoard: function () {
        let addBoardButton = document.querySelector("#add-new-board-btn");
        addBoardButton.addEventListener('click', function () {
            dataHandler.createNewBoard('board', dom.showNewBoard);
        })
    },
    showNewBoard: function (response) {
        let boardContainer = document.querySelector('.board-container');

        const template = document.querySelector('#board-template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.board-title').innerHTML = response.title;
        boardContainer.appendChild(clone);
    },
    addNewCard: function (boardId) {
        let addNewCardButtons = document.querySelectorAll(".board-add");
        for (let button of addNewCardButtons) {
            if (parseInt(button.id) === parseInt(boardId)) {
                button.addEventListener('click', function () {
                    dataHandler.createNewCard("New Card", boardId, 0, dom.showNewCard);
                });
            }
        }
    },
    showNewCard: function (response) {
        let columns = document.querySelectorAll('.board-column-content');

        for (let column of columns) {

            if (parseInt(response.board_id) === parseInt(column.dataset.boardId) &&
                parseInt(response.status_id) === parseInt(column.id)) {
                const template = document.querySelector('#cards-template');
                const clone = document.importNode(template.content, true);
                clone.querySelector('.card-title').textContent = response.title;
                column.appendChild(clone);
            }
        }
    },
    deleteBoard: function (boardId) {

        let deleteBoardButtons = document.querySelectorAll('.board-delete');
        for (let button of deleteBoardButtons) {
            if (parseInt(button.id) === parseInt(boardId)) {
                button.addEventListener('click', function () {
                    dataHandler.deleteBoard(boardId, dom.loadBoards)
                })
            }
        }
    },
    initDeleteCardButtons: function (cards, boardId) {
        let deleteCardButtons = document.querySelectorAll(`div[data-board-id="${boardId}"] .fa-trash-alt`);
        for (let button of deleteCardButtons) {
            button.addEventListener('click', function () {
                const card_id = this.parentElement.parentElement.id
                dataHandler.deleteCard(card_id, dom.loadBoards);
            })
        }
    },
    addDragula: function () {
        let columnList = document.querySelectorAll('.board-column-content');
        console.log(columnList);
        let columnListArray = Array.from(columnList);
        dragula(columnListArray).on('drop', dom.get_new_container);
    },
    get_new_container: function (e) {
        console.log(e.target);
        console.log(this);
        let new_container = this.parentElement;
        // console.log(new_container);
    }

};