export const cepSanitization = (cep: string) => {
  const regex = new RegExp(/[^0-9]|[/ /]/g, "");
  const sCep = cep.toString().trim().replace(regex, "");
  if (sCep.length !== 8) throw Error(`invalid CEP: ${cep}`);
  return sCep;
}

export const cpfSanitization = (cpf: string) => {
  const regex = new RegExp(/[^0-9]|[/ /]/g, "");
  let temp = cpf.toString().trim();
  while (temp.match(regex) !== null ){
    temp = temp.replace(regex, "");
  }
  if (temp.length !== 11) throw Error(`invalid CPF: ${cpf}`);
  return temp;
}

export const cnpjSanitization = (cnpj: string) => {
  const regex = new RegExp(/[^0-9]|[/ /]/g, "");
  let temp = cnpj.toString().trim();
  while (temp.match(regex) !== null ){
    temp = temp.replace(regex, "");
  }
  if (temp.length !== 14) throw Error(`invalid CNPJ: ${cnpj}`);
  return temp;
}

export default { cepSanitization, cpfSanitization, cnpjSanitization };
