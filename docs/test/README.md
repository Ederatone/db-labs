# Тестування працездатності системи

## Короткий зміст

- [Тестування працездатності системи](#тестування-працездатності-системи)
  - [Основний сценарій для Data](#основний-сценарій-для-data)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [DELETE](#delete)
    - [PATCH](#patch)
  - [Основний сценарій для Category](#основний-сценарій-для-category)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [DELETE](#delete)
    - [PATCH](#patch)
  - [Виключні ситуації для Data](#виключні-ситуації-для-data)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [DELETE](#delete)
    - [PATCH](#patch)
  - [Виключні ситуації для Category](#виключні-ситуації-для-category)
    - [GET](#get)
    - [POST](#post)
    - [PUT](#put)
    - [DELETE](#delete)
    - [PATCH](#patch)

## Основний сценарій для Data
### GET
Get-запит на отримання всіх даних
![](./images/data-base/1.1.png)

Get-запит на отримання даних за id
![](./images/data-base/1.2.png)

### POST
Post-запит на додавання даних з усіма заповненими полями
![](./images/data-base/2.1.png)

Post-запит на додавання даних без id, upload_date, last_edit_date

*Примітка. Для id встановлено autoincrement, для upload_date за замовчуванням встановлюються поточні дата і час, для last_edit_date за замовчуванням встановлюється null.*
![](./images/data-base/2.2.png)

### PUT
Put-запит на оновлення id, name, content та category

*Дані до оновлення*
![](./images/data-base/3.1.1.png)

*Оновлення даних*
![](./images/data-base/3.1.2.png)

### DELETE
Delete-запит на видалення даних

*Перевірка існування даних*
![](./images/data-base/4.1.1.png)

*Видалення даних*
![](./images/data-base/4.1.2.png)

*Перевірка видалення даних*
![](./images/data-base/4.1.3.png)

### PATCH
Patch-запит на оновлення name

*Дані до оновлення*
![](./images/data-base/5.1.1.png)

*Оновлення name*
![](./images/data-base/5.1.2.png)

## Основний сценарій для Category
### GET
Get-запит на отримання всіх категорій
![](./images/category-base/1.1.png)

Get-запит на отримання категорії за id
![](./images/category-base/1.2.png)

### POST
Post-запит на додавання категорії з усіма заповненими полями
![](./images/category-base/2.1.png)

Post-запит на додавання категорії без id та description

*Примітка. Для id встановлено autoincrement, для description за замовчуванням встановлюється null.*
![](./images/category-base/2.2.png)

### PUT
Put-запит на оновлення id, name, description

*Дані категорії до оновлення*
![](./images/category-base/3.1.1.png)

*Оновлення даних категорії*
![](./images/category-base/3.1.2.png)

### DELETE
Delete-запит на видалення категорії

*Перевірка існування категорії*
![](./images/category-base/4.1.1.png)

*Видалення категорії*
![](./images/category-base/4.1.2.png)

*Перевірка видалення категорії*
![](./images/category-base/4.1.3.png)

### PATCH
Patch-запит на оновлення id

*Дані категорії до оновлення*
![](./images/category-base/5.1.1.png)

*Оновлення id*
![](./images/category-base/5.1.2.png)

Patch-запит на оновлення id категорії, якій належать дані

*Примітка. Для foreign key “Category_id” встановлено ON UPDATE CASCADE, що автоматично оновлює значення Category_id, якщо було змінено id у Category.*

*Дані до оновлення id категорії*
![](./images/category-base/5.2.1.png)

*Оновлення id категорії*
![](./images/category-base/5.2.2.png)

*Дані після оновлення id категорії*
![](./images/category-base/5.2.3.png)

## Виключні ситуації для Data
### GET
Немає даних із заданим id
![](./images/data-error/1.1.png)

### POST
Введено не всі дані, що є обов’язковими для заповнення
![](./images/data-error/2.1.png)

Введено id, дані з яким уже існують у системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/data-error/2.2.png)

Введено name, дані з яким уже існують у системі

*Примітка. name має бути неповторюваним значенням.*
![](./images/data-error/2.3.png)

Введено неіснуючий category_id
![](./images/data-error/2.4.png)

### PUT
Введено не всі дані, що є обов’язковими для заповнення
![](./images/data-error/3.1.png)

Немає даних із заданим id
![](./images/data-error/3.2.png)

Введено id, дані з яким уже існують у системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/data-error/3.3.png)

Введено name, дані з яким уже існують у системі

*Примітка. name має бути неповторюваним значенням.*
![](./images/data-error/3.4.png)

Введено неіснуючий category_id
![](./images/data-error/3.5.png)

### DELETE
Немає даних із заданим id 
![](./images/data-error/4.1.png)

### PATCH
Немає даних із заданим id
![](./images/data-error/5.1.png)

Введено id, дані з яким уже існують у системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/data-error/5.2.png)

Введено name, дані з яким уже існують у системі

*Примітка. name має бути неповторюваним значенням.*
![](./images/data-error/5.3.png)

Введено неіснуючий category_id
![](./images/data-error/5.4.png)

## Виключні ситуації для Category
### GET
Немає категорії із заданим id
![](./images/category-error/1.1.png)

### POST
Введено не всі дані, що є обов’язковими для заповнення
![](./images/category-error/2.1.png)

Введено id, категорія з яким уже існує в системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/category-error/2.2.png)

### PUT
Введено не всі дані, що є обов’язковими для заповнення
![](./images/category-error/3.1.png)

Немає категорії із заданим id
![](./images/category-error/3.2.png)

Введено id, категорія з яким уже існує в системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/category-error/3.3.png)

### DELETE
Немає категорії із заданим id 
![](./images/category-error/4.1.png)

Неможливо видалити категорію, якій належать дані

*Примітка. Для foreign key “Category_id” встановлено ON DELETE NO ACTION, що забороняє видаляти категорії, яким належать певні дані*
![](./images/category-error/4.2.png)

### PATCH
Немає категорії із заданим id
![](./images/category-error/5.1.png)

Введено id, категорія з яким уже існує в системі

*Примітка. id має бути неповторюваним значенням.*
![](./images/category-error/5.2.png)
