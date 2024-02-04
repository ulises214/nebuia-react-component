function luhn(nss: string) {
  let suma = 0,
    par = false,
    digito;

  for (let i = nss.length - 1; i >= 0; i--) {
    digito = parseInt(nss.charAt(i), 10);
    if (par) {
      if ((digito *= 2) > 9) {
        digito -= 9;
      }
    }

    par = !par;
    suma += digito;
  }

  return suma % 10 === 0;
}
function validateNSS(nss: string) {
  const re = /^(\d{2})(\d{2})(\d{2})\d{5}$/,
    verified = nss.toString().match(re);

  if (!verified) {
    return false;
  }

  const subDeleg = parseInt(verified[1] ?? '', 10),
    anno = new Date().getFullYear() % 100;
  let annoAlta = parseInt(verified[2] ?? '', 10),
    annoNac = parseInt(verified[3] ?? '', 10);

  if (subDeleg !== 97) {
    if (annoAlta <= anno) {
      annoAlta += 100;
    }
    if (annoNac <= anno) {
      annoNac += 100;
    }
    if (annoNac > annoAlta) {
      return false;
    } // Err: se dio de alta antes de nacer!
  }

  return luhn(nss);
}

export function isNSS(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  return validateNSS(value);
}
