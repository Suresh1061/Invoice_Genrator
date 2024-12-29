import path from "path";

const imgPath = path.join(__dirname, "..", "Public", 'logo.png');
const customFontPath = path.join(__dirname, "..", "Public", 'noto-sans-font.ttf');

type productType = {
     productName: string;
     qty: number;
     price: number;
     total: number;
};

type invoiceType = {
     invoiceNumber: string;
     customerName: string;
     customerEmail: string;
     finalPrice: number;
     products: productType[];
}

export const genreateHeader = (doc: PDFKit.PDFDocument): void => {
     doc
          .font('Helvetica-Bold')
          .fontSize(16)
          .text("Invoice", 120, 20, { align: 'center' })
          .moveDown();

     doc
          .image(imgPath, 20, 16, { width: 30, height: 30 })
          .fillColor("#444444")
          .fontSize(15)
          .text("Levitation", 55, 20)
          .fontSize(10)
          .text("Infotech", 55, 36)
          .moveDown();

     doc
          .moveTo(0, 60)
          .lineTo(doc.page.width, 60)
          .lineWidth(1)
          .strokeColor('#EAEAEA')
          .stroke();
}

export const generateCustomerInfo = (doc: PDFKit.PDFDocument, invoice: invoiceType): void => {
     const date = new Date();

     // Function to capitalize the customer's name
     const capitalizeName = (name: string): string => {
          return name
               .split(' ') // Split the name into words
               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
               .join(' '); // Join the words back together
     };

     // Function to format the date as MM/DD/YY
     const formatDate = (date: Date): string => {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = String(date.getFullYear()).slice(-2);
          return `${day}/${month}/${year}`;
     };

     doc
          .save()
          .roundedRect(30, 80, 540, 80, 8)
          .fill('#2F363F')
          .restore();

     doc
          .fillColor('#CCCCCC')
          .font('Helvetica-Bold')
          .fontSize(13)
          .text('Name: ', 60, 100)
          .fillColor('#CCF575')
          .font('Helvetica')
          .text(capitalizeName(invoice.customerName), 110, 100)
          .fillColor('#CCCCCC')
          .font('Helvetica-Bold')
          .text('Email: ', 60, 125)
          .fillColor('#CCF575')
          .font('Helvetica')
          .text(invoice.customerEmail, 110, 125);

     doc
          .fillColor('#CCCCCC')
          .font('Helvetica')
          .fontSize(10)
          .text(`Invoice Number: ${invoice.invoiceNumber}`, 200, 100, { align: 'right' })
          .text(`Date: ${formatDate(date)}`, 300, 115, { align: 'right' });
};

export const generateProductTable = (doc: PDFKit.PDFDocument, invoice: invoiceType): void => {
     // Register custom font
     doc.registerFont('CustomFont', customFontPath);

     // Add the table headers
     doc
          .save()
          .roundedRect(30, 185, 540, 40, 20)
          .fill('#2F363F')
          .restore();

     doc
          .fillColor('#fff')
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Product', 60, 200)
          .text('Qty', 230, 200)
          .text('Rate', 340, 200)
          .text('Total Amount', 440, 200);

     let y = 240;
     let subTotal = 0;
     const tableData = invoice.products;

     tableData.forEach((item) => {
          subTotal += item.total;

          doc
               .fillColor('#333333')
               .fontSize(10)
               .font('CustomFont')
               .text(item.productName, 55, y, { width: 150 })
               .text(String(item.qty), 220, y, { width: 25, align: 'right' })
               .text(`${String.fromCharCode(8377)} ${item.price.toFixed(2)}`, 295, y, { width: 80, align: 'right' })
               .text(`${String.fromCharCode(8377)} ${item.total.toFixed(2)}`, 420, y, { width: 80, align: 'right' });

          y += 20;
     });

     // Draw a box for total charges, GST, and Total Amount
     doc
          .roundedRect(290, y + 50, 270, 85, 8)
          .strokeColor('#A2A2A2')
          .stroke();

     // Add totals
     doc
          .fontSize(10)
          .font('Helvetica')
          .text('Total Charges', 310, y + 65)
          .font('CustomFont')
          .text(`${String.fromCharCode(8377)} ${subTotal.toFixed(2)}`, 400, y + 65, { align: 'right' })
          .font('Helvetica')
          .text('GST (18%)', 310, y + 85)
          .font('CustomFont')
          .text(`${String.fromCharCode(8377)} ${(subTotal * 0.18).toFixed(2)}`, 400, y + 85, { align: 'right' })
          .font('Helvetica-Bold')
          .fontSize(12)
          .text('Total Amount', 310, y + 110)
          .font('CustomFont')
          .text(`${String.fromCharCode(8377)} ${(subTotal + subTotal * 0.18).toFixed(2)}`, 400, y + 110, { align: 'right' });
};


export const generateFooterPopupMessage = (doc: PDFKit.PDFDocument): void => {
     const popupY = doc.page.height;
     const popupWidth = 500;
     const popupHeight = 50;
     const popupX = 50;

     doc
          .save()
          .roundedRect(popupX, popupY - 120, popupWidth, popupHeight, 20)
          .fill('#272833')
          .restore();

     doc
          .fillColor('#FFFFFF')
          .font('Helvetica')
          .fontSize(10)
          .text(
               'We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.',
               popupX + 30,
               popupY - 106,
               { width: popupWidth - 60, align: 'center' }
          );
};