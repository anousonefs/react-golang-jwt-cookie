package database

import (
	"github.com/anousoneFS/jwt-react/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=localhost user=postgres password=banana dbname=jwt port=5432 sslmode=disable TimeZone=Asia/Vientiane"
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	DB = connection
	connection.AutoMigrate(&model.User{})
}
