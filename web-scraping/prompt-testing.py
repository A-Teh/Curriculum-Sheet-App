import requests
import json

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
MODEL = "gpt-oss:20b"  # or gpt-oss:20b-turbo, qwen:7b, etc.

def query_model(prompt_text):
    print("start")
    payload = {
        "model": MODEL,
        "prompt": prompt_text,
        "stream": False  # set True if you want streaming responses
    }
    
    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()
    
    # The AI’s text output
    result = response.json().get("response", "")
    return result

# Example usage
prompt = "Extract subject, number, title from this course description: 'CSC305: Software Engineering...' "
output = query_model(prompt)
print(output)
