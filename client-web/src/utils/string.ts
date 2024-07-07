export const isCnpjDocument = (value: string) => {
	return value.length >= 14;
};

export const clearDocument = (value: string) => {
	return value.replace(/[^\d]+/g, '');
};

export const validateDocument = (document: string): boolean => {
	const formattedDocument = clearDocument(document);

	return isCnpjDocument(formattedDocument)
		? validateCNPJ(formattedDocument)
		: validateCPF(formattedDocument);
};

export const validateEmail = (email: string): boolean => {
	const emailRegex =
		// eslint-disable-next-line
		/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
	return emailRegex.test(email);
};

const validateCNPJ = (cnpj: string): boolean => {
	cnpj = clearDocument(cnpj);

	if (cnpj == '') {
		return false;
	}

	if (cnpj.length != 14) {
		return false;
	}

	// Elimina CNPJs invalidos conhecidos
	if (
		cnpj == '00000000000000' ||
		cnpj == '11111111111111' ||
		cnpj == '22222222222222' ||
		cnpj == '33333333333333' ||
		cnpj == '44444444444444' ||
		cnpj == '55555555555555' ||
		cnpj == '66666666666666' ||
		cnpj == '77777777777777' ||
		cnpj == '88888888888888' ||
		cnpj == '99999999999999'
	) {
		return false;
	}

	// Valida DVs
	length = cnpj.length - 2;
	let numbers = cnpj.substring(0, length);
	let digits = cnpj.substring(length);
	let total = 0;
	let pos = length - 7;
	for (let i = length; i >= 1; i--) {
		total += parseInt(numbers.charAt(length - i)) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}
	let result = total % 11 < 2 ? 0 : 11 - (total % 11);
	if (result != parseInt(digits.charAt(0))) {
		return false;
	}

	length = length + 1;
	numbers = cnpj.substring(0, length);
	total = 0;
	pos = length - 7;
	for (let i = length; i >= 1; i--) {
		total += parseInt(numbers.charAt(length - i)) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}
	result = total % 11 < 2 ? 0 : 11 - (total % 11);
	if (result != parseInt(digits.charAt(1))) {
		return false;
	}

	return true;
};

const validateCPF = (cpf: string): boolean => {
	cpf = clearDocument(cpf);

	if (cpf == '') {
		return false;
	}

	// Elimina CPFs invalidos conhecidos
	if (
		cpf.length != 11 ||
		cpf == '00000000000' ||
		cpf == '11111111111' ||
		cpf == '22222222222' ||
		cpf == '33333333333' ||
		cpf == '44444444444' ||
		cpf == '55555555555' ||
		cpf == '66666666666' ||
		cpf == '77777777777' ||
		cpf == '88888888888' ||
		cpf == '99999999999'
	) {
		return false;
	}

	// Valida 1o digito
	let add = 0;
	for (let i = 0; i < 9; i++) {
		add += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) {
		rev = 0;
	}
	if (rev != parseInt(cpf.charAt(9))) {
		return false;
	}

	// Valida 2o digito
	add = 0;
	for (let i = 0; i < 10; i++) {
		add += parseInt(cpf.charAt(i)) * (11 - i);
	}
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) {
		rev = 0;
	}
	if (rev != parseInt(cpf.charAt(10))) {
		return false;
	}
	return true;
};

export const getDocumentType = (value: string) => {
	const formattedDocument = clearDocument(value);

	if (formattedDocument.length <= 11) {
		return 'CPF';
	}

	return 'CNPJ';
};

export const formatDocument = (value: string, hideNumbers: boolean = false): string => {
	const formattedDocument = value.replace(/[./-]/g, '');
	const documentType = getDocumentType(formattedDocument);
	const parsedDocument = hideNumbers
		? `***${formattedDocument.substr(3, formattedDocument.length - 5)}**`
		: formattedDocument;

	if (documentType === 'CPF') {
		return parsedDocument.replace(/(\S{3})(\S{3})(\S{3})(\S{2})/g, '$1.$2.$3-$4');
	}

	return parsedDocument.replace(/(\S{2})(\S{3})(\S{3})(\S{4})(\S{2})/g, '$1.$2.$3/$4-$5');
};
