export class FileList {
    public filename: string;
    public path: string;
    public imageURL: string;

    constructor(file?: any) {
        this.filename = file.filename;
        this.path = file.path;
        this.imageURL = file.imageURL;
    }
}
