INSERT INTO department (name)
VALUES
('IT'),                             -- seeds from user @NGDino on github
('Procurement'),
('Sales'),
('Acounting');

INSERT INTO role (title, salary, department_id)
VALUES
("IT manager", 165000, 1),
("Tech Support", 70000, 1),
("Junior developer", 65000, 1),
("Senior Developer", 120000, 1),
("Procurment Manager", 150000, 2),
("Junior Buyer", 50000, 2),
("Senior Buyer", 68000, 2),
("Sales Manager", 175000, 3),
("Sales Support", 45000, 3),
("Account Manager", 75000, 3),
("Sales Executive", 120000, 3);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Philip", "Huang", 5, 2),
("Berta", "Medina", 7, 6),
("Lino", "Hines", 7, 6),
("Alton", "Griffith", 12, 9),
("Les", "Villegas", 11, 9),
("Lillian", "Salazar", 10, 9),
("Katy", "Conner", 8, 6),
("Monty", "Baker", 7, 6),
("Lemuel", "Pugh", 5, 2),
("Minh", "Mcknight", 4, 2),
("Rodrick", "Montgomery", 3, 2),
("Vince", "Duke", 3, 2),