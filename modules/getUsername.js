const getUsername = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find(arg => arg.startsWith('--username'));
  if (usernameArg) {
    return usernameArg.substring(11);
  }

  return 'Anonymous';
};

export { getUsername };