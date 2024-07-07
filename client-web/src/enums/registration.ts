export enum EPersonType {
	PF = 'PF',
	PJ = 'PJ',
}

export const personTypeDescription: Record<EPersonType, string> = {
	[EPersonType.PF]: 'Pessoa física',
	[EPersonType.PJ]: 'Pessoa jurídica',
};
