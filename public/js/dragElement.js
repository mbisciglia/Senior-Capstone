class DragElement {
    constructor(el, parent) {
        if (el !== undefined && parent !== undefined) {
            this.element = el;
            this.element.classList.add("draggable-element");
            this.parent = parent;

            this.handle = document.createElement("div");
            this.handle.innerText = "Click here to move";
            this.handle.classList.add("draggable-handle");
            this.element.appendChild(this.handle);

            this._handleMouseMove = this._handleMouseMove.bind(this);
            this._clearMoveListeners = this._clearMoveListeners.bind(this);

            this.handle.addEventListener(
                "mousedown",
                this._handleMouseDown.bind(this)
            );
            this.handle.addEventListener("mouseup", this._clearMoveListeners);

            this.handle.addEventListener(
                "mouseleave",
                this._clearMoveListeners
            );
        }
    }

    reset() {
        // Will hide and clear all necessary values
        this.element.style.left = "";
        this.element.style.top = "";
        this.element.style.width = "";
        this.element.style.height = "";

        this.element.classList.remove("vis");
    }

    _handleMouseDown(evt) {
        evt.preventDefault();

        this.parentDimens = this.parent.getBoundingClientRect();
        this.initialOffset = {
            x: evt.offsetX,
            y: evt.offsetY
        };

        this.handle.addEventListener("mousemove", this._handleMouseMove);
    }

    _handleMouseUp(evt) {
        evt.preventDefault();
        this._clearMoveListeners();
    }

    _clearMoveListeners() {
        this.handle.removeEventListener("mousemove", this._handleMouseMove);

    this.parentDimens = null;
    this.topLeft = null;
    }

  _handleMouseMove(evt) {
    evt.preventDefault();

    var nextLeft =
        ((evt.pageX - this.parentDimens.left - this.initialOffset.x) /
          this.parentDimens.width) *
        100,
      nextTop =
        ((evt.pageY - this.parentDimens.top - this.initialOffset.y) /
          this.parentDimens.height) *
        100;

    this.element.style.left = nextLeft + "%";
    this.element.style.top = nextTop + "%";
  }

  getPercentageDimensions() {
    var dimens = this.element.getBoundingClientRect(),
      parentDimens = this.parent.getBoundingClientRect();
    var resp = {
      width: (dimens.width / parentDimens.width) * 100 + "%",
      height: (dimens.height / parentDimens.height) * 100 + "%",
      top: this.element.style.top,
      left: this.element.style.left
    };

    return resp;
  }
}
