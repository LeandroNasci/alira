
function parseStringAsBoolean(booleanAsString: string) {
  switch(booleanAsString){
    case "true":
      return true;
    case "false":
      return false;
  }
}

export default parseStringAsBoolean;
