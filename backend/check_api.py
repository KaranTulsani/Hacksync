from gradio_client import Client
import json

try:
    client = Client("dhananjayyadav001/brandpulse-visual-engine")
    api_info = client.view_api(return_format="dict")
    # Pretty print the parameters of the first endpoint
    if "endpoints" in api_info and len(api_info["endpoints"]) > 0:
        params = api_info["endpoints"][0].get("parameters", [])
        print("Parameters found:")
        for p in params:
            print(f"- Name: {p.get('parameter_name')}, Label: {p.get('label')}")
    else:
        print("No endpoints found")
except Exception as e:
    print(f"Error: {e}")
