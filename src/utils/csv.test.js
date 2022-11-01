import { parseCSV, stringifyCSV, parseJson } from './csv';

test('parseCSV', () => {
  const { csvHeader, csvData } = parseCSV('Name,Country\njimmy,Taiwan\n');

  expect(csvHeader).toStrictEqual(['Name', 'Country']);
  expect(csvData).toStrictEqual([['jimmy', 'Taiwan']]);
});

test('stringifyCSV', () => {
  expect(stringifyCSV({ csvHeader: ['Name', 'Country'], csvData: [['jimmy', 'Taiwan']] })).toBe(
    JSON.stringify([
      {
        Name: 'jimmy',
        Country: 'Taiwan',
      },
    ])
  );
});

test('parseJson', () => {
  expect(
    parseJson(
      JSON.stringify([
        {
          Name: 'jimmy',
          Country: 'Taiwan',
        },
      ])
    )
  ).toBe('Name,Country\njimmy,Taiwan\n');
});
