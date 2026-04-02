import { Box, Static, Text, useInput } from 'ink';
import { useState, type FC } from 'react';

const App: FC = () => {
	const [tests, setTests] = useState<Array<{ id: number; title: string }>>([]);

	useInput((input, key) => {
		if (key.leftArrow) {
			setTests((old) => [
				...old,
				{
					id: new Date().valueOf(),
					title: `< Left arrow pressed`,
				},
			]);
		} else if (key.rightArrow) {
			setTests((old) => [
				...old,
				{
					id: new Date().valueOf(),
					title: `→ Right arrow pressed`,
				},
			]);
		} else if (key.upArrow) {
			setTests((old) => [
				...old,
				{
					id: new Date().valueOf(),
					title: `↑ Up arrow pressed`,
				},
			]);
		} else if (key.downArrow) {
			setTests((old) => [
				...old,
				{
					id: new Date().valueOf(),
					title: `↓ Down arrow pressed`,
				},
			]);
		} else if (key.return) {
			setTests((old) => [
				...old,
				{
					id: new Date().valueOf(),
					title: `⏎ Enter pressed`,
				},
			]);
		}
	});

	return (
		<>
			<Static items={tests}>
				{(test) => (
					<Box key={test.id}>
						<Text color="green">✔ {test.title}</Text>
					</Box>
				)}
			</Static>

			<Box marginTop={1}>
				<Text dimColor>Completed tests: {tests.length}</Text>
			</Box>
		</>
	);
};

export default App;
