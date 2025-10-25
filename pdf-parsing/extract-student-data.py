from PyPDF2 import PdfReader
import re
import json

def is_course_line(line):
    pattern = r'^[A-Z]{3,4}\s+[A-Z0-9]{3,4}\s+.+\s+\d+\.\d{2}\s+\d+\.\d{2}'
    return bool(re.match(pattern, line.strip()))

# May not be the proper term for the J-term or winter courses
def is_semester_line(line):
    return bool(re.match(r'^(Sum\.|Fall|Spr\.|Win\.)\s+\d{4}$', line.strip()))

def semester_to_code(semester):
    """
    Converts a semester string like 'Spr. 2025' or 'Fall 2025' into a short code:
      Spr. 2025  -> S25
      Sum. 2025  -> Su25
      Fall 2025  -> F25
      Win. 2025  -> W25
    """
    semester_map = {
        "Spr": "S",
        "Sum": "Sum",
        "Fall": "F",
        "Win": "W"
    }

    match = re.match(r'([A-Za-z]+)\.?\s*(\d{4})', semester.strip())
    if not match:
        raise ValueError(f"Invalid semester format: {semester}")
    
    abbr, year = match.groups()
    year_code = year[-2:]
   
    if abbr not in semester_map:
        raise ValueError(f"Unknown semester abbreviation: {abbr}")
    
    return f"{semester_map[abbr]}{year_code}"

def parse_course_line(line, semester):
    """
    Parse a course line into its components.
    Returns a dict with department, course_number, title, credits, grade, etc.
    """
    pattern = (
        r'^([A-Z]{3,4})\s+'        # department (3–4 letters)
        r'([A-Z0-9]{3,4})\s+'      # course number (e.g., 308 or 1A4)
        r'(.+?)\s+'                 # title (non-greedy)
        r'(\d+\.\d{2})\s+'          # credits
        r'(\d+\.\d{2})\s+'          # attempted credits
        r'([A-Z][+-]?)?\s*'           # optional grade (A, B+, T, or blank)
        r'(\d+\.\d{2})$'            # grade points
    )
    
    match = re.match(pattern, line.strip())
    if not match:
        return None

    dept, course_num, title, credit, attempted, grade, points = match.groups()
    return {
        "code": dept + course_num,
        "grade": grade or "In Progress",
        "semester": semester_to_code(semester),
        "credits": int(float(credit))
    }

def get__class_text(file_name):
    reader = PdfReader(file_name)
    text = ""
    for page in reader.pages:
        for line in page.extract_text().splitlines():
            if (is_course_line(line)):
                text += line + "\n"
    return text

def pdf_to_text(pdf_path, output_path):
    reader = PdfReader(pdf_path)
    with open(output_path, "w", encoding="utf-8") as out_file:
        for page in reader.pages:
            text = page.extract_text()
            if not text:
                continue  # skip pages with no text
            out_file.write(text)
            out_file.write("\n")  # separate pages with a newline

    print(f"Extracted text saved to {output_path}")

def classes_to_json(class_list, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(class_list, f, indent=4)

def get_classes(file_name):
    reader = PdfReader(file_name)
    class_list = []
    semester = ""
    for page in reader.pages:
        for line in page.extract_text().splitlines():
            if (is_semester_line(line)):
                semester = line.strip()
            if (is_course_line(line)):
                print(parse_course_line(line, semester))
                class_list.append(parse_course_line(line, semester))
    return class_list

def main():
    class_list = get_classes("transcript.pdf")
    classes_to_json(class_list, "student-classes.json")

main()