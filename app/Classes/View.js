class View {

    constructor(data, code = 200) {
        this.data = data;
        this.code = code;
    }

    getCode() {
        return this.code;
    }

    render() {
        return this.data;
    }

    isView() {
        return true;
    }
}

module.exports = View;
