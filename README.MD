# Route and Create
*Веб-приложение, позволяющее делать фото по всему миру _через интернет_*

### Travel all over the world
![](.github/pictures/RouteAndCreate1.png)
### Create picture and edit it
![](.github/pictures/RouteAndCreate2.png)


## Как ипользовать
* Перемещайтесь по миру используя интерактивные Street View и Maps (они синхронизированы)
    * Используйте pegman'a (человечка) для перемещения с помощью Maps! 
* Делайте фото по нажатию `Capture`
* Накладывайте фильтры (работающие по технологии 3D LUT) с помошью иконок фильтров снизу
* Скачивайте фото по нажатию `Download`
* Удаляйте фото по нажатию `Delete`


## Техническая сторона
написано на **Python** + **flask**

использованное API:
1. [jQuery API](https://api.jquery.com/) (работа с ajax запросами)
2. [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) (интерактивная карта)
3. [Google Street View JavaScript API](https://developers.google.com/maps/documentation/streetview/) (интерактивный модуль StreetView)
4. [Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/) (получение изображений)

API Google Maps, Street View используется `по моему личному ключу` (API Key), настроенному в целях безопасности для работы тоько по адресу http://127.0.0.1:5000/ 
   
