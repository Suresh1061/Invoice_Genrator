import { Request, Response } from "express"
import PDFDocument from "pdfkit"
import { generateCustomerInfo, generateProductTable, genreateHeader,generateFooterPopupMessage } from "../utils/createPdf";

export const generateInovice = async (req: Request, res: Response): Promise<void> => {
     try {
          const { invoice } = req.body;
          const doc = new PDFDocument({ size: 'A4' })
          let filename = `Invoice_${Date.now()}`;
          filename = encodeURIComponent(filename) + '.pdf';
          res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
          res.setHeader('Content-type', 'application/pdf');
          genreateHeader(doc)
          generateCustomerInfo(doc, invoice)
          generateProductTable(doc, invoice)
          generateFooterPopupMessage(doc)
          doc.end()
          doc.pipe(res)
     } catch (error) {
          console.log("Internal server error while generating invoice", error)
          res.status(500).json({ success: false, message: "Internal server error while generating invoice" })
     }
}