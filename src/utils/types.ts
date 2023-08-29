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

export type FormDataObject = {
    name: string;
    type: string;
    typeOfTool: string[];
    extReference: string;
    active: boolean;
}
