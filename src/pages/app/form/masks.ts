export function maskPhone(e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }

  e.target.value = value;
}

export function maskCep(e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 8) value = value.slice(0, 8);

  value = value.replace(/(\d{5})(\d)/, "$1-$2");

  e.target.value = value;
}
