const getUsername = () => {
  const args = process.argv.slice(2);
  let username = '';
  const usernameArg = args.find(arg => arg.startsWith('--username'));
  if (usernameArg) {
    username = usernameArg.substring(11);
  }

  return username ? username : 'Anonymous';
};

export { getUsername };