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
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(boards => {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardContainer = document.querySelector('.board-container');
        for (let board of boards) {
            const template = document.querySelector('#board-template');
            const clone = document.importNode(template.content, true);
            let columns = clone.querySelectorAll('.board-column-content');
            for (let column of columns) {
                column.setAttribute("data-board-id", board.id);
            }

            clone.querySelector('.board-title').innerHTML = board.title;
            clone.querySelector('.board-add').setAttribute("id", board.id);
            boardContainer.appendChild(clone);
            dom.loadCards(parseInt(board.id));
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
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
                        column.appendChild(clone);
                    }
                }
            }
        }
    },
    addNewBoard: function () {

        let addBoardButton = document.querySelector("#add-new-board");
        addBoardButton.addEventListener('click', function () {
            dataHandler.createNewBoard('board', dom.showNewBoard);
        })
    },
    showNewBoard: function(response){

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
        //let boardId = response.board_id;
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
    }
};