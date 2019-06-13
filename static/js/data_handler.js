// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {

        // it is not called from outside
        // sends the data to the API, and calls callback function

        return fetch(url, {
            method: 'POST',
            dataType: 'json',
            credentials: 'same-origin',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards

        this._api_get(`/get-cards/${boardId}`, (response) => {
            this._data = response;
            callback(response, boardId);
        });
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let data = {'title': boardTitle};

        this._api_post('/post-new-board', data, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let data = {
            'title': cardTitle,
            'board_id': boardId,
            'status_id': statusId
        };

        this._api_post('/post-new-card', data, (response) => {
            this._data = response;
            callback(response);
        })
    },
    // here comes more features
    getCards: function (callback) {
        this._api_get(`/get-cards`, (response) => {
            this._data = response;
            callback(response);
        });
    },
    deleteBoard: function (boardId, callback) {
        let data = {'id': boardId};
        this._api_post('/delete-board', data, (response) => {
            this._data = response;
            callback();
        });
    },
    deleteCard: function (id, callback) {
        let data = {'id': id};
        this._api_post(`/delete-card`, data, (response) => {
            this._data = response;
            callback();
        });
    },

    change_status: function (id,status_id){
        console.log(status_id);
        let data = {'id': id,
                    'status_id': status_id
                    };
        this._api_post(`/change-status`, data, (response) => {
            this._data = response;

        });

    updateBoardName: function (boardId, newTitle, callback) {
        let data = {'id': boardId,
                    'title': newTitle};
        this._api_post('/rename-board', data, (response) => {
            this._data = response;
            callback();
        })

    }
};
