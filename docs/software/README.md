# Реалізація інформаційного та програмного забезпечення

## Короткий зміст

- [Реалізація інформаційного та програмного забезпечення](#реалізація-інформаційного-та-програмного-забезпечення)
  - [SQL-скрипт для створення та початкового наповнення бази даних](#sql-скрипт-для-створення-та-початкового-наповнення-бази-даних)
  - [RESTful сервіс для управління даними](#restful-сервіс-для-управління-даними)

## SQL-скрипт для створення та початкового наповнення бази даних

```SQL
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `account_creation_date` DATETIME NOT NULL,
  `last_login_date` DATETIME NULL,
  `Role_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `Role_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_User_Role_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Data` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `upload_date` DATETIME NOT NULL,
  `last_edit_date` DATETIME NULL,
  `Category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `Category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_Data_Category1_idx` (`Category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Data_Category1`
    FOREIGN KEY (`Category_id`)
    REFERENCES `mydb`.`Category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `creation_date` DATETIME NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  `Data_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Comment_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Comment_Data1_idx` (`Data_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comment_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Comment_Data1`
    FOREIGN KEY (`Data_id`)
    REFERENCES `mydb`.`Data` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `Role_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `Role_id`),
  INDEX `fk_Permission_Role1_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_Permission_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Session` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `login_time` DATETIME NOT NULL,
  `logout_time` DATETIME NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `User_id`),
  INDEX `fk_Session_User1_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Session_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Log` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `action_type` VARCHAR(45) NOT NULL,
  `action_date` DATETIME NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  `Data_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Log_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Log_Data1_idx` (`Data_id` ASC) VISIBLE,
  CONSTRAINT `fk_Log_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Log_Data1`
    FOREIGN KEY (`Data_id`)
    REFERENCES `mydb`.`Data` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Access` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `access_type` VARCHAR(45) NOT NULL,
  `User_id` INT UNSIGNED NOT NULL,
  `Data_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Access_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Access_Data1_idx` (`Data_id` ASC) VISIBLE,
  CONSTRAINT `fk_Access_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Access_Data1`
    FOREIGN KEY (`Data_id`)
    REFERENCES `mydb`.`Data` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Role` (`id`, `name`, `description`) VALUES (1, 'admin', 'responsible for managing and publishing data, can import new data, organize it into sets, add metadata, and publish it for other users to access');
INSERT INTO `mydb`.`Role` (`id`, `name`, `description`) VALUES (2, 'user', 'creates tools and APIs to integrate data with the system, develops and tests modules for working with data and ensure compatibility with other services');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (1, 'Dmytro_Kulyk', 'abcdefgh', 'kulyk.dmytro@lll.kpi.ua', '2024-10-17 12:28:24', '2024-11-03 10:07:42', 1);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (2, 'Yulianna_Vakhnina', 'abcdefghij', 'vakhnina.yulianna@lll.kpi.ua', '2024-10-27 13:42:21', '2024-11-03 10:11:42', 1);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (3, 'Artem_Balabas', '12345678', 'balabas.artem@lll.kpi.ua', '2024-11-01 11:28:55', '2024-11-03 09:11:42', 2);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (4, 'Lev_Bereza', '87654321', 'bereza.lev@lll.kpi.ua', '2024-11-01 13:15:37', NULL, 2);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (5, 'Yaroslav_Kantur', '546846sd', 'kantur.yaroslav@lll.kpi.ua', '2024-10-28 15:53:12', NULL, 2);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (6, 'Danylo_Pistriuha', '09876543', 'pistriuha.danylo@lll.kpi.ua', '2024-11-01 12:33:28', '2024-11-02 14:15:11', 2);
INSERT INTO `mydb`.`User` (`id`, `name`, `password`, `email`, `account_creation_date`, `last_login_date`, `Role_id`) VALUES (7, 'Volodymyr_Shkarban', '34567890', 'shkarban.volodymyr@lll.kpi.ua', '2024-11-01 18:45:01', NULL, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Category`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Category` (`id`, `name`, `description`) VALUES (1, 'Science', 'Information related to science');
INSERT INTO `mydb`.`Category` (`id`, `name`, `description`) VALUES (2, 'Technology', 'Technological and societal data');
INSERT INTO `mydb`.`Category` (`id`, `name`, `description`) VALUES (3, 'Environment', 'Environmental and health studies');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Data`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (1, 'Climate Change Impact', 'Global warming data 1990-2020', '2023-02-26 10:26:54', '2023-03-12 12:24:28', 3);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (2, 'Population by Country 2023', 'Population numbers by country', '2023-05-12 19:15:12', NULL, 1);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (3, 'COVID-19 Vaccination Statistics', 'Vaccination data from 2020 onwards', '2023-11-30 16:17:29', '2024-10-16 17:30:56', 3);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (4, 'Renewable Energy Usage 2022', 'Energy data by source, 2022', '2023-01-12 17:26:17', NULL, 3);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (5, 'World Education Index 2023', 'Education index for countries worldwide', '2024-04-08 08:54:54', NULL, 1);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (6, 'Tech Innovations 2023', 'Key tech breakthroughs of the year', '2024-03-15 11:49:02', NULL, 2);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (7, 'Global Health Spending', 'Health expenditure by country', '2022-08-16 13:23:16', '2024-06-09 12:17:53', 3);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (8, 'Employment Rates by Sector', 'Employment data by economic sector', '2022-12-20 20:28:32', '2023-01-19 14:01:12', 1);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (9, 'Cultural Heritage Sites', 'UNESCO heritage sites worldwide', '2023-05-04 09:41:32', '2024-08-01 17:23:15', 1);
INSERT INTO `mydb`.`Data` (`id`, `name`, `content`, `upload_date`, `last_edit_date`, `Category_id`) VALUES (10, 'Food Production Statistics', 'Global food production by type', '2023-10-26 11:11:11', '2024-05-07 16:15:45', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (1, 'Details by country would make this more useful', '2024-11-05 08:32:14', 2, 1);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (2, 'Good to see updated info! Thanks', '2024-11-05 14:23:52', 2, 3);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (3, 'Nice index! More info on remote regions would help', '2024-11-08 13:32:55', 5, 5);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (4, 'Perfect for analysis. Add pandemic funding data?', '2024-11-08 08:18:34', 7, 7);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (5, 'Thanks for this! More on IT and healthcare would help', '2024-11-06 09:38:27', 4, 8);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (6, 'More photos and history of each site would be cool', '2024-11-07 14:16:32', 6, 9);
INSERT INTO `mydb`.`Comment` (`id`, `content`, `creation_date`, `User_id`, `Data_id`) VALUES (7, 'Could it include data on organic vs. conventional farming?', '2024-11-07 13:27:14', 3, 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Permission`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (1, 'read', 'for admin', 1);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (2, 'edit', 'for admin', 1);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (3, 'upload', 'for admin', 1);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (4, 'download', 'for admin', 1);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (5, 'delete', 'for admin', 1);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (6, 'read', 'for user', 2);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (7, 'edit', 'for user', 2);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (8, 'upload', 'for uses', 2);
INSERT INTO `mydb`.`Permission` (`id`, `name`, `description`, `Role_id`) VALUES (9, 'download', 'for user', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Session`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Session` (`id`, `login_time`, `logout_time`, `User_id`) VALUES (1, '2024-11-03 10:07:42', '2024-11-03 11:12:32', 1);
INSERT INTO `mydb`.`Session` (`id`, `login_time`, `logout_time`, `User_id`) VALUES (2, '2024-11-03 10:11:42', '2024-11-03 11:01:41', 2);
INSERT INTO `mydb`.`Session` (`id`, `login_time`, `logout_time`, `User_id`) VALUES (3, '2024-11-03 09:11:42', '2024-11-03 10:35:13', 3);
INSERT INTO `mydb`.`Session` (`id`, `login_time`, `logout_time`, `User_id`) VALUES (4, '2024-11-02 14:15:11', '2024-11-02 15:17:19', 6);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Log`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (1, 'upload', '2023-02-26 10:26:54', 7, 1);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (2, 'edit', '2023-03-12 12:24:28', 7, 1);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (3, 'upload', '2023-05-12 19:15:12', 5, 2);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (4, 'upload', '2023-11-30 16:17:29', 2, 3);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (5, 'edit', '2024-10-16 17:30:56', 6, 3);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (6, 'upload', '2023-01-12 17:26:17', 1, 4);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (7, 'upload', '2024-04-08 08:54:54', 1, 5);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (8, 'upload', '2024-03-15 11:49:02', 3, 6);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (9, 'upload', '2022-08-16 13:23:16', 3, 7);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (10, 'edit', '2024-06-09 12:17:53', 3, 7);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (11, 'upload', '2022-12-20 20:28:32', 4, 8);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (12, 'edit', '2023-01-19 14:01:12', 5, 8);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (13, 'upload', '2023-05-04 09:41:32', 6, 9);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (14, 'edit', '2024-08-01 17:23:15', 6, 9);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (15, 'upload', '2023-10-26 11:11:11', 2, 10);
INSERT INTO `mydb`.`Log` (`id`, `action_type`, `action_date`, `User_id`, `Data_id`) VALUES (16, 'edit', '2024-05-07 16:15:45', 1, 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Access`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (1, 'read', 1, 3);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (2, 'edit', 1, 3);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (3, 'delete', 1, 3);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (4, 'read', 4, 7);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (5, 'edit', 4, 7);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (6, 'read', 5, 4);
INSERT INTO `mydb`.`Access` (`id`, `access_type`, `User_id`, `Data_id`) VALUES (7, 'edit', 5, 4);

COMMIT;
```

## RESTful сервіс для управління даними

**main.py** (ініціалізує FastAPI та підключає маршрути)
```python
from fastapi import FastAPI
from database import engine, Base
from routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)
```

**database.py** (налаштовує підключення до бази даних і створює об'єкти для роботи з нею)
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DB_PASSWORD

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://root:{DB_PASSWORD}@127.0.0.1:3306/mydb"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

```

**models.py** (визначає ORM-моделі для таблиць Data і Category)
```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone, timedelta


class Data(Base):
    __tablename__ = 'Data'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, index=True, unique=True)
    content = Column(String)
    upload_date = Column(DateTime, default=lambda: datetime.now(timezone.utc) + timedelta(hours=2))
    last_edit_date = Column(DateTime, nullable=True)
    category_id = Column(Integer, ForeignKey('Category.id'))

    category = relationship("Category", back_populates="data_items")


class Category(Base):
    __tablename__ = 'Category'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)

    data_items = relationship("Data", back_populates="category")

```

**schemas.py** (визначає Pydantic-схеми для валідації даних, які надходять у запитах і відповідях)
```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DataCreate(BaseModel):
    id: Optional[int] = None
    name: str
    content: str
    upload_date: Optional[datetime] = None
    last_edit_date: Optional[datetime] = None
    category_id: int


class CategoryCreate(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None


class DataResponse(DataCreate):
    class Config:
        orm_mode = True


class CategoryResponse(CategoryCreate):
    class Config:
        orm_mode = True


class CategoryPatch(BaseModel):
    id: int = None
    name: str = None
    description: Optional[str] = None


class DataPatch(BaseModel):
    id: int = None
    name: str = None
    content: str = None
    upload_date: datetime = None
    last_edit_date: Optional[datetime] = None
    category_id: int = None

```

**routes.py** (визначає API-ендпоїнти для роботи з даними та категоріями)
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import Data, Category
from schemas import DataCreate, CategoryCreate, DataResponse, CategoryResponse, CategoryPatch, DataPatch
from database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/data/", response_model=List[DataResponse])
async def read_data(db: Session = Depends(get_db)):
    return db.query(Data).all()


@router.get("/data/{data_id}", response_model=DataResponse)
async def read_data_by_id(data_id: int, db: Session = Depends(get_db)):
    db_data = db.query(Data).filter(data_id == Data.id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="The data with the specified ID was not found")
    return db_data


@router.post("/data/", response_model=DataResponse)
async def create_data(data: DataCreate, db: Session = Depends(get_db)):
    id_data = db.query(Data).filter(data.id == Data.id).first()
    if id_data:
        raise HTTPException(status_code=400, detail="The data with this ID already exists")

    name_data = db.query(Data).filter(data.name == Data.name).first()
    if name_data:
        raise HTTPException(status_code=400, detail="The data with this name already exists")

    id_category = db.query(Category).filter(data.category_id == Category.id).first()
    if not id_category:
        raise HTTPException(status_code=400, detail="The category with the specified ID was not found")

    db_data = Data(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)

    return db_data


@router.put("/data/{data_id}", response_model=DataResponse)
async def update_data(data_id: int, data: DataCreate, db: Session = Depends(get_db)):
    db_data = db.query(Data).filter(data_id == Data.id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="The data with the specified ID was not found")

    id_data = db.query(Data).filter(data.id == Data.id, data_id != Data.id).first()
    if id_data:
        raise HTTPException(status_code=400, detail="The data with this ID already exists")

    name_data = db.query(Data).filter(data.name == Data.name, data_id != Data.id).first()
    if name_data:
        raise HTTPException(status_code=400, detail="The data with this name already exists")

    if data.category_id:
        id_category = db.query(Category).filter(data.category_id == Category.id).first()
        if not id_category:
            raise HTTPException(status_code=400, detail="The category with the specified ID was not found")

    for key, value in data.dict().items():
        setattr(db_data, key, value)

    db.commit()
    db.refresh(db_data)
    return db_data


@router.delete("/data/{data_id}", response_model=DataResponse)
async def delete_data(data_id: int, db: Session = Depends(get_db)):
    db_data = db.query(Data).filter(data_id == Data.id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="The data with the specified ID was not found")

    db.delete(db_data)
    db.commit()
    return db_data


@router.patch("/data/{data_id}", response_model=DataResponse)
async def patch_data(data_id: int, data: DataPatch, db: Session = Depends(get_db)):
    db_data = db.query(Data).filter(data_id == Data.id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="The data with the specified ID was not found")

    updated_fields = data.dict(exclude_unset=True)

    if 'id' in updated_fields and updated_fields['id'] != data_id:
        id_data = db.query(Data).filter(Data.id == updated_fields['id']).first()
        if id_data:
            raise HTTPException(status_code=400, detail="The data with this ID already exists")

    if 'name' in updated_fields:
        name_data = db.query(Data).filter(Data.name == updated_fields['name'], data_id != Data.id).first()
        if name_data:
            raise HTTPException(status_code=400, detail="The data with this name already exists")

    if 'category_id' in updated_fields:
        category = db.query(Category).filter(Category.id == updated_fields['category_id']).first()
        if not category:
            raise HTTPException(status_code=400, detail="The category with the specified ID was not found")

    for key, value in updated_fields.items():
        setattr(db_data, key, value)

    db.commit()
    db.refresh(db_data)
    return db_data


@router.get("/category/", response_model=List[CategoryResponse])
async def read_category(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Category).offset(skip).limit(limit).all()


@router.get("/category/{category_id}", response_model=CategoryResponse)
async def read_category_by_id(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(category_id == Category.id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="The category with the specified ID was not found")
    return db_category


@router.post("/category/", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    existing_category = db.query(Category).filter(category.id == Category.id).first()
    if existing_category:
        raise HTTPException(status_code=400, detail="The category with this ID already exists")

    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)

    return db_category


@router.put("/category/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(category_id == Category.id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="The category with the specified ID was not found")

    id_data = db.query(Data).filter(category.id == Category.id, category_id != Category.id).first()
    if id_data:
        raise HTTPException(status_code=400, detail="The category with this ID already exists")

    for key, value in category.dict().items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category


@router.delete("/category/{category_id}", response_model=CategoryResponse)
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(category_id == Category.id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="The category with the specified ID was not found")

    related_data = db.query(Data).filter(category_id == Data.category_id).first()
    if related_data:
        raise HTTPException(status_code=403, detail="Cannot delete category with associated data")

    db.delete(db_category)
    db.commit()
    return db_category


@router.patch("/category/{category_id}", response_model=CategoryResponse)
async def patch_category(category_id: int, category: CategoryPatch, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(category_id == Category.id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="The category with the specified ID was not found")

    updated_data = category.dict(exclude_unset=True)

    if 'id' in updated_data and updated_data['id'] != category_id:
        id_category = db.query(Category).filter(Category.id == updated_data['id']).first()
        if id_category:
            raise HTTPException(status_code=400, detail="The category with this ID already exists")

    for key, value in updated_data.items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category

```
