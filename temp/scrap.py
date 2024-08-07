import re
import requests
import json
from bs4 import BeautifulSoup, element

MENU_URL = "https://menu.tipsipro.com/es/esp/restaurants/qr/inclan-brutal/"
BASE_URL = "https://menu.tipsipro.com"


def parse_menu_section(section_soup: element.ResultSet):

    name = section_soup.select_one('h2 span').text
    menu_items = []

    for menu_item_soup in section_soup.select('div[class="dish-miniature"]'):

        try:
            menu_item = {
                'name': menu_item_soup.select_one('h2 > a').text.strip("\n"),
                'description': menu_item_soup.select_one('p[itemprop="description"]').text.strip("\n"),
            }

            image_raw = menu_item_soup.select_one('div.dish-miniature__image__wrapper').get('style')
            image_path = re.search(r'url\(\'(.*)\'\)', image_raw).group(1)
            menu_item['image'] = BASE_URL + image_path

            price_raw = menu_item_soup.select_one('div.dish-miniature__content__prices__icon').text
            menu_item['price'] = float(price_raw.replace("€", "").replace(".", "").replace(",", "."))

            menu_item['allergens'] = []
            if allergens_soup := menu_item_soup.select_one('div.dish-miniature__content__allergens'):
                
                allergens_soup: element.ResultSet
                menu_item['allergens'] = [img.get('alt') for img in allergens_soup.find_all('img')]

            menu_items.append(menu_item)

        except Exception as exc:
            pass

    return {
        'name': name,
        'menu_items': menu_items
    }


if __name__ == '__main__':

    response = requests.get(MENU_URL)

    soup = BeautifulSoup(response.content)
    menu = soup.select_one('div[itemprop="hasMenu"]')

    menu_sections = [
        parse_menu_section(section)
        for section in menu.select('div[class="menu-section"]')
    ]

    with open('menu.json', 'w') as f:
        json.dump(menu_sections, f)