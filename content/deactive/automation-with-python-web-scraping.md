---
title: "Python ile Web Scraping: Automation'un Gücü"
description: "Python kullanarak web scraping ile manuel süreçleri otomatize etme yöntemlerini ve gerçek proje deneyimlerimi paylaşıyorum."
date: "2025-08-18"
tags: ["Python", "Web Scraping", "Automation", "BeautifulSoup", "Selenium"]
featured: false
author: "Hakkı Günal"
excerpt: "Monitorist projemde 20+ e-ticaret sitesinin envanterini takip ederken öğrendiğim web scraping teknikleri ve best practices."
acive: true
---

Automation tutkum beni hep farklı projeler geliştirmeye yöneltti. En büyük başarılarımdan biri olan **Monitorist** projesinde, 20'den fazla e-ticaret sitesinin envanterini gerçek zamanlı olarak takip eden bir sistem geliştirdim. Bu yazıda, bu süreçte öğrendiğim teknikleri paylaşacağım.

## Proje Hikayesi: Monitorist

E-ticaret sitelerindeki sınırlı sayıdaki (hype) ürünlerin stok durumunu manuel takip etmek büyük verim kaybına yol açıyordu. Stoklar haber verilmeden eklendiği için fırsatları kaçırmak işin doğasıydı.

### Çözüm: 7/24 Çalışan Web Scraping Otomasyonu

Python ile geliştirdiğim sistem:
- Hype ürünlerini sürekli izliyor
- Stok değişikliklerini SQLite veritabanına kaydediyor
- Discord webhook'ları ile anlık bildirimler gönderiyor

## Teknik Implementasyon

### 1. Temel Web Scraping Setup

```python
import requests
from bs4 import BeautifulSoup
import time
import sqlite3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

class ProductMonitor:
    def __init__(self, db_path="products.db"):
        self.db_path = db_path
        self.setup_database()
        self.setup_selenium()
    
    def setup_selenium(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Chrome(options=chrome_options)
    
    def setup_database(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price REAL,
                availability BOOLEAN,
                url TEXT,
                last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
```

### 2. Dynamic Content Handling

Birçok modern e-ticaret sitesi JavaScript ile içerik yüklüyor. Bu durumda Selenium kullanmak gerekiyor:

```python
def scrape_dynamic_content(self, url):
    try:
        self.driver.get(url)
        
        # Sayfanın yüklenmesini bekle
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "product-info"))
        )
        
        # BeautifulSoup ile parse et
        soup = BeautifulSoup(self.driver.page_source, 'html.parser')
        
        return self.extract_product_info(soup)
        
    except TimeoutException:
        print(f"Timeout: {url}")
        return None
```

### 3. Rate Limiting ve Ethical Scraping

```python
import random
from time import sleep

class RateLimiter:
    def __init__(self, min_delay=1, max_delay=3):
        self.min_delay = min_delay
        self.max_delay = max_delay
    
    def wait(self):
        delay = random.uniform(self.min_delay, self.max_delay)
        sleep(delay)

# Her request arasında bekle
rate_limiter = RateLimiter(2, 5)

for url in product_urls:
    data = scrape_product(url)
    rate_limiter.wait()  # Sunucuya yük bindirmemek için
```

## Site-Specific Parsing Strategies

Her e-ticaret sitesinin farklı HTML yapısı var. Bunun için modüler bir approach geliştirdim:

```python
class SiteParser:
    def __init__(self):
        self.parsers = {
            'trendyol.com': self.parse_trendyol,
            'hepsiburada.com': self.parse_hepsiburada,
            'n11.com': self.parse_n11,
            # ... diğer siteler
        }
    
    def parse_trendyol(self, soup):
        try:
            name = soup.select_one('.product-name').text.strip()
            price = soup.select_one('.prc-slg').text.strip()
            availability = bool(soup.select_one('.add-to-basket'))
            
            return {
                'name': name,
                'price': self.clean_price(price),
                'available': availability
            }
        except AttributeError:
            return None
    
    def clean_price(self, price_text):
        # "1.999,99 TL" -> 1999.99
        return float(price_text.replace('.', '').replace(',', '.').replace(' TL', ''))
```

## Anti-Bot Mechanisms'e Karşı Stratejiler

### 1. User-Agent Rotation

```python
import random

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
]

def get_random_headers():
    return {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
    }
```

### 2. Proxy Rotation

```python
import itertools

class ProxyRotator:
    def __init__(self, proxy_list):
        self.proxies = itertools.cycle(proxy_list)
        self.current_proxy = next(self.proxies)
    
    def get_proxy(self):
        return {'http': self.current_proxy, 'https': self.current_proxy}
    
    def rotate(self):
        self.current_proxy = next(self.proxies)
        return self.get_proxy()
```

## Discord Integration ve Notifications

Stok değişikliklerini anında bildirmek için Discord webhook kullandım:

```python
import requests
import json

class DiscordNotifier:
    def __init__(self, webhook_url):
        self.webhook_url = webhook_url
    
    def send_stock_alert(self, product_name, price, url):
        embed = {
            "title": "STOK UYARISI",
            "description": f"**{product_name}** tekrar stokta!",
            "color": 65280,  # Yeşil
            "fields": [
                {"name": "Fiyat", "value": f"{price} TL", "inline": True},
                {"name": "Link", "value": f"[Ürüne Git]({url})", "inline": True}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }
        
        payload = {
            "username": "Stock Monitor",
            "embeds": [embed]
        }
        
        response = requests.post(self.webhook_url, 
                               data=json.dumps(payload),
                               headers={'Content-Type': 'application/json'})
        
        return response.status_code == 204
```

## Performance ve Scalability

### 1. Concurrent Processing

```python
import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor

async def scrape_multiple_sites(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [scrape_site(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return results

async def scrape_site(session, url):
    try:
        async with session.get(url, headers=get_random_headers()) as response:
            html = await response.text()
            return parse_html(html, url)
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None
```

### 2. Caching ve Database Optimization

```python
import redis
from functools import wraps

# Redis cache
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cache_result(expiration=300):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{hash(str(args))}"
            cached_result = redis_client.get(cache_key)
            
            if cached_result:
                return json.loads(cached_result)
            
            result = func(*args, **kwargs)
            redis_client.setex(cache_key, expiration, json.dumps(result))
            return result
        return wrapper
    return decorator

@cache_result(expiration=600)
def get_product_info(product_url):
    # Expensive scraping operation
    return scrape_product(product_url)
```

## Learned Lessons & Best Practices

### 1. Respect robots.txt
Her zaman robots.txt dosyasını kontrol edin:

```python
import urllib.robotparser

def can_fetch(url):
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url(f"{url}/robots.txt")
    rp.read()
    return rp.can_fetch('*', url)
```

### 2. Error Handling ve Logging

```python
import logging
from functools import wraps

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def retry_on_failure(max_retries=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    logger.warning(f"Attempt {attempt + 1} failed: {e}")
                    if attempt == max_retries - 1:
                        raise
                    time.sleep(delay * (2 ** attempt))  # Exponential backoff
            return None
        return wrapper
    return decorator
```

## Sonuç ve Proje Sonuçları

Bu otomasyon sistemi sayesinde:
- **Anında bildirimler**: Stok geldiği anda haberdar olma
- **Maliyet tasarrufu**: Manuel takipten kurtulma  
- **Data insights**: Fiyat trendleri ve stok paternleri
- **Scalability**: 20+ siteden 1000+ ürün takibi

Monitorist projesi, bana automation'un gerçek gücünü gösterdi. Bu sistemle hem zaman tasarrufu sağladım hem de bir community oluşturarak revenue generate ettim.

**Unutmayın:** Web scraping yaparken etik kurallara uyun, rate limiting kullanın ve site owner'larının terms of service'ini respekt edin.

*Web scraping ve automation projeleri hakkında sorularınız varsa, [benimle iletişime geçebilirsiniz](mailto:me@hakki.info).*
