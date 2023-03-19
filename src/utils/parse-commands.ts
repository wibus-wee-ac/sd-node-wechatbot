export interface Command {
  function_name: string;
  input: string;
  options: {
    [key: string]: string | undefined;
  };
}

export function parseCommand(inputStr: string): Command {
  const parts: string[] = inputStr.trim().split(/\s+/);
  const cmd: Command = {
    function_name: parts[0].substr(1),
    input: '',
    options: {},
  };

  let i = 1;
  while (i < parts.length && !parts[i].startsWith('--')) {
    if (cmd.input !== '') cmd.input += ' ';
    cmd.input += parts[i];
    i++;
  }

  while (i < parts.length) {
    const optParts: string[] = parts[i].split('=');
    const option: { [key: string]: string } = {};
    option[optParts[0].substr(2)] = optParts[1];
    cmd.options = { ...cmd.options, ...option };
    i++;
  }

  return cmd;
}
