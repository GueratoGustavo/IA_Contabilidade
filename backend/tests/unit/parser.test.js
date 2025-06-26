const { parseCSV, parsePDF } = require('../../src/parser'); // ajuste o caminho

describe('Parser CSV e PDF', () => {
    test('parseCSV deve retornar array com objetos para CSV válido', () => {
        const csvData = `id,name,value\n1,Alice,100\n2,Bob,200`;
        const result = parseCSV(csvData);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toHaveProperty('id', '1');
    });

    test('parsePDF deve extrair texto corretamente', () => {
        const pdfBuffer = Buffer.from('%PDF-1.4 fake pdf content'); // mock simplificado
        const text = parsePDF(pdfBuffer);
        expect(typeof text).toBe('string');
        // Mais asserts conforme lógica real
    });
});