const {readFileSync, writeFileSync} = require('fs');
const {PDFDocument, rgb, degrees} = require('pdf-lib');
const path = require('path');

const dataFolder = path.join(__dirname, './data');
const faktoringSozlesmesi = path.join(dataFolder, 'dummy.pdf');

const updatePdfWithDate = async () => {
	console.log("pdf oluşturuluyor...");
	const existingPdfBytes = readFileSync(faktoringSozlesmesi);
	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	const pages = pdfDoc.getPages();

	const textConfig = {
		x: 10,
		y: 110,
		size: 12,
		color: rgb(0, 0, 0),
		rotate: degrees(-90)
	};

	console.log("pdf güncelleniyor...");
	const today = new Date().toLocaleDateString('tr-TR');
	pages.forEach(page => {
		page.drawText(today, textConfig);
	});

	const pdfBytes = await pdfDoc.save();
	const filePath = path.join(dataFolder, `dummy_${today}.pdf`);
	writeFileSync(filePath, pdfBytes);
	console.log("pdf kaydedildi...");
}

updatePdfWithDate();