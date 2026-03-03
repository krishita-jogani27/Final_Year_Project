import PyPDF2

def extract_text_from_pdf(pdf_path, txt_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
    with open(txt_path, "w", encoding="utf-8") as out:
        out.write(text)

if __name__ == "__main__":
    pdf_path = r"d:\Final_Year_Project\Krishi_project_proposal.pdf"
    txt_path = r"d:\Final_Year_Project\proposal_text.txt"
    extract_text_from_pdf(pdf_path, txt_path)
