export type DataObject = {
    name: string;
    type: { // TODO: Make these string[] aswell, less fuckery
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
