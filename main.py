import requests
import re

headers = {
    'Referer': 'https://www.google.com/',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Accept-Language': "tr-TR,tr",
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
}

response = requests.get('https://developers.google.com/maps', headers=headers)
title = re.search(
    r'<h3 id="creez-des-applications-exceptionnelles-grace-aux-connaissances-de-google-sur-le-monde-reel"[\s\S]*?<a [^>]*>(.*?)</a>[\s\S]*?</h3>',
    response.text
)
print(title.group(1))