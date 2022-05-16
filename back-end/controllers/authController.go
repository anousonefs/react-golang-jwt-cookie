package controllers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/anousoneFS/jwt-react/database"
	"github.com/anousoneFS/jwt-react/model"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

var SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := model.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}
	// if err := user.validate(); err != nil {
	// 	return c.SendString("bad request")
	// }
	database.DB.Create(&user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var user model.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		logrus.Error("user not found")
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		logrus.Error(err)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["jti"] = strconv.Itoa(int(user.Id))
	atClaims["exp"] = time.Now().Add(time.Minute * 60).Unix()
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		logrus.Error(err)
		return c.JSON(fiber.Map{
			"message": "cloud not login",
		})
	}
	cookie := fiber.Cookie{
		Name:    "jwt",
		Value:   token,
		Expires: time.Now().Add(time.Hour * 24),
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
		"user":    user,
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		logrus.Error(err)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)
	fmt.Printf("user_id:%+v", claims.ID)

	var user model.User
	database.DB.Where("id=?", claims.ID).First(&user)
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{"message": "success"})
}
