

CREATE TABLE IF NOT EXISTS dischi (
  id int NOT NULL AUTO_INCREMENT,
  autore varchar(32) DEFAULT NULL,
  titolo varchar(32) DEFAULT NULL,
  prezzo double DEFAULT NULL,
  anno int DEFAULT NULL,
  gender varchar(32) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO dischi (id, autore, titolo, prezzo, anno, gender) VALUES
('1', 'vasco rossi', 'albachiara', '11.3', '1985', 'tock' ),
('2', 'zucchero', 'blues', '12.3', '1988', 'blues' ),
('3', 'stadio', 'un giorno mi dirai', '13.3', '2016', 'pop' ),
('4', 'battiato', 'la voce del padrone', '14.3', '1982', 'pop' ),
('5', 'elio e le storie tese', 'la terra dei cachi', '14.3', '1994', 'pop' ),
('6', 'spingsteen', 'the river', '16.3', '1979', 'rock' ),
('7', 'pink floyd', 'the wall', '17.3', '1980', 'rock' ),
('8', 'battiato', 'patriots', '13', '1979', 'pop' ),
('9', 'gigi d\'alessio', 'non dirgli mai', '13', '1999', 'pop' );

