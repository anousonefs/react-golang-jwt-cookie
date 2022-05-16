package main

import (
	"github.com/anousoneFS/jwt-react/database"
	"github.com/anousoneFS/jwt-react/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// connect to postgres db
	database.Connect()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	// routes setup
	routes.Setup(app)

	app.Listen(":3000")
}
