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

export default { cpfValidation, cnpjValidation };
