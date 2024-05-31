export function isValidUsername(username: string) {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

  if (username.length < 6 || username.length > 30) {
    return false;
  } else if (!usernameRegex.test(username)) {
    return false;
  }

  return true;
}
