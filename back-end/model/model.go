package model

import "fmt"

type User struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password []byte `json:"-"`
}

func (u User) validate() error {
	if u.Name == "" || u.Email == "" {
		return fmt.Errorf("request invalid")
	}
	return nil
}
