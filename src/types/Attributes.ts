export type IAttributesValue = {
    name: string;
    type: string;
    attributeKey: string;
    values: string[];
    isRequired: boolean;
};

export type IAttributeReponse = {
    _id: string;
    attributeIds: IAttributesValue[];
};
