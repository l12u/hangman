export class Client {
    readonly id: string;

    constructor(
        public isAlive: boolean = true,
    ) {
        this.id = [...Array(8)].map(() => (Math.floor(Math.random() * 36)).toString(36)).join("");
    }
}