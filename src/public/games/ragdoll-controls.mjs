import Display from '../utils/infoDisplay.mjs';

let debug = true;

/**
 *
 *
 * @export
 * @class RagdollControls
 */
export default class RagdollControls {
    constructor(socket) {
        this.ready = false;
        this.socket = socket;
        this.mouseCoords = new THREE.Vector2();
        socket.emit('debug', this.mouseCoords);
        this.display = new Display();
        this.movement = { x: 0, y: 0, z: 0 };
    }
    clearMovement() {
        this.movement = { x: 0, y: 0, z: 0 };
    }
    addReadyButton() {
        let self = this;
        let btn = document.createElement('BUTTON');
        btn.innerHTML = "Ready?";
        btn.className = "btn login_btn ready_btn";
        btn.id = "ready-btn";
        btn.addEventListener("click", function () {
            self.socket.emit('player ready');
            self.removeReadyButton();
            self.removeMovementButtons();
            self.initInput();
        })
        document.body.appendChild(btn);
        if (debug) console.log(btn);
    }
    removeReadyButton() {
        let btn = document.getElementById('ready-btn');
        btn.removeEventListener('click', function () {
            if (debug) console.log("Removed Ready Button")
        });
        if (btn) document.body.removeChild(btn);
    }
    addMovementButtons() {
        let self = this;
        // left button
        let btn = document.createElement('BUTTON');
        btn.className = "btn control_btn left_btn";
        btn.id = "left-control-button";
        btn.addEventListener("click", function () {
            this.movement = { x: -1, y: 0, z: 0 };
            self.socket.emit('new player position', this.movement);
        })
        document.body.appendChild(btn);

        // right button
        btn = document.createElement('BUTTON');
        btn.className = "btn control_btn right_btn";
        btn.id = "right-control-button";
        btn.addEventListener("click", function () {
            this.movement = { x: 1, y: 0, z: 0 };
            self.socket.emit('new player position', this.movement);
        })
        document.body.appendChild(btn);

        // up button
        btn = document.createElement('BUTTON');
        btn.className = "btn control_btn up_btn";
        btn.id = "up-control-button";
        btn.addEventListener("click", function () {
            this.movement = { x: 0, y: 1, z: 0 };
            self.socket.emit('new player position', this.movement);
        })
        document.body.appendChild(btn);

        // down button
        btn = document.createElement('BUTTON');
        btn.className = "btn control_btn down_btn";
        btn.id = "down-control-button";
        btn.addEventListener("click", function () {
            this.movement = { x: 0, y: -1, z: 0 };
            self.socket.emit('new player position', this.movement);
        })
        document.body.appendChild(btn);

    }
    removeMovementButtons() {

        let btn = document.getElementById('up-control-button');
        btn.removeEventListener('click', function () {
            if (debug) console.log("Removed Up Button")
        });
        if (btn) document.body.removeChild(btn);

        btn = document.getElementById('down-control-button');
        btn.removeEventListener('click', function () {
            if (debug) console.log("Removed Down Button")
        });
        if (btn) document.body.removeChild(btn);

        btn = document.getElementById('left-control-button');
        btn.removeEventListener('click', function () {
            if (debug) console.log("Removed Left Button")
        });
        if (btn) document.body.removeChild(btn);

        btn = document.getElementById('right-control-button');
        btn.removeEventListener('click', function () {
            if (debug) console.log("Removed Right Button")
        });
        if (btn) document.body.removeChild(btn);


    }
    initInput() {
        let self = this;
        window.addEventListener('mousedown', function (event) {
            // event.stopPropagation();
            // event.preventDefault();
            self.mouseCoords.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                - (event.clientY / window.innerHeight) * 2 + 1
            );
            self.socket.emit('click request', self.mouseCoords);
            console.log(self.mouseCoords);
        }, false);
        window.addEventListener('touchstart', function (event) {
            event.stopPropagation();
            event.preventDefault();
            self.mouseCoords.set(
                (event.touches[0].clientX / window.innerWidth) * 2 - 1,
                - (event.touches[0].clientY / window.innerHeight) * 2 + 1
            );
            self.socket.emit('click request', self.mouseCoords);
            self.socket.emit('debug', event);
        }, false);
    }
    addInfoDisplay() {
        this.display.setup();
    }
    update(state) {
        this.state = state.players;
        this.display.update(state.players);
    }
    setup() {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "lightBlue";
        this.addReadyButton();
        this.addMovementButtons();
        this.addInfoDisplay();

    }
    play() {

    }
}