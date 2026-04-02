import { render } from 'ink';
import meow from 'meow';
import App from './app.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cli = meow({
	importMeta: import.meta,
	help: `
        Usage
          $ ink-app

        Options
            --name  Your name

        Examples
          $ ink-app --name=Jane
          Hello, Jane
    `,
});

render(<App />);
