import requests
import json
import bisect

def getClasses():
    api_url = "https://uri.kuali.co/api/v1/catalog/courses/67d1d5f37a3472af016158a7?q="
    response = requests.get(api_url)
    data = response.json()

    if response.status_code == 200:
        data = response.json()  # since it’s JSON, parse directly
        # Save to file

        with open("uri_courses.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

        print("Data saved to uri_courses.json")
    else:
        print("Error:", response.status_code)


def getMajor(major):
    url_start = "https://uri.kuali.co/api/v1/catalog/course/67d1d5f37a3472af016158a7/"
    with open("C:/Users/gladi/OneDrive/Documents/GitHub/curriculum-sheet-app-1.0/web-scraping/uri_courses.json", "r", encoding="utf-8") as f:
        courses = json.load(f)

    # Extract sorted courseIds (assuming courses.json is alphabetically sorted by courseId)
    course_ids = [c["subjectCode"]["name"] for c in courses]

    # Binary search for the first index where the major prefix could appear
    start_index = bisect.bisect_left(course_ids, major)

    results = []

    # Iterate forward until courseIds no longer match the major prefix
    for i in range(start_index, len(courses)):
        if not course_ids[i].startswith(major):
            break

        pid = courses[i]["pid"]
        response = requests.get(url_start + pid)

        if response.status_code == 200:
            data = response.json()
            results.append({
                "code": data["__catalogCourseId"],
                "title": data["title"],
                "credits": data.get("credits", {}).get("value"),
                "description": data.get("description", "")
            })
        else:
            print("Error:", response.status_code)

    # Save once at the end
    if results:
        with open(major + "_courses.json", "w", encoding="utf-8") as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
        print(f"Saved {len(results)} courses to {major}_courses.json")
    else:
        print(f"No courses found for {major}")

def main():
    getMajor("BME")




main()