export const cpfValidation = (cpf: string) => {

  var soma = 0;

  for( let i=0, j=1 ; i<9 ; i++, j++ ){
    soma = soma + ( j * Number(cpf[i]) );
  }

  const DV1 = soma % 11;

  soma = 0;
  for( let i=0, j=0 ; i<9 ; i++, j++ ){
    soma = soma + ( j * Number(cpf[i]) );
  }
  soma = soma + 9 * DV1;

  const DV2 = soma % 11;


  if( DV1 === Number(cpf[9]) && DV2 === Number(cpf[10]) ) {
    return true;
  }
  else {
    return false;
  }
}

export const cnpjValidation = (cnpj: string) => {

  var soma = 0;
  const pesos = [ 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9 ];

  for( let i=0, j=1 ; i<12 ; i++, j++ ){
    soma = soma + ( pesos[j] * Number(cnpj[i]) );
  }

  const DV1 = soma % 11;

  soma = 0;
  for( let i=0, j=0 ; i<12 ; i++, j++ ){
    soma = soma + ( pesos[j] * Number(cnpj[i]) );
  }
  soma = soma + 9 * DV1;

  const DV2 = soma % 11;


  if( DV1 === Number(cnpj[12]) && DV2 === Number(cnpj[13]) ) {
    return true;
  }
  else {
    return false;
  }
}

export const areaCodeValidation = (phone: string) => {

  const list = [ 11, 12, 13, 14, 15, 16, 17, 18, 19,
     21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
     41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54,
     55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73,
     74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
     89, 91, 92, 93, 94, 95, 96, 97, 98, 99 ];

  return list.includes(Number(phone.substring(1,3)));
}

export default { cpfValidation, cnpjValidation, areaCodeValidation };
