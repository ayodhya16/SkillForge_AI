package com.mahesh.skillForge.service;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;

@Service
public class CertificateService {

    private static final String BASE_DIR = "certificates";

    public String generate(User student, Course course) {

        try {
            File dir = new File(BASE_DIR);
            if (!dir.exists()) dir.mkdirs();

            String fileName =
                "CERT_" + student.getId() + "_" + course.getId() + ".pdf";

            String filePath = BASE_DIR + "/" + fileName;

            PdfWriter writer = new PdfWriter(filePath);
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf);

            doc.add(new Paragraph("CERTIFICATE OF COMPLETION")
                    .setBold().setFontSize(22));

            doc.add(new Paragraph("\nThis is to certify that\n"));
            doc.add(new Paragraph(student.getName())
                    .setBold().setFontSize(18));

            doc.add(new Paragraph("\nhas successfully completed the course\n"));

            doc.add(new Paragraph(course.getTitle())
                    .setBold().setFontSize(16));

            doc.add(new Paragraph("\nIssued on: " + LocalDateTime.now()));

            doc.close();

            return filePath;

        } catch (Exception e) {
            throw new RuntimeException("Certificate generation failed", e);
        }
    }
}
