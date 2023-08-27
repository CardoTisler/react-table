export type DataObject = {
    name: string;
    type: {
        options: string[],
        selected: string;
    };
    typeOfTool: {
        options: string[],
        selected: string[]
    };
    extReference: string;
    active: boolean;
}
