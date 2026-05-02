import PyPDF2
import sys
import json

def extract_pdf(file_path):
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    
    with open("pdf_extracted.txt", "w") as out:
        out.write(text)
    print("Done")

if __name__ == "__main__":
    extract_pdf("star_systems.pdf")
