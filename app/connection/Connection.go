package connection

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

func DatabaseConnect() (*sql.DB, error) {

	connectionStr := "user=postgres password=123 dbname=taskmanager sslmode=disable"

	db, err := sql.Open("postgres", connectionStr)
	if err != nil {
		log.Println(err)
	}

	return db, err
}