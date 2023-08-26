export type DataObject = {
    name: string;
    type: {
        options: Option[],
        selected: Option;
    };
    typeOfTool: string;
    extReference: string;
    active: string;
}

export type Option = {
    value: string;
    label: string;
}
