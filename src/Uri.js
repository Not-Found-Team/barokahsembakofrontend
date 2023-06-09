export class Uri {
    static get rootUri() { return process.env["REACT_APP_ROOT_URI"] || "" };
}
