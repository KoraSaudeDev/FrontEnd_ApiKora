export function getCookies(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}


export function removeCookie(name: string, path: string = "/"): void {
  // Configura o cookie com o mesmo nome, valor vazio e data de expiração no passado
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}